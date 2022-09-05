const CryptoService = require('./crypto');
const knex = include('helpers/database');

class AuthService {
    static async login(email, password) {
        const cryptoService = new CryptoService('base64');
        const response = await knex.select('*')
            .from('login')
            .innerJoin('Rol', 'Rol.IdRol', 'login.IdRol' )
            .where({
                Usuario: email,
                Password: cryptoService.hash(password)
            });
        return response[0] && {
            email: response[0].Usuario,
            role: response[0].Nombre,
            userId: response[0].IdUser
        };
    }

}

module.exports = AuthService;
