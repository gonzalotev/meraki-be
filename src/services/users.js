const knex = include('helpers/database');

class UsersService {
    static async fetchUsers(term) {
        const users = await knex.select('*')
            .from('USUARIOS')
            .where('NOMBRE', 'like', `%${term}%`)
            .orWhere('APELLIDOS', 'like', `%${term}%`);

        return users.map(user => ({
            surname: user.APELLIDOS,
            name: user.NOMBRE,
            username: user.USUARIO,
            documentId: user.DOCUMENTO,
            domain: user.DOMINIO,
            createdAt: user.FECHA_ALTA,
            deletedAt: user.FECHA_BAJA,
            email: user.MAIL,
            observation: user.OBSERVACION
        }));
    }
}

module.exports = UsersService;
