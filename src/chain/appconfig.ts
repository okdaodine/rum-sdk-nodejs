import axios from 'axios';
import * as Base64 from 'js-base64';
import { AEScrypto } from '../utils';
import { assert, error } from '../utils/assert';
import * as cache from '../cache';
import { IListAppConfigKeysOptions, IGetAppConfigByKeyOptions, IAppConfigKeyListItem, IAppConfigItem } from './types';

export const list = async (options: IListAppConfigKeysOptions) => {
  const { groupId } = options;
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  const params = {
    GroupId: groupId,
  };
  const getGroupCtnItemJsonString = JSON.stringify(params);
  const plaintextEncoded = new TextEncoder().encode(getGroupCtnItemJsonString);
  const encrypted = await AEScrypto.encrypt(plaintextEncoded, group!.cipherKey);

  const sendJson = {
    Req: Base64.fromUint8Array(new Uint8Array(encrypted)),
    GroupId: groupId,
    ReqType: 'appconfig_listlist',
  }

  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await axios.post<Array<IAppConfigKeyListItem>>(
    `${apiURL.origin}/api/v1/node/getchaindata/${groupId}`, 
    sendJson,
    {
      headers: {
        Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
        'Accept-Content': 'gzip',
      },
    },
  );

  return res.data;
}

export const get = async (options: IGetAppConfigByKeyOptions) => {
  const { groupId, key } = options;
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  const params = {
    GroupId: groupId,
    Key: key,
  };
  const getGroupCtnItemJsonString = JSON.stringify(params);
  const plaintextEncoded = new TextEncoder().encode(getGroupCtnItemJsonString);
  const encrypted = await AEScrypto.encrypt(plaintextEncoded, group!.cipherKey);

  const sendJson = {
    Req: Base64.fromUint8Array(new Uint8Array(encrypted)),
    GroupId: groupId,
    ReqType: 'appconfig_item_bykey',
  }

  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await axios.post<IAppConfigItem>(
    `${apiURL.origin}/api/v1/node/getchaindata/${groupId}`, 
    sendJson,
    {
      headers: {
        Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
        'Accept-Content': 'gzip',
      },
    },
  );

  return res.data;
}
