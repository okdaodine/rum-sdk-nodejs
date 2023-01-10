import * as Base64 from 'js-base64';
import { uint8ArrayToHex } from './typeTransform';

export default (base64: string) => {
  const groupIdWithoutDashes = uint8ArrayToHex(Base64.toUint8Array(base64));
  return addDashesToUuid(groupIdWithoutDashes);
}

const addDashesToUuid = (i: string)=>i.slice(0,8)+"-"+i.slice(8,12)+"-"+i.slice(12,16)+"-"+i.slice(16,20)+"-"+i.slice(20);