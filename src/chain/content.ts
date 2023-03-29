import { IActivity, IDecryptedContent, IEncryptedContent, IListContentsOptions } from './types';
import { AEScrypto, typeTransform } from '../utils';
import axios, { AxiosResponse } from 'axios';
import * as Base64 from 'js-base64';
import { assert, error } from '../utils/assert';
import * as cache from '../cache';
import qs from 'query-string';

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

  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.get(`${apiURL.origin}/api/v1/node/${groupId}/groupctn?${qs.stringify(params)}`, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
      'Accept-Content': 'gzip',
    }
  }) as Promise<AxiosResponse<IEncryptedContent[]>>);
  
  const contents = await Promise.all(res.data.map(async (item) => {
    if (!item || Object.keys(item).length === 0) {
      return null;
    }

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

  return contents.filter(content => !!content);
}

