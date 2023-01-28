const SDK = require('../dist');

// const agePKeyBuffer = fs.readFileSync(`${__dirname}/encrypt_c8551e97-a37d-429e-99b4-1f4789786615`);

(async () => {
  // const ownerAgePrivateKey = await SDK.utils.ageEncryption.decrypt_with_user_passphrase('123123', ownerAgePrivateKeyBuffer);
  // const keystore = '{"address":"bd1d001764d1d54239cfcdd3825652440cccb11c","crypto":{"cipher":"aes-128-ctr","ciphertext":"5d160368ea140e8e4c5c83dd8d04a279367bd85834f44ae6ad485aa76affbfae","cipherparams":{"iv":"83e16758ed7e5558d9fb278293f2180b"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"536cfacbb1b9c071151dfb8de082458988d0a59b3efeaa40bfc8ae41ac57e897"},"mac":"6087aee1ea82d9bb57180916b9a9039aaee53543323e17ebcd0c3fbe1d8a5899"},"id":"61a0c97a-1dca-48de-82f1-bc6c79870c30","version":3}';
  // const wallet = await SDK.ethers.Wallet.fromEncryptedJson(keystore, '123123');
  // console.log({ privateKey: wallet.privateKey });
  // const agePublicKey = await SDK.utils.ageEncryption.get_public_key(agePrivateKey);
})();

const seed = 'rum://seed?v=1\u0026e=1\u0026n=0\u0026b=Dt97x_0GRU2I4ITvmMjgOQ\u0026c=a0AmHujXwrEWDtT8U2WM6zA_CwUxD_dWGCt-tgPWbww\u0026g=gBeKYDn_RDOebPL2xW_kdA\u0026k=AlmBSKXu4371lUDiQnxC3YtnFAXkvCTgYD2MYjlLOmdr\u0026s=mhRDMPeAqygMRCaEg73DIhW-APH-M2ChQR3igw41LwQfkfL2EaFSOny9ivXypjn4e9cykQxBqyoGAps-GyGqWwA\u0026t=Fz54YjqDhIg\u0026a=my_test_group\u0026y=test_app\u0026u=http%3A%2F%2F127.0.0.1%3A8000%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyI4MDE3OGE2MC0zOWZmLTQ0MzMtOWU2Yy1mMmY2YzU2ZmU0NzQiXSwiZXhwIjoxODMyNTg4NDc1LCJuYW1lIjoiYWxsb3ctODAxNzhhNjAtMzlmZi00NDMzLTllNmMtZjJmNmM1NmZlNDc0Iiwicm9sZSI6Im5vZGUifQ.B2IZL2nWFhl2rWQa5_vhxP-lpdpe0MLo4JgvxUudsyA';
const group = SDK.cache.Group.add(seed);
const ethPrivateKey = '0xcc1bc29f7ae0163840309ec84b06f669d37c42d649778cf6a7034ab245301999';
const agePrivateKey = 'AGE-SECRET-KEY-1LGP788TRDU9YVP3G67PUF0SFW2HTAT2NP24KE37F08YP2XUACKCQ9SVUMF';
const agePublicKey = 'age1ytl626hqq0ulfdejq8a5n6056rh0va5egsmvamcfae9q5grtn9msxny5ls';

(async () => {
  try {
    const res = await SDK.chain.Trx.create({
      data: {
        type: "Create",
        object : {
          type: "Note",
          id: "1",
          content: "hello world from private group",
        }
      },
      agePublicKeys: [ agePublicKey ],
      groupId: group.groupId,
      privateKey: ethPrivateKey
    });
    console.log(res);
    const trxId = res.trx_id;
    let stop = false;
    while(!stop) {
      await sleep(2000);
      console.log('fetched content');
      const contents = await SDK.chain.Content.list({
        reverse: true,
        count: 1,
        groupId: group.groupId,
      });
      const content = contents[0];
      if (content && content.TrxId === trxId) {
        console.log({ content });
        const encryptedBytes = SDK.utils.Base64.toUint8Array(content.Data);
        const dataBytes = await SDK.utils.ageEncryption.decrypt_with_x25519(agePrivateKey, encryptedBytes);
        const decrypteData = SDK.utils.typeTransform.uint8ArrayToString(dataBytes);
        console.log({ decrypteData });
        stop = true;
      }
    }
  } catch (err) {
    console.log(err);
  }
})();


function sleep (duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}