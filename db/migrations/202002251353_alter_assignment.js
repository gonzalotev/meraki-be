exports.up = knex => {
    return knex.schema.alterTable('assignment', t => {
        t.bool('radiusOpen').defaultTo('false');
    });
};

exports.down = knex => {
    return knex.schema.alterTable('assignment', t => {
        t.dropColumn('radiusOpen');
    });
};
