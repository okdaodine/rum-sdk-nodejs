import * as protobuf from './protobuf';
import * as typeTransform from './typeTransform';
import pubkeyToAddress from './pubkeyToAddress';
import sha256 from 'crypto-js/sha256';
import encBase64 from 'crypto-js/enc-base64'
import { ethers } from 'ethers';
import * as Base64 from 'js-base64';
import { ITrx } from '../chain/types';
import Long from 'long';

export const verifyTrx = (trx: ITrx) => {
  const pbTrx = {
    GroupId: trx.GroupId,
    Data: trx.Data,
    SenderPubkey: trx.SenderPubkey,
    TimeStamp: Long.fromValue(trx.TimeStamp),
    TrxId: trx.TrxId,
    Version: trx.Version,
  } as any;
  if (trx.Expired) {
    pbTrx.Expired = Long.fromValue(trx.Expired);
  }
  const trxWithoutSignProtoBuffer = protobuf.create({
    type: 'quorum.pb.Trx',
    payload: pbTrx
  });
  const trxWithoutSignProtoBase64 = Base64.fromUint8Array(new Uint8Array(trxWithoutSignProtoBuffer));
  const hash = sha256(encBase64.parse(trxWithoutSignProtoBase64)).toString();
  const digest = typeTransform.hexToUint8Array(hash);
  const signature = typeTransform.uint8ArrayToHex(Base64.toUint8Array(trx.SenderSign));
  const recoveredAddress = ethers.utils.recoverAddress(digest, `0x${signature}`);
  const address = pubkeyToAddress(trx.SenderPubkey)
  console.log(`[verifyTrx]:`, { signature, address, recoveredAddress });
  return address === recoveredAddress;
}
