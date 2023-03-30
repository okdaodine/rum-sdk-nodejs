const SDK = require('../dist');
const Long = require('long');

SDK.cache.Group.clear();
const seed = 'rum://seed?v=1&e=0&n=0&c=s0zNmcCwQfEDxdpLr2KPw6bojsy0AKfXgKyd9ZbmHQw&g=nQlmtk4MSwuZzByIkdDSZA&k=AmSGoLh7Sibt9bB4Evmbr8zqfOFwH9aQz6R0dzRsE-zf&s=MYRJC6uYDWi4jETXpLKgQjWWMgECErUbKPBR_HwMgZMtwV3RNwLIHJ-9O3burX58QV48weWwmxcxlzc2LtbhggE&t=F1DZ4ed61bg&a=group1&y=group_timeline&u=http%3A%2F%2F127.0.0.1%3A8000%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyI5ZDA5NjZiNi00ZTBjLTRiMGItOTljYy0xYzg4OTFkMGQyNjQiXSwiZXhwIjoxODM3NzYyMjI2LCJuYW1lIjoiYWxsb3ctOWQwOTY2YjYtNGUwYy00YjBiLTk5Y2MtMWM4ODkxZDBkMjY0Iiwicm9sZSI6Im5vZGUifQ.bmqlapqJW2tW_aTc6luucs2VKxFmbVJuEyZWHd-hCoo';
const group = SDK.cache.Group.add(seed);
const ethPrivateKey = '0xcc1bc29f7ae0163840309ec84b06f669d37c42d649778cf6a7034ab245301999';

(async () => {
  const trx = {
    "GroupId":"9d0966b6-4e0c-4b0b-99cc-1c8891d0d264",
    "Data":"wRiA0iO6zM+4bOcmEaCzUqlxf/08GmvOWQXi/06tIqSx2HEVF7RE6Ag4dZOHGCLzTzlNnnAB5Sj1HzyadEI5eOBxdO7ZRN1Z+N+PU8WkRe4CD2z9GjRtWcYeYQ55lu27/HVK9yNAG4tUkRGyCmBwlOc11i1CXJ1Oy3FifCyDDVK5c86iTQ0Osx4cdGuobQ==",
    "SenderPubkey":"AmSGoLh7Sibt9bB4Evmbr8zqfOFwH9aQz6R0dzRsE-zf",
    "SenderSign":"jyzXY+ryPOt04ARxorJTnBzylIw2NnFxWNB1wHLp2AV9Pc0h0dAyGD2e7R0Dx3dxpvwQGgri35tvucQP95LmUQA=",
    "TimeStamp":"1680151626438620000",
    "TrxId":"888fea18-a417-4ca6-9216-a34082d2e833",
    "Version":"2.0.0",
  };
  // const trx = {
  //   GroupId: 'caeeac75-62e8-4e0b-9ac7-a78c6f8ac7f8',
  //   Data: 'eWxn/oYsJdUPVvJwkmvl0glHMO0P8SYSQUzsoyXgQhuhJ4aA66evPAL0kXhJuGlw7oVW+WK+FpZ/xyWSvr5rTRFfEYWxJfVqD1g5TnqRq3uEvM4J/6YtQJa8weGe7bsBYbMAOcuN9Q==',
  //   SenderPubkey: 'A8hfNDAUJzdndxfHbZ3BrcooEY5zpMy9ajEk18mnh81V',
  //   SenderSign: '9j26OsO1FDzj+3arU+9H9pTKTnqGjhKdP9EQ1JC1BZNwbzoZVZRKtqnpCHhVsRr9TyhAuxUGsR1VX8wjorkcbxs=',
  //   TimeStamp: '1680148475255123456',
  //   TrxId: '1621db68-c9b8-4654-bcba-014c68580791',
  //   Version: '2.0.0',
  // }
  trx.TimeStamp =  Long.fromValue(trx.TimeStamp);
  const intValue = trx.TimeStamp.toString();
  console.log(`[]:`, { intValue });
  console.log(`[]:`, { trx });
  const result = SDK.utils.verifyTrx(trx);
  console.log(`[]:`, { result });
  return;

  try {
    const timestamp = Long.fromValue('1680148475255123456');
    const res = await SDK.chain.Trx.create({
      data: {
        type: "Create",
        object : {
          type: "Note",
          id: "1",
          content: "hello world",
        }
      },
      timestamp,
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
        stop = true;
        const trx = await SDK.chain.Trx.get(content.GroupId, content.TrxId);
        trx.TimeStamp = Long.fromValue(trx.TimeStamp);
        console.log(`[]:`, { trx });
        const result = SDK.utils.verifyTrx(trx);
        console.log(`[]:`, { result });
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