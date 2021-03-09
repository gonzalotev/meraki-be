const knex = include('helpers/database');

class UsersService {
    static async fetchUsers(q) {
        const users = await knex.select('*')
            .from('USUARIOS')
            .where('NOMBRE', 'like', `%${q}%`)
            .orWhere('APELLIDOS', 'like', `%${q}%`);

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
