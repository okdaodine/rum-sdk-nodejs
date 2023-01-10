import crypto from 'crypto';
import { hexToUint8Array } from './typeTransform';
import { assert, error } from './assert';

export const encrypt = (buffer: Uint8Array, key: string) => {
  assert(buffer, error.required('buffer'));
  assert(key, error.required('key'));
    var nonce = getRandomIV();
    var cipher = crypto.createCipheriv('aes-256-gcm', hexToUint8Array(key), nonce);
    var nonceCiphertextTag = Buffer.concat([
        nonce, 
        cipher.update(buffer), 
        cipher.final(), 
        cipher.getAuthTag()
    ]); 
    return nonceCiphertextTag;
}

function getRandomIV() {
    return crypto.randomBytes(12);
}


export const decrypt = (buffer: Uint8Array, key: string) => {
  var nonce = buffer.slice(0, 12);
  var ciphertext = buffer.slice(12, -16);
  var tag = buffer.slice(-16);  // Separate tag!

  var decipher = crypto.createDecipheriv('aes-256-gcm', hexToUint8Array(key), nonce); 
  decipher.setAuthTag(tag);
  var decrypted = Buffer.concat([
    decipher.update(ciphertext), 
    decipher.final(), 
  ]); 
  return decrypted;
}

