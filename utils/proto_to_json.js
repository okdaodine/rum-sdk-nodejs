const protobufjs = require("protobufjs");
const fs = require('fs');

const root = protobufjs.loadSync('quorum.proto');
const json = JSON.stringify(root.toJSON(), null, 1);
fs.writeFileSync('proto.json', json);
console.log('Created proto.json');