exports.up = async knex => {
    await knex.schema.createTable('segment', t => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.string('stateId', 2).notNull();
        t.string('department', 3).notNull();
        t.string('fraction', 3).notNull();
        t.string('radius', 3).notNull();
        t.string('segment', 3).notNull();
        t.jsonb('data');
        t.string('type');
        t.bool('deleted').defaultTo('false');
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
        t.integer('__v').defaultTo(0);
    });
    return knex.schema.alterTable('segment', t => {
        t.unique(['stateId', 'department', 'fraction', 'radius', 'segment']);
    });
};

exports.down = knex => {
    return knex.schema.dropTable('segment');
};
