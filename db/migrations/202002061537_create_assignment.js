exports.up = async knex => {
    await knex.schema.createTable('assignment', t => {
        t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        t.uuid('segment').notNull().references('id').inTable('segment');
        t.uuid('nationalCoordinator');
        t.uuid('coordinator');
        t.uuid('managementCoordinator');
        t.uuid('managementDepartment');
        t.uuid('managementFraction');
        t.uuid('fractionAssistant');
        t.uuid('managementRadius');
        t.uuid('pollster');
        t.enum('type', [
            'rural',
            'collectives',
            'psc',
            'particular',
            'recovery'
        ]);
        t.jsonb('modifier');
        t.bool('deleted').defaultTo('false');
        t.timestamp('createdAt').defaultTo(knex.fn.now());
        t.timestamp('updatedAt').defaultTo(knex.fn.now());
        t.timestamp('deletedAt');
        t.integer('__v').defaultTo(0);
    });
    return knex.schema.alterTable('assignment', t => {
        t.unique(['segment', 'type']);
    });
};

exports.down = knex => {
    return knex.schema.dropTable('assignment');
};
