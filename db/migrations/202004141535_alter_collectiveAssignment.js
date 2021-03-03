exports.up = knex => {
    return knex.schema.alterTable('collectiveAssignment', t => {
        t.jsonb('modifier').defaultTo('[]');
    });
};

exports.down = knex => {
    return knex.schema.alterTable('collectiveAssignment', t => {
        t.dropColumn('modifier');
    });
};
