# rum-sdk-nodejs
Rum SDK for nodejs

## Install
```
$ npm install rum-sdk-nodejs
```

## Usage

```javascript
const SDK = require('rum-sdk-nodejs');

// import seed
const group = SDK.cache.Group.add('rum://...');

// create and send trx
SDK.chain.Trx.create({
  data: {
    type: "Create",
    object : {
      type: "Note",
      id: "1",
      content: "hello world",
    }
  },
  groupId: group.groupId,
  privateKey: '...'
});

// get data from chain
const result = await SDK.chain.Content.list({
  groupId: group.groupId,
});
console.log(result);
// [{
//   "Data": {
//     "type": "Create",
//     "object" : {
//       "type": "Note",
//       "id": "1",
//       "content": "hello world",
//     }
//   },
//   "TrxId": "...",
//   "GroupId": "...",
//   "TimeStamp": "...",
//   "Version": "1.0.0",
//   "Expired": 1672284016463,
//   "Nonce": 1,
//   "SenderPubkey": "...",
//   "SenderSign": "..."
// }]
```

## Examples

### Add group
``` javascript
const SDK = require('rum-sdk-nodejs');
const result = SDK.cache.Group.add('rum://seed?xxx');
console.log(result);
// { groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c' }
```

### Get group
``` javascript
const SDK = require('rum-sdk-nodejs');
const groupId = '8136923b-8203-4e08-bfe7-50eb3b558e2c';
const result = SDK.cache.Group.get(groupId);
console.log(result);
// {
//   appKey: "group_timeline",
//   chainAPIs: ['http://127.0.0.1:9003'],
//   cipherKey: "c0f3a84920c2c5b93ba308a92302789ca991cb2376c11b16d48fefb31666d5d2",
//   consensusType: "poa",
//   encryptionType: "public",
//   groupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
//   groupName: "chat group",
//   ownerPubKey: "Aqa6ngNxgrVhf2kQc4nA-0Wr4tsWiaBrshZJPujT5B9g",
//   signature: "GDLJ+TcXuo95q+CsUFty7pvMIYZRFRQ3VwrparvjKy00wIYSmx5pl4xT4ALb6AVgNei/is5kn1MuXfh9b5wB+QE=",
// }
```

### List groups
``` javascript
const SDK = require('rum-sdk-nodejs');
const result = SDK.cache.Group.list();
console.log(result);
// [{
//   appKey: "group_timeline",
//   chainAPIs: ['http://127.0.0.1:9003'],
//   cipherKey: "c0f3a84920c2c5b93ba308a92302789ca991cb2376c11b16d48fefb31666d5d2",
//   consensusType: "poa",
//   encryptionType: "public",
//   groupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
//   groupName: "chat group",
//   ownerPubKey: "Aqa6ngNxgrVhf2kQc4nA-0Wr4tsWiaBrshZJPujT5B9g",
//   signature: "GDLJ+TcXuo95q+CsUFty7pvMIYZRFRQ3VwrparvjKy00wIYSmx5pl4xT4ALb6AVgNei/is5kn1MuXfh9b5wB+QE=",
// }]
```

### Create trx
``` javascript
const SDK = require('rum-sdk-nodejs');
const ethers = require('ethers');
(async () => {
  const wallet = ethers.Wallet.createRandom();
  const result = await SDK.chain.Trx.create({
    groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c',
    object: {
      type: 'Note',
      content: 'send from JavaScript SDK',
    },
    privateKey: wallet.privateKey,
  });
  console.log(result);
})();
// { trx_id: '41f1e91e-5604-4539-8dee-7cf7e3ef5046' }
```

### Get trx
``` javascript
const SDK = require('rum-sdk-nodejs');
(async () => {
  const groupId = '8136923b-8203-4e08-bfe7-50eb3b558e2c';
  const trxId = '41f1e91e-5604-4539-8dee-7cf7e3ef5046';
  const result = await SDK.chain.Trx.get(groupId, trxId);
  console.log(result);
})();
// {
//   Data: "SdujS8K8zv2E6X839+J3tvIzkpYJti44Bw0cZ0weaYA4sTm0Z1rV/raKoa6zBwrAZYM9Zs+QdLS06jCVcaIvZrDqZysuAbTA/0JPmWVcLRdoiipdjAe6ov35f7WgVps6iSKUrw==",
//   Expired: "1657279269056000000",
//   GroupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
//   Nonce: "1",
//   ResendCount: "0",
//   SenderPubkey: "Ak0RxoYwYhkAfg0ImkLh-ukRIHkoQ-Kw6QCRr_o83bmq",
//   SenderSign: "Dz436tcTh+NSUjF38oUBjXkIezVfENb/pit9BY1v8jZrjzcwu66YE8OFO9/MzRNIkhgTK2wulfmk51mzJz/9Txs=",
//   StorageType: "CHAIN",
//   TimeStamp: "1657279239056000000",
//   TrxId: "41f1e91e-5604-4539-8dee-7cf7e3ef5046",
//   Type: "POST",
//   Version: "1.0.0",
// }
```

### List contents
``` javascript
const SDK = require('rum-sdk-nodejs');
(async () => {
  const result = await SDK.chain.Content.list({
    groupId: '8136923b-8203-4e08-bfe7-50eb3b558e2c',
  });
  console.log(result);
})();
// [{
//   Data: { type: 'Note', content: 'send from JavaScript SDK' },
//   Expired: 1657279269056000000,
//   GroupId: "8136923b-8203-4e08-bfe7-50eb3b558e2c",
//   Nonce: 1,
//   SenderPubkey: "Ak0RxoYwYhkAfg0ImkLh-ukRIHkoQ-Kw6QCRr_o83bmq",
//   SenderSign: "Dz436tcTh+NSUjF38oUBjXkIezVfENb/pit9BY1v8jZrjzcwu66YE8OFO9/MzRNIkhgTK2wulfmk51mzJz/9Txs=",
//   TimeStamp: "1657279239056000000",
//   TrxId: "41f1e91e-5604-4539-8dee-7cf7e3ef5046",
//   Version: "1.0.0",
// }]
```
| Parameter      | Type |
| ----------- | ----------- |
| groupId      | string       |
| count   | number        |
| startTrx   | string        |
| reverse   | boolean        |

