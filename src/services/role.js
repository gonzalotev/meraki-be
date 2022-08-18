const knex = include('helpers/database');

class RoleService {
    static fetch() {
        return knex.select('*').from('Rol');
    }
}

module.exports = RoleService;
