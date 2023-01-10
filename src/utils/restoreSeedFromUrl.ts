import { ISeed } from './types/seed';
import { uint8ArrayToHex } from './typeTransform';
import formatBase64UUID from './formatBase64UUID';
import * as Base64 from 'js-base64';

export default (url: string) => {
  const isValidUrl = url.startsWith('rum://seed?');
  if (!isValidUrl) {
    throw new Error('invalid url');
  }

  const seed = {
    genesis_block: {
      BlockId: '',
      GroupId: '',
      PrevBlockId: '',
      PreviousHash: null,
      TimeStamp: 0,
      ProducerPubKey: '',
      Trxs: null,
      Signature: ''
    },
    group_name: '',
    consensus_type: '',
    encryption_type: '',
    cipher_key: '',
    group_id: '',
    owner_pubkey: '',
    signature: '',
    app_key: '',
    urls: []
  } as ISeed;

  url = url.replaceAll('?jwt', '_jwt');
  const searchParams = url.split('?')[1];
  const urlParams = new URLSearchParams(searchParams);

  const pVersion = urlParams.get('v') || '';
  if (pVersion !== '1') {
    throw new Error('nonsupport version');
  }

  seed.group_name = urlParams.get('a') || '';

  const groupId = formatBase64UUID(urlParams.get('g') || '');
  seed.genesis_block.GroupId = groupId;
  seed.group_id = groupId;

  const blockId = formatBase64UUID(urlParams.get('b') || '');
  seed.genesis_block.BlockId = blockId;

  const signature = Base64.fromUint8Array(Base64.toUint8Array(urlParams.get('s') || ''));
  seed.genesis_block.Signature = signature;
  seed.signature = signature;

  seed.genesis_block.ProducerPubKey = urlParams.get('k') || '';
  seed.owner_pubkey = urlParams.get('k') || '';

  const cipher = uint8ArrayToHex(Base64.toUint8Array(urlParams.get('c') || ''));
  seed.cipher_key = cipher;

  seed.app_key = urlParams.get('y') || '';

  seed.consensus_type = urlParams.get('n') === '1' ? 'pos' : 'poa';

  seed.encryption_type = urlParams.get('e') === '0' ? 'public' : 'private';

  // const base64Timestamp = Base64.toUint8Array(urlParams.get('t') || '');
  // seed.genesis_block.TimeStamp = base64Timestamp;

  const pUrl = urlParams.get('u') || '';
  for (const url of pUrl.split('|')) {
    seed.urls.push(url.replace('_jwt', '?jwt'));
  }

  return seed;
}