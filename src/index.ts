export * from './cache/types';
export * from './chain/types';
export * from './utils/types';

import * as cache from './cache';
import * as chain from './chain';
import * as utils from './utils';
import { ethers } from 'ethers';

import { interceptAxios } from './utils/interceptAxios';
interceptAxios();

export default {
  cache,
  chain,
  utils,
  ethers
};

export {
  cache,
  chain,
  utils,
  ethers
}

if (typeof window !== 'undefined') {
  (window as any).QuorumLightNodeSDK = {
    cache,
    chain,
    utils,
    ethers
  };
}

