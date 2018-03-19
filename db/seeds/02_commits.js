exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('commits').del()
    .then(function () {
      // Inserts seed entries
      return knex('commits').insert([
        { id: 1, user_id: 1, message: 'testing testing', createdAt: '2018-02-27T23:35:11Z' },
        { id: 2, user_id: 1, message: 'lets play rock paper scissors!', createdAt: '2018-02-23T02:34:21Z' },
        { id: 3, user_id: 1, message: 'lets play roshambo', createdAt: '2018-02-23T02:34:21Z' },
        { id: 4, user_id: 1, message: 'for charlie', createdAt: '2018-02-16T17:55:41Z' },
        { id: 5, user_id: 1, message: 'pushing some stuff up', createdAt: '2018-02-15T21:41:14Z' },
        { id: 6, user_id: 1, message: 'so i dont break stuff anymore than i already have', createdAt: '2018-02-15T21:40:50Z' },
        { id: 7, user_id: 1, message: 'test', createdAt: '2018-02-13T17:19:03Z' },
        { id: 8, user_id: 1, message: 'test', createdAt: '2018-02-08T21:41:15Z' },
        { id: 9, user_id: 1, message: 'test', createdAt: '2018-01-28T22:54:40Z' },
        { id: 10, user_id: 1, message: 'look mom', createdAt: '2018-01-19T17:34:08Z' },
        { id: 11, user_id: 2, message: 'commit this, bro', createdAt: '2018-01-18T17:34:08Z'},
        { id: 12, user_id: 2, message: 'all tests passing', createdAt: '2018-01-17T17:34:08Z'},
        { id: 13, user_id: 2, message: 'wicked gnarly bug slaying', createdAt: '2018-01-16T17:34:08Z'}
      ]);
    });
};
