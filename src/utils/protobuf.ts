import protobufjs from 'protobufjs'

export const create = ({
  type, payload
}: {
  type: string;
  payload: any;
}): Uint8Array => {
  const root = protobufjs.Root.fromJSON(jsonDescriptor);
  const object = root.lookupType(type);
  const pbAny = root.lookupType('Any');
  const errMsg = object.verify(payload);
  if (errMsg) {
    throw new Error(errMsg)
  }
  const message = object.create(payload);
  const buffer = object.encode(message).finish();
  if (type.includes('Activity')) {
    const pbAnyMessage = pbAny.create({
      typeUrl: `type.googleapis.com/${type}`,
      value: buffer
    });
    const pbAnyBuffer = pbAny.encode(pbAnyMessage).finish();
    return new Uint8Array(pbAnyBuffer);
  } else {
    return new Uint8Array(buffer);
  }
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
    const pbAny = root.lookupType('Any');
    const pbMessage = pbAny.decode(buffer);
    const pbAnyObject = pbAny.toObject(pbMessage)
    const message = object.decode(pbAnyObject.value);
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
       "Any": {
        "fields": {
         "typeUrl": {
          "type": "string",
          "id": 1
         },
         "value": {
          "type": "bytes",
          "id": 2
         }
        }
       },
       "_Object": {
        "fields": {
         "id": {
          "type": "string",
          "id": 1
         },
         "type": {
          "type": "string",
          "id": 2
         },
         "attributedTo": {
          "rule": "repeated",
          "type": "_Object",
          "id": 4
         },
         "content": {
          "type": "string",
          "id": 6
         },
         "name": {
          "type": "string",
          "id": 8
         },
         "image": {
          "rule": "repeated",
          "type": "_Object",
          "id": 12
         },
         "inreplyto": {
          "type": "_Object",
          "id": 13
         },
         "summary": {
          "type": "string",
          "id": 19
         }
        }
       },
       "Activity": {
        "fields": {
         "id": {
          "type": "string",
          "id": 1
         },
         "type": {
          "type": "string",
          "id": 2
         },
         "attributedTo": {
          "rule": "repeated",
          "type": "_Object",
          "id": 4
         },
         "content": {
          "type": "string",
          "id": 6
         },
         "name": {
          "type": "string",
          "id": 8
         },
         "image": {
          "rule": "repeated",
          "type": "_Object",
          "id": 12
         },
         "inreplyto": {
          "type": "_Object",
          "id": 13
         },
         "summary": {
          "type": "string",
          "id": 19
         },
         "actor": {
          "type": "_Object",
          "id": 29
         },
         "object": {
          "type": "_Object",
          "id": 30
         },
         "target": {
          "type": "_Object",
          "id": 31
         },
         "result": {
          "type": "_Object",
          "id": 32
         },
         "origin": {
          "type": "_Object",
          "id": 33
         }
        }
       },
       "TrxType": {
        "values": {
         "POST": 0,
         "SCHEMA": 2,
         "PRODUCER": 3,
         "ANNOUNCE": 4,
         "REQ_BLOCK_FORWARD": 5,
         "REQ_BLOCK_BACKWARD": 6,
         "REQ_BLOCK_RESP": 7,
         "BLOCK_SYNCED": 8,
         "BLOCK_PRODUCED": 9,
         "USER": 10,
         "ASK_PEERID": 11,
         "ASK_PEERID_RESP": 12,
         "CHAIN_CONFIG": 13,
         "APP_CONFIG": 14
        }
       },
       "TrxStroageType": {
        "values": {
         "CHAIN": 0,
         "CACHE": 1
        }
       },
       "Trx": {
        "fields": {
         "TrxId": {
          "type": "string",
          "id": 1
         },
         "Type": {
          "type": "TrxType",
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
          "type": "TrxStroageType",
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