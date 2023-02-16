const SDK = require('../dist');

// const agePKeyBuffer = fs.readFileSync(`${__dirname}/encrypt_c8551e97-a37d-429e-99b4-1f4789786615`);

(async () => {
  // const ownerAgePrivateKey = await SDK.utils.ageEncryption.decrypt_with_user_passphrase('123123', ownerAgePrivateKeyBuffer);
  // const keystore = '{"address":"bd1d001764d1d54239cfcdd3825652440cccb11c","crypto":{"cipher":"aes-128-ctr","ciphertext":"5d160368ea140e8e4c5c83dd8d04a279367bd85834f44ae6ad485aa76affbfae","cipherparams":{"iv":"83e16758ed7e5558d9fb278293f2180b"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"536cfacbb1b9c071151dfb8de082458988d0a59b3efeaa40bfc8ae41ac57e897"},"mac":"6087aee1ea82d9bb57180916b9a9039aaee53543323e17ebcd0c3fbe1d8a5899"},"id":"61a0c97a-1dca-48de-82f1-bc6c79870c30","version":3}';
  // const wallet = await SDK.ethers.Wallet.fromEncryptedJson(keystore, '123123');
  // console.log({ privateKey: wallet.privateKey });
  // const agePublicKey = await SDK.utils.ageEncryption.get_public_key(agePrivateKey);
})();

const seed = 'rum://seed?v=1&e=1&n=0&b=5qUPypCaQhydxa3e69uV4g&c=OuZVi81GlhzNR7MhBVsD1s-qTCu7k-fjlNsjtQXHgBg&g=mRKB4um1Q_aRMx7US8apIA&k=A1pHhO97OV_D42ZQWGJtIqGPh3BO7HyOzqR8JUIJEW8N&s=YKbbAmZzKU1NXq_AJPSWdVK7Wz_E-1bIjGzLNw2-Af5o6F2mnQMzgIE97vSiKRf7A911ksqgx_WKf9rlWNpnWgE&t=F0Q-RgKXntg&a=my_test_group&y=test_app&u=http%3A%2F%2F127.0.0.1%3A8000%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyI5OTEyODFlMi1lOWI1LTQzZjYtOTEzMy0xZWQ0NGJjNmE5MjAiXSwiZXhwIjoxODM0MjEzNDMyLCJuYW1lIjoiYWxsb3ctOTkxMjgxZTItZTliNS00M2Y2LTkxMzMtMWVkNDRiYzZhOTIwIiwicm9sZSI6Im5vZGUifQ.9Ir_lm4fqEjhzXCtRoAhP0t1MZuBAsFm98XeyjxbzNA';
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