
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').insert([
    { id: 1, first_name: 'Sarah', last_name: 'Sanders', email: 'sarah.sanders@gmail.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' },
    { id: 2, first_name: 'Eric', last_name: 'Erickson', email: 'ee@aol.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa'},
    { id: 3, first_name: 'Sam', last_name: 'Samson', email: 'samsam@yahoo.com', hashed_password: '$2a$10$x5BXBKwhjo.VCl8A/tuFfuLfEv8narDxPbvx6yMHlG.Y6EreIcCFa' }
  ])
  .then(() => {
    return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
  })
}
