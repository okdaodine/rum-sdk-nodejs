import { IActivity, IDecryptedContent, IEncryptedContent, IListContentsOptions } from './types';
import { AEScrypto, typeTransform } from '../utils';
import axios, { AxiosResponse } from 'axios';
import * as Base64 from 'js-base64';
import { assert, error } from '../utils/assert';
import * as cache from '../cache';

export const list = async (options: IListContentsOptions) => {
  const { groupId  } = options;
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  const params = {
    group_id: groupId,
    reverse: options.reverse ? "true" : "false",
    include_start_trx: "false",
    senders: [],
  } as any;
  if (options.startTrx) {
    params.start_trx = options.startTrx;
  }
  if (options.count) {
    params.num = options.count;
  }
  const getGroupCtnItem = {
    Req: params,
  }
  const getGroupCtnItemJsonString = JSON.stringify(getGroupCtnItem);
  const plaintextEncoded = new TextEncoder().encode(getGroupCtnItemJsonString);
  const encrypted = await AEScrypto.encrypt(plaintextEncoded, group!.cipherKey);

  const sendJson = {
    Req: Base64.fromUint8Array(new Uint8Array(encrypted))
  }

  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.post(`${apiURL.origin}/api/v1/node/groupctn/${groupId}`, sendJson, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
      'Accept-Content': 'gzip',
    }
  }) as Promise<AxiosResponse<IEncryptedContent[]>>);
  
  const contents = await Promise.all(res.data.map(async (item) => {
    const encryptedBuffer = Base64.toUint8Array(item.Data);

    if (group?.encryptionType === 'private') {
      return item;
    }

    const buffer = await AEScrypto.decrypt(encryptedBuffer, group!.cipherKey);
    const dataString = typeTransform.uint8ArrayToString(buffer);
    let data = {} as IActivity;
    try {
      data = JSON.parse(dataString);
    } catch (err) {
      console.log(`[fail to parse json for trx.Data]:`, { item, dataString });
      console.log(err);
    }
    return {
      ...item,
      Data: data
    } as IDecryptedContent;
  }));

  return contents;
}

