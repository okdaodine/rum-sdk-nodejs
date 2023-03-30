const SDK = require('../dist');
const Long = require('long');

(async () => {
  {
    // trx from GO
    const trx = {
      "GroupId":"9d0966b6-4e0c-4b0b-99cc-1c8891d0d264",
      "Data":"wRiA0iO6zM+4bOcmEaCzUqlxf/08GmvOWQXi/06tIqSx2HEVF7RE6Ag4dZOHGCLzTzlNnnAB5Sj1HzyadEI5eOBxdO7ZRN1Z+N+PU8WkRe4CD2z9GjRtWcYeYQ55lu27/HVK9yNAG4tUkRGyCmBwlOc11i1CXJ1Oy3FifCyDDVK5c86iTQ0Osx4cdGuobQ==",
      "SenderPubkey":"AmSGoLh7Sibt9bB4Evmbr8zqfOFwH9aQz6R0dzRsE-zf",
      "SenderSign":"jyzXY+ryPOt04ARxorJTnBzylIw2NnFxWNB1wHLp2AV9Pc0h0dAyGD2e7R0Dx3dxpvwQGgri35tvucQP95LmUQA=",
      "TimeStamp":"1680151626438620000",
      "Expired":"1680151656438620000",
      "TrxId":"888fea18-a417-4ca6-9216-a34082d2e833",
      "Version":"2.0.0",
    };
    const result = SDK.utils.verifyTrx(trx);
    console.log('Verify trx from GO', { result });
  }

  {
    // trx from Javascript
    const trx = {
      GroupId: 'caeeac75-62e8-4e0b-9ac7-a78c6f8ac7f8',
      Data: 'eWxn/oYsJdUPVvJwkmvl0glHMO0P8SYSQUzsoyXgQhuhJ4aA66evPAL0kXhJuGlw7oVW+WK+FpZ/xyWSvr5rTRFfEYWxJfVqD1g5TnqRq3uEvM4J/6YtQJa8weGe7bsBYbMAOcuN9Q==',
      SenderPubkey: 'A8hfNDAUJzdndxfHbZ3BrcooEY5zpMy9ajEk18mnh81V',
      SenderSign: '9j26OsO1FDzj+3arU+9H9pTKTnqGjhKdP9EQ1JC1BZNwbzoZVZRKtqnpCHhVsRr9TyhAuxUGsR1VX8wjorkcbxs=',
      TimeStamp: '1680148475255123456',
      TrxId: '1621db68-c9b8-4654-bcba-014c68580791',
      Version: '2.0.0',
    }
    const result = SDK.utils.verifyTrx(trx);
    console.log('Verify trx from Javascript', { result });
  }
})();
