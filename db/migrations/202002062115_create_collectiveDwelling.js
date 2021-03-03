exports.up = knex => {
    return knex.schema.createTable('collectiveDwelling', t => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.uuid('segment').notNull().references('id').inTable('segment');
        t.string('label').notNull();
        t.jsonb('data');
        t.bool('deleted').defaultTo('false');
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
        t.integer('__v').defaultTo(0);
    });
};

exports.down = knex => {
    return knex.schema.dropTable('collectiveDwelling');
};
