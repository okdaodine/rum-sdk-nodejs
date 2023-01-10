# quorum-light-node-sdk
Javascript SDK for quorum light node.

## Install
```
$ npm install quorum-light-node-sdk
```

## Usage

### add group
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';

const seedUrl = 'rum://seed?xxx';
const result = QuorumLightNodeSDK.cache.Group.add(seedUrl);
console.log(result);
```

``` javascript
// result
{ groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c' }
```

### get group
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';

const groupId = '8136923b-8203-4e08-bfe7-50eb3b558e2c';
const result = QuorumLightNodeSDK.cache.Group.get(groupId);
console.log(result);
```
``` javascript
// result
{
  appKey: "group_timeline",
  chainAPIs: ['http://127.0.0.1:9003'],
  cipherKey: "c0f3a84920c2c5b93ba308a92302789ca991cb2376c11b16d48fefb31666d5d2",
  consensusType: "poa",
  encryptionType: "public",
  groupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
  groupName: "chat group",
  ownerPubKey: "Aqa6ngNxgrVhf2kQc4nA-0Wr4tsWiaBrshZJPujT5B9g",
  signature: "GDLJ+TcXuo95q+CsUFty7pvMIYZRFRQ3VwrparvjKy00wIYSmx5pl4xT4ALb6AVgNei/is5kn1MuXfh9b5wB+QE=",
}
```

### list groups
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';

const result = QuorumLightNodeSDK.cache.Group.list();
console.log(result);
```
``` javascript
// result
[
  {
    appKey: "group_timeline",
    chainAPIs: ['http://127.0.0.1:9003'],
    cipherKey: "c0f3a84920c2c5b93ba308a92302789ca991cb2376c11b16d48fefb31666d5d2",
    consensusType: "poa",
    encryptionType: "public",
    groupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
    groupName: "chat group",
    ownerPubKey: "Aqa6ngNxgrVhf2kQc4nA-0Wr4tsWiaBrshZJPujT5B9g",
    signature: "GDLJ+TcXuo95q+CsUFty7pvMIYZRFRQ3VwrparvjKy00wIYSmx5pl4xT4ALb6AVgNei/is5kn1MuXfh9b5wB+QE=",
  }
]
```

### update group
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';

const groupId = '8136923b-8203-4e08-bfe7-50eb3b558e2c';
const group = QuorumLightNodeSDK.cache.Group.get(groupId);
group.groupName = 'new group name';
const result = QuorumLightNodeSDK.cache.Group.update(groupId, group);
console.log(result);
```
``` javascript
// result
{ groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c' }
```

### create trx
```
$ yarn add ethers
```
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';
import { ethers } from 'ethers';

(async () => {
  const wallet = ethers.Wallet.createRandom();
  const result = await QuorumLightNodeSDK.chain.Trx.create({
    groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c',
    object: {
      type: 'Note',
      content: 'send from JavaScript SDK',
    },
    privateKey: wallet.privateKey,
  });
  console.log(result);
})();
```
``` javascript
// result
{ trx_id: '41f1e91e-5604-4539-8dee-7cf7e3ef5046' }
```

### get trx
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';

(async () => {
  const groupId = '8136923b-8203-4e08-bfe7-50eb3b558e2c';
  const trxId = '41f1e91e-5604-4539-8dee-7cf7e3ef5046';
  const result = await QuorumLightNodeSDK.chain.Trx.get(groupId, trxId);
  console.log(result);
})();
```
``` javascript
// result
{
  Data: "SdujS8K8zv2E6X839+J3tvIzkpYJti44Bw0cZ0weaYA4sTm0Z1rV/raKoa6zBwrAZYM9Zs+QdLS06jCVcaIvZrDqZysuAbTA/0JPmWVcLRdoiipdjAe6ov35f7WgVps6iSKUrw==",
  Expired: "1657279269056000000",
  GroupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
  Nonce: "1",
  ResendCount: "0",
  SenderPubkey: "Ak0RxoYwYhkAfg0ImkLh-ukRIHkoQ-Kw6QCRr_o83bmq",
  SenderSign: "Dz436tcTh+NSUjF38oUBjXkIezVfENb/pit9BY1v8jZrjzcwu66YE8OFO9/MzRNIkhgTK2wulfmk51mzJz/9Txs=",
  StorageType: "CHAIN",
  TimeStamp: "1657279239056000000",
  TrxId: "41f1e91e-5604-4539-8dee-7cf7e3ef5046",
  Type: "POST",
  Version: "1.0.0",
}
```

### list contents
``` javascript
import QuorumLightNodeSDK from 'quorum-light-node-sdk';

(async () => {
  const result = await QuorumLightNodeSDK.chain.Content.list({
    groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c',
  });
  console.log(result);
})();
```
``` javascript
// result
[
  {
    Data: { type: 'Note', content: 'send from JavaScript SDK' },
    Expired: 1657279269056000000,
    GroupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
    Nonce: 1,
    SenderPubkey: "Ak0RxoYwYhkAfg0ImkLh-ukRIHkoQ-Kw6QCRr_o83bmq",
    SenderSign: "Dz436tcTh+NSUjF38oUBjXkIezVfENb/pit9BY1v8jZrjzcwu66YE8OFO9/MzRNIkhgTK2wulfmk51mzJz/9Txs=",
    TimeStamp: "1657279239056000000",
    TrxId: "41f1e91e-5604-4539-8dee-7cf7e3ef5046",
    Version: "1.0.0",
  }
]
```
| Parameter      | Type |
| ----------- | ----------- |
| groupId      | string       |
| count   | number        |
| startTrx   | string        |
| reverse   | boolean        |

