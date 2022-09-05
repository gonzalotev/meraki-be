const {hash} = require('../utils');
const knex = include('helpers/database');

class UserService {
    static updatePassword(userId, password) {
        return knex('Usuario')
            .update({password: hash(password)})
            .where({id: userId});
    }

    static async find(filters) {
        const response = await knex.select('*')
            .from('login')
            .where(filters)
            .innerJoin('Rol', 'Rol.IdRol', 'login.IdRol' );
        return {
            email: response[0].Usuario,
            role: response[0].Nombre,
            id: response[0].IdUser
        };
    }

    static update(userId, user) {
        return knex('login')
            .update(user)
            .where({IdUser: userId});
    }
}

module.exports = UserService;
