const SDK = require('../dist');
const Long = require('long');

SDK.cache.Group.clear();
const seed = 'rum://seed?v=1&e=0&n=0&c=s0zNmcCwQfEDxdpLr2KPw6bojsy0AKfXgKyd9ZbmHQw&g=nQlmtk4MSwuZzByIkdDSZA&k=AmSGoLh7Sibt9bB4Evmbr8zqfOFwH9aQz6R0dzRsE-zf&s=MYRJC6uYDWi4jETXpLKgQjWWMgECErUbKPBR_HwMgZMtwV3RNwLIHJ-9O3burX58QV48weWwmxcxlzc2LtbhggE&t=F1DZ4ed61bg&a=group1&y=group_timeline&u=http%3A%2F%2F127.0.0.1%3A8000%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyI5ZDA5NjZiNi00ZTBjLTRiMGItOTljYy0xYzg4OTFkMGQyNjQiXSwiZXhwIjoxODM3NzYyMjI2LCJuYW1lIjoiYWxsb3ctOWQwOTY2YjYtNGUwYy00YjBiLTk5Y2MtMWM4ODkxZDBkMjY0Iiwicm9sZSI6Im5vZGUifQ.bmqlapqJW2tW_aTc6luucs2VKxFmbVJuEyZWHd-hCoo';
const group = SDK.cache.Group.add(seed);
const ethPrivateKey = '0xcc1bc29f7ae0163840309ec84b06f669d37c42d649778cf6a7034ab245301999';

(async () => {
  try {
    const res = await SDK.chain.Trx.create({
      data: {
        type: "Create",
        object : {
          type: "Note",
          id: "1",
          content: "hello world",
        }
      },
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
        stop = true;
        const trx = await SDK.chain.Trx.get(content.GroupId, content.TrxId);
        delete trx.Expired;
        console.log({ trx });
        const result = SDK.utils.verifyTrx(trx);
        console.log(`[Verify Trx Result]:`, { result });
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