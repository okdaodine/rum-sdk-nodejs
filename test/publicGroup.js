const SDK = require('../dist');

SDK.cache.Group.clear();
const seed = 'rum://seed?v=1&e=0&n=0&c=g7Ek1tQUQMKAjgb7IlpgIYaULDPRxhr9oEL_ke4_rbI&g=yu6sdWLoTguax6eMb4rH-A&k=Ag0EYNtXc_9UZylO3bEsPlpCBya1ce2hQvY8pUkMbDPW&s=zhrrZGD-4DCeWXZlHwfIYIonHZbafaqNOMhnQILVmlYAsjqWjQFGX9iSEJ-79z4IndA0Jeq3m5WH6EQozXH-kQA&t=F1DAsP6k7tA&a=default&y=group_timeline&u=http%3A%2F%2F127.0.0.1%3A8000%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyJjYWVlYWM3NS02MmU4LTRlMGItOWFjNy1hNzhjNmY4YWM3ZjgiXSwiZXhwIjoxODM3NzM0NTI4LCJuYW1lIjoiYWxsb3ctY2FlZWFjNzUtNjJlOC00ZTBiLTlhYzctYTc4YzZmOGFjN2Y4Iiwicm9sZSI6Im5vZGUifQ.Q4bFtLavRQ3aUmSHjrechsvknGOGJUtA59LnNDwBnjY';
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