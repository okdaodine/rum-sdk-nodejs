import { IAnnounceOptions, IAnnounceResult, ApproveType, AnnounceType, ActionType } from './types';
import sha256 from 'crypto-js/sha256';
import axios, { AxiosResponse } from 'axios';
import * as Base64 from 'js-base64';
import { AEScrypto } from '../utils';
import { getSenderPubkey, sign } from '../utils/signTrx';
import { assert, error } from '../utils/assert';
import * as cache from '../cache';
import * as protobuf from '../utils/protobuf';

export const announce = async (options: IAnnounceOptions) => {
  const { groupId, privateKey, encryptPubKey, type, action } = options;
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  assert(privateKey, error.required('privateKey'));
  assert(encryptPubKey, error.required('encryptPubKey'));
  const senderPubkey = await getSenderPubkey(privateKey);
  const p = {
    GroupId: groupId,
    Type: type || AnnounceType.AS_USER,
    Action: action || ActionType.ADD,
    SignPubkey: senderPubkey,
    EncryptPubkey: encryptPubKey,
    OwnerPubkey: '',
    OwnerSignature: '',
    Result: ApproveType.ANNOUNCED,
    AnnouncerSignature: '',
    TimeStamp: Date.now() * 1000000,
    Memo: '',
  }
  const data = p.GroupId + p.SignPubkey + p.EncryptPubkey;
  const hash = sha256(data).toString();
  const signature = await sign(hash, { privateKey });
  p.AnnouncerSignature = signature;
  const dataBuffer = protobuf.create({
    type: 'quorum.pb.AnnounceItem',
    payload: p
  });
  const encrypted = await AEScrypto.encrypt(dataBuffer, group!.cipherKey);
  const payload = {
    group_id: groupId,
    Req: Base64.fromUint8Array(new Uint8Array(encrypted)),
  }
  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.post(`${apiURL.origin}/api/v1/node/announce/${groupId}`, payload, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
    }
  }) as Promise<AxiosResponse<IAnnounceResult>>);
  return res.data;
}

export const getEncryptPubKeys = async (groupId: string) => {
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.get(`${apiURL.origin}/api/v1/node/getencryptpubkeys/${groupId}`, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
    }
  }) as Promise<AxiosResponse<{ keys: string[] }>>);
  return res.data;
}