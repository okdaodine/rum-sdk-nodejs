import * as protobuf from './protobuf';
import * as typeTransform from './typeTransform';
import pubkeyToAddress from './pubkeyToAddress';
import sha256 from 'crypto-js/sha256';
import encBase64 from 'crypto-js/enc-base64'
import { ethers } from 'ethers';
import * as Base64 from 'js-base64';
import { ITrx } from '../chain/types';

export const verifyTrx = (trx: ITrx) => {
  const _trx = {
    TrxId: trx.TrxId,
    GroupId: trx.GroupId,
    Data: trx.Data,
    TimeStamp: trx.TimeStamp,
    Version: trx.Version,
    SenderPubkey: trx.SenderPubkey,
  } as any;
  const trxWithoutSignProtoBuffer = protobuf.create({
    type: 'quorum.pb.Trx',
    payload: _trx
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
