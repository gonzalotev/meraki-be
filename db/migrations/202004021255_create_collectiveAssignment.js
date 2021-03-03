exports.up = knex => {
    return knex.schema.createTable('collectiveAssignment', t => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.uuid('collectiveDwelling').notNull().references('id').inTable('collectiveDwelling');
        t.jsonb('pollster').defaultTo('[]');
        t.bool('deleted').defaultTo('false');
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
        t.integer('__v').defaultTo(0);
    });
};

exports.down = knex => {
    return knex.schema.dropTable('collectiveAssignment');
};
