const { ethers } = require('ethers');

const keystore = '{"address":"c1f6eadd1ab9371e26f5ed14dcc79974a22f1dd7","crypto":{"cipher":"aes-128-ctr","ciphertext":"138dce8034f654ebeabadadbd51ce95e41656e5f56771fc9bea93f62c6f20f14","cipherparams":{"iv":"d749334d0fe4ece970b2a5c302881844"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8f1097c894a4558366386fc6b30a9149ca3b2db0f6df733ca2c997f8b49bc22c"},"mac":"b766f2479529b569f78a874fad0e523a45b91f25432991a4cdf252df21613469"},"id":"92e86e83-f165-4386-bbcc-6d8e7fba9afe","version":3}';

(async () => {
  const wallet = await ethers.Wallet.fromEncryptedJson(keystore, '123123');
  console.log(wallet.privateKey);
})();