const SDK = require('../dist');

const seed = 'rum://seed?v=1&e=0&n=0&b=8ZAwwgyGTuGNJ2NaigoWzQ&c=jk0UoCB0HU_5IvF92qN1L4yKFxG6_YeGaJRmaCFHLlE&g=sJ4WkrDyQUOqV2T4SFVP6w&k=AvIH22HXYpDs6bitoirrnXfrKQA8WIVyfdPLxO9y1H2P&s=QPpJhwNAMGM8Zdeke0Q1CkeOSdNAbHmE6s5Cq-w7ASFKVZFI9uSFSCbB10EaXj_H9rt9VrnFkmTZwQ-Is-zO-gE&t=FztcWfvxD6A&a=rum-sdk-testing&y=group_timeline&u=http%3A%2F%2F103.61.39.166%3A6090%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyJiMDllMTY5Mi1iMGYyLTQxNDMtYWE1Ny02NGY4NDg1NTRmZWIiXSwiZXhwIjoxODMxNzEzMjI5LCJuYW1lIjoiYWxsb3ctYjA5ZTE2OTItYjBmMi00MTQzLWFhNTctNjRmODQ4NTU0ZmViIiwicm9sZSI6Im5vZGUifQ.cXSc0JA7H081crSntiYDWrBC_JMqHKi9iw7V1O_7ZRg';
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
        console.log({ content });
        stop = true;
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