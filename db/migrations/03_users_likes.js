exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_likes', (table) => {
    table.increments("id")
    table.integer("user_id")
    table.foreign("user_id").references("users.id").onDelete("CASCADE")
    table.integer("commit_id")
    table.foreign("commit_id").references("commits.id").onDelete("CASCADE")
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_likes')
};
