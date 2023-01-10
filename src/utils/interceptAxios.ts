import axios from 'axios';
import * as cache from '../cache';

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

const apiLoopIndexMap = {} as Record<string, number>;
export const interceptAxios = () => {

  axios.defaults.timeout = 30 * 1000;

  axios.interceptors.response.use((response) => {
    try {
      const matched = response.config.url!.match(UUID_REGEX);
      if (matched) {
        const groupId = matched[0];
        if (groupId) {
          const group = cache.Group.get(groupId)!;
          if (group) {
            const loopIndex = apiLoopIndexMap[groupId] || 0;
            if (group.chainAPIs.length > 0 && loopIndex > 0) {
              arrayMove(group.chainAPIs, loopIndex, 0);
              cache.Group.update(groupId, group);
              apiLoopIndexMap[groupId] = 0;
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }, (error) => {
    const matched = error.config.url.match(UUID_REGEX);
    if (matched) {
      const groupId = matched[0];
      if (groupId) {
        const group = cache.Group.get(groupId)!;
        const { chainAPIs } = group;
        if (chainAPIs.length === 1) {
          return Promise.reject(error);
        }
        const curIndex = (apiLoopIndexMap[group.groupId] || 0) + 1;
        if (curIndex <= chainAPIs.length - 1) {
          const alternativeUrl = new URL(chainAPIs[curIndex]);
          const errorRequestUrl = new URL(error.config.url);
          apiLoopIndexMap[group.groupId] = curIndex;
          return axios.request({
            url: `${alternativeUrl.origin}${errorRequestUrl.pathname}`,
            data: JSON.parse(error.config.data),
            method: error.config.method,
            headers: {
              'Authorization': `Bearer ${alternativeUrl.searchParams.get('jwt') || ''}`
            }
          });
        } else {
          delete apiLoopIndexMap[group.groupId];
        }
      }
    }
    return Promise.reject(error);
  });
}

const arrayMove = (arr: any[], from: number, to: number) => {
  var element = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, element);
}
