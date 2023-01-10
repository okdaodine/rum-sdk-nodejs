import * as Base64 from 'js-base64';
import { ethers } from 'ethers';
import { uint8ArrayToHex } from './typeTransform';

export default (basePubKeyOrAddress: string) => {
  if (ethers.utils.isAddress(basePubKeyOrAddress)) {
    return basePubKeyOrAddress;
  }
  const u8s = Base64.toUint8Array(basePubKeyOrAddress);
  const publicKey = uint8ArrayToHex(u8s);
  return ethers.utils.computeAddress(`0x${publicKey}`);
}
