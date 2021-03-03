exports.up = knex => {
    return knex.schema.createTable('collectiveFieldData', t => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.uuid('collectiveDwelling').notNull().references('id').inTable('collectiveDwelling');
        t.integer('visited').defaultTo(0);
        t.integer('uninhabited').defaultTo(0);
        t.integer('absent').defaultTo(0);
        t.integer('total').defaultTo(0);
        t.integer('expected').defaultTo(0);
        t.integer('dwellingMissingVisit').defaultTo(0);
        t.integer('womans').defaultTo(0);
        t.integer('mans').defaultTo(0);
        t.integer('totalPopulation').defaultTo(0);
        t.string('turn').defaultTo('noon');
        t.bool('deleted').defaultTo('false');
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
        t.integer('__v').defaultTo(0);
    });
};

exports.down = knex => {
    return knex.schema.dropTable('collectiveFieldData');
};
