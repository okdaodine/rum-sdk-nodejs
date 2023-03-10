import { ISignTrxPayload } from './types';
import * as protobuf from './protobuf';
import * as AEScrypto from './AEScrypto';
import * as typeTransform from './typeTransform';
import ageEncryption from './ageEncryption';
import { v4 as uuidV4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import encBase64 from 'crypto-js/enc-base64'
import { ethers, utils as etherUtils } from 'ethers';
import * as Base64 from 'js-base64';
import { assert, error } from './assert';

let nonce = 1;
export const signTrx = async (payload: ISignTrxPayload) => {
  const { groupId, data, trxId, version, timestamp, aesKey, agePublicKeys, privateKey } = payload;
  assert(groupId, error.required('groupId'));
  assert(data, error.required('data'));
  assert(aesKey, error.required('aesKey'));
  if (!privateKey && !payload.sign) {
    const account = await getProviderAccount();
    assert(account, error.notFound('provider account'));
  }
  const dataBuffer = typeTransform.stringToUint8Array(JSON.stringify(data));
  let encrypted = new Uint8Array();
  if (agePublicKeys) {
    encrypted = await ageEncryption.encrypt_with_x25519_2(agePublicKeys, dataBuffer);
  } else {
    encrypted = await AEScrypto.encrypt(dataBuffer, aesKey);
  }
  const now = new Date();
  const senderPubkey = payload.publicKey ?? await getSenderPubkey(privateKey);
  const trx = {
    TrxId: trxId || uuidV4(),
    GroupId: groupId,
    Data: Base64.fromUint8Array(new Uint8Array(encrypted)),
    TimeStamp: (timestamp ? timestamp : now.getTime()) * 1000000,
    Version: version || '2.0.0',
    Expired: now.setSeconds(now.getSeconds() + 30) * 1000000,
    Nonce: nonce++,
    SenderPubkey: senderPubkey,
  } as any;
  const trxWithoutSignProtoBuffer = protobuf.create({
    type: 'quorum.pb.Trx',
    payload: trx
  });
  const trxWithoutSignProtoBase64 = Base64.fromUint8Array(new Uint8Array(trxWithoutSignProtoBuffer));
  const hash = sha256(encBase64.parse(trxWithoutSignProtoBase64)).toString();
  const signature = await sign(hash, { privateKey, sign: payload.sign });
  const signatureBuffer = typeTransform.hexToUint8Array(signature);
  trx.SenderSign = signatureBuffer;
  const trxProtoBuffer = protobuf.create({
    type: 'quorum.pb.Trx',
    payload: trx
  });
  const trxJsonString = JSON.stringify({
    TrxBytes: Base64.fromUint8Array(new Uint8Array(trxProtoBuffer))
  });
  const plaintextEncoded = new TextEncoder().encode(trxJsonString);
  const encryptedTrxJsonStringBuffer = await AEScrypto.encrypt(plaintextEncoded, aesKey);
  const sendTrxJson = {
    TrxItem: Base64.fromUint8Array(new Uint8Array(encryptedTrxJsonStringBuffer))
  };
  return sendTrxJson;
}

export const getSenderPubkey = async (privateKey?: string) => {
  if (privateKey) {  
    const signingKey = new etherUtils.SigningKey(privateKey);
    const pubKeyBuffer = typeTransform.hexToUint8Array(signingKey.compressedPublicKey.replace('0x', ''));
    return Base64.fromUint8Array(pubKeyBuffer, true);
  } else {
    const address = await getProviderAccount();
    return address;
  }
}

export const sign = async (hash: string, params: { privateKey?: string, sign?: (hash: string) => string | Promise<string> }) => {
  if (params.sign) {
    return params.sign(hash);
  } else if (params.privateKey) {
    const signingKey = new etherUtils.SigningKey(params.privateKey);
    const digest = typeTransform.hexToUint8Array(hash);
    const signatureObj = signingKey.signDigest(digest);
    return etherUtils.joinSignature(signatureObj).replace('0x', '');
  } else {
    const account = await getProviderAccount();
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signatureFromProvider = await provider.send("eth_sign", [account, '0x' + hash]);
    return etherUtils.joinSignature(signatureFromProvider).replace('0x', '');
  }
}

const getProviderAccount = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}
