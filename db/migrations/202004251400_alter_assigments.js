/* eslint-disable max-len */

exports.up = async knex => {
    try {
        const assignments = await knex('assignment').select();
        await knex.schema.dropTable('assignment');
        await knex.schema.createTable('assignment', t => {
            t.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            t.uuid('segment').notNull().references('id').inTable('segment');
            t.jsonb('coordinator');
            t.jsonb('managementCoordinator');
            t.jsonb('managementDepartment');
            t.jsonb('managementFraction');
            t.jsonb('fractionAssistant');
            t.jsonb('managementRadius');
            t.jsonb('pollster');
            t.enum('type', [
                'rural',
                'collectives',
                'psc',
                'particular',
                'recovery',
                'undefined'
            ]);
            t.bool('radiusOpen').defaultTo(false);
            t.jsonb('modifier');
            t.bool('deleted').defaultTo(false);
            t.timestamp('createdAt').defaultTo(knex.fn.now());
            t.timestamp('updatedAt').defaultTo(knex.fn.now());
            t.timestamp('deletedAt');
            t.integer('__v').defaultTo(0);
        });
        await knex.schema.alterTable('assignment', t => {
            t.unique(['segment', 'type']);
        });
        for(const assignment of assignments) {
            await knex.insert({
                coordinator: assignment.coordinator ? JSON.stringify([assignment.coordinator]) : null,
                managementCoordinator: assignment.managementCoordinator ? JSON.stringify([assignment.managementCoordinator]) : null,
                managementDepartment: assignment.managementDepartment? JSON.stringify([assignment.managementDepartment]) : null,
                managementFraction: assignment.managementFraction? JSON.stringify([assignment.managementFraction]) : null,
                fractionAssistant: assignment.fractionAssistant ? JSON.stringify([assignment.fractionAssistant]) : null,
                managementRadius: assignment.managementRadius? JSON.stringify([assignment.managementRadius]) : null,
                pollster: assignment.pollster? JSON.stringify([assignment.pollster]) : null,
                radiusOpen: assignment.radiusOpen,
                modifier: assignment.modifier ? JSON.stringify(assignment.modifier) : null,
                type: assignment.type,
                createdAt: assignment.createdAt,
                updatedAt: assignment.updatedAt,
                deletedAt: assignment.deletedAt,
                segment: assignment.segment,
                __v: assignment.__v
            }).into('assignment');
        }
        return Promise.resolve();
    } catch(err) {
        console.error(err);
    }
};

exports.down = () => {
    return Promise.resolve();
};
