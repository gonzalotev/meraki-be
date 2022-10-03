const knex = include('helpers/database');

class RoleService {
    static async fetch() {
        const roles = await knex.select('*').from('Rol');
        return roles.map(role => ({
            id: role.IdRol,
            name: role.Nombre
        }));
    }
}

module.exports = RoleService;
