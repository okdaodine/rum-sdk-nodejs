export const hexToUint8Array = (hexString: string) =>
  Uint8Array.from(hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

export const uint8ArrayToHex = (buffer: Uint8Array) =>
  new Uint8Array(buffer).reduce((str: any, byte: any) => str + byte.toString(16).padStart(2, '0'), '');

export const uint8ArrayToString = (buffer: Uint8Array) => new TextDecoder().decode(buffer);

export const stringToUint8Array = (str: string) => new TextEncoder().encode(str);

