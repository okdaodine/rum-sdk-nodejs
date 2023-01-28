const SDK = require('../dist');

const seed = 'rum://seed?v=1&e=0&n=0&b=i0caEO2rQCyLcRZG7Z2mSQ&c=dqrjHP5fXKmle9uxby0xEMcvf8dZ5xokWt8QeWqVP54&g=rcolwftES56uCpP-VVHqVg&k=Akksp-MPvBV63hHlNo9Rjstw_RjNQLKF4kPzT0GVlCUj&s=oOq8ku8v1h5YznhSAYEHvHDC0C0WkT8nAQ55iOiU33ZdPcbM3yy8JG9FfjRJ35t14fckUnpETrg3jY5T7XzmnQA&t=Fz54B85fpNA&a=%E6%B5%8B%E8%AF%95%E8%BD%BB%E8%8A%82%E7%82%B9+announce+%E5%8A%9F%E8%83%BD&y=group_timeline&u=http%3A%2F%2F127.0.0.1%3A8000%3Fjwt%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd0dyb3VwcyI6WyJhZGNhMjVjMS1mYjQ0LTRiOWUtYWUwYS05M2ZlNTU1MWVhNTYiXSwiZXhwIjoxODMyNTg4MDg3LCJuYW1lIjoiYWxsb3ctYWRjYTI1YzEtZmI0NC00YjllLWFlMGEtOTNmZTU1NTFlYTU2Iiwicm9sZSI6Im5vZGUifQ.4NFJczUMfUwwb5KLH2NXJ4f8Ox8H6OH2P-M2KzS9JB8';
const group = SDK.cache.Group.add(seed);
const ethPrivateKey = '0xcc1bc29f7ae0163840309ec84b06f669d37c42d649778cf6a7034ab245301999';
const agePublicKey = 'age1ytl626hqq0ulfdejq8a5n6056rh0va5egsmvamcfae9q5grtn9msxny5ls';

(async () => {
  try {
    const res = await SDK.chain.Auth.announce({
      groupId: group.groupId,
      privateKey: ethPrivateKey,
      encryptPubKey: agePublicKey
    });
    console.log(`[announce result]:`, { res });
  } catch (err) {
    console.log(err);
  }
})();


function sleep (duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}