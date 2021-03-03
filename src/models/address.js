class Address {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    getData(id) {
        return this.knex.select('teamLeader', 'user', 'state', 'subCoordinator', 'id').from('addresses').where('id', '=', id).first();
    }
}

module.exports = knex => new Address(knex, 'Address');
