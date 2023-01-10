import { IGroup } from '../cache/types';
import restoreSeedFromUrl from './restoreSeedFromUrl';

export default (seedUrl: string) => {
  const seed = restoreSeedFromUrl(seedUrl);
  return {
    groupId: seed.group_id,
    groupName: seed.group_name,
    consensusType: seed.consensus_type,
    encryptionType: seed.encryption_type,
    cipherKey: seed.cipher_key,
    appKey: seed.app_key,
    ownerPubKey: seed.owner_pubkey,
    signature: seed.signature,
    chainAPIs: seed.urls
  } as IGroup;
}