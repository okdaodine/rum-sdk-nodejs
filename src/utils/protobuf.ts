import protobufjs from 'protobufjs'

export const create = ({
  type, payload
}: {
  type: string;
  payload: any;
}): Uint8Array => {
  const root = protobufjs.Root.fromJSON(jsonDescriptor);
  const object = root.lookupType(type);
  const errMsg = object.verify(payload);
  if (errMsg) {
    throw new Error(errMsg)
  }
  const message = object.create(payload);
  const buffer = object.encode(message).finish();
  return new Uint8Array(buffer);
};

export const toObject = ({
  type, buffer
}: {
  type: string;
  buffer: Uint8Array;
}) => {
  try {  
    const root = protobufjs.Root.fromJSON(jsonDescriptor);
    const object = root.lookupType(type);
    const message = object.decode(buffer);
    const result = object.toObject(message);
    return result
  } catch (_) {}
  return {}
};

const jsonDescriptor = {
  "nested": {
   "quorum": {
    "nested": {
     "pb": {
      "nested": {
       "Trx": {
        "fields": {
         "TrxId": {
          "type": "string",
          "id": 1
         },
         "Type": {
          "type": "string",
          "id": 2
         },
         "GroupId": {
          "type": "string",
          "id": 3
         },
         "Data": {
          "type": "bytes",
          "id": 4
         },
         "TimeStamp": {
          "type": "int64",
          "id": 5
         },
         "Version": {
          "type": "string",
          "id": 6
         },
         "Expired": {
          "type": "int64",
          "id": 7
         },
         "ResendCount": {
          "type": "int64",
          "id": 8
         },
         "Nonce": {
          "type": "int64",
          "id": 9
         },
         "SenderPubkey": {
          "type": "string",
          "id": 10
         },
         "SenderSign": {
          "type": "bytes",
          "id": 11
         },
         "StorageType": {
          "type": "string",
          "id": 12
         }
        }
       }
      }
     }
    }
   }
  }
 }