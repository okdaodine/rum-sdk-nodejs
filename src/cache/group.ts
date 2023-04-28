import { IGroup } from './types';
import seedUrlToGroup from '../utils/seedUrlToGroup';
import { assert, error } from '../utils/assert';
import nodeLocalStorage from 'node-localstorage';
import { join } from 'path';
const storagePath = join(__dirname, "./localStorage");
const localStorage = new nodeLocalStorage.LocalStorage(storagePath);

const store = (key: string, data?: any) => {
  if (!data) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : ''
  }
  localStorage.setItem(key, JSON.stringify(data));
}

const STORE_KEY = 'lightNodeGroupMap';
type IMap = Record<string, IGroup>;
export const list = () => {
  return Object.values(store(STORE_KEY) || {}) as IGroup[];
}

export const add = (seedUrl: string) => {
  const map = (store(STORE_KEY) || {}) as IMap;
  const group = seedUrlToGroup(seedUrl);
  assert(group.chainAPIs.length > 0, error.notFound('chain url'));
  if (map[group.groupId]) {
    return {
      groupId: group.groupId
    };  
  }
  map[group.groupId] = group;
  store(STORE_KEY, map);
  return {
    groupId: group.groupId
  };
}

export const remove = (groupId: string) => {
  assert(groupId, "groupId is required");
  const map = (store(STORE_KEY) || {}) as IMap;
  delete map[groupId];
  store(STORE_KEY, map);
  return {
    groupId
  };
}

export const get = (groupId: string) => {
  assert(groupId, "groupId is required");
  const map = (store(STORE_KEY) || {}) as IMap;
  return map[groupId] as IGroup | null;
}

export const update = (groupId: string, group: IGroup) => {
  assert(groupId, "groupId is required");
  assert(group, "group is required");
  const map = (store(STORE_KEY) || {}) as IMap;
  map[groupId] = group;
  store(STORE_KEY, map)
  return {
    groupId
  };
}

export const clear = () => {
  localStorage.removeItem(STORE_KEY);
}