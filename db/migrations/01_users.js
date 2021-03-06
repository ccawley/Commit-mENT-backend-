exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('user_name').notNullable().defaultTo('')
    table.string('full_name').notNullable().defaultTo('')
    table.string('avatar_image').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
