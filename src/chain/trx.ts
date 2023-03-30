import axios, { AxiosResponse } from 'axios';
import { ITrx, ICreateActivityPayload } from './types';
import { assert, error } from '../utils/assert';
import * as cache from '../cache';
import { signTrx } from '../utils';
import { ISignedTrx } from '../utils/types';

export const get = async (groupId: string, trxId: string) => {
  assert(groupId, error.required('groupId'));
  assert(trxId, error.required('trxId'));
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.get(`${apiURL.origin}/api/v1/trx/${groupId}/${trxId}`, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`
    }
  }) as Promise<AxiosResponse<ITrx>>);
  return res.data;
}

export const create = async (p: ICreateActivityPayload) => {
  const group = cache.Group.get(p.groupId);
  assert(group, error.notFound('group'));
  const payload = await signTrx({
    aesKey: group!.cipherKey,
    ...p,
    data: p.data,
  });
  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.post(`${apiURL.origin}/api/v1/node/${p.groupId}/trx`, payload, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`,
    }
  }) as Promise<AxiosResponse<{ trx_id: string }>>);
  return res.data;
}

export const send = async (groupId: string, payload: ISignedTrx) => {
  const group = cache.Group.get(groupId);
  assert(group, error.notFound('group'));
  const apiURL = new URL(group!.chainAPIs[0]);
  const res = await (axios.post(`${apiURL.origin}/api/v1/node/${groupId}/trx`, payload, {
    headers: {
      Authorization: `Bearer ${apiURL.searchParams.get('jwt') || ''}`
    }
  }) as Promise<AxiosResponse<{ trx_id: string }>>);
  return res.data;
}