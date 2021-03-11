const knex = include('helpers/database');
const mapKeys = require('lodash/mapKeys');
const invert = require('lodash/invert');
const tableName = 'TIPOS_DE_ROLES';
const attributes = {
    id: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    observation: 'OBSERVACION',
    domain: 'DOMINIO',
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA',
    userCreator: 'ID_USUARIO_ALTA',
    userDestroyer: 'ID_USUARIO_BAJA'
};

class RoleTypeService {
    static async find() {
        const roles = await knex.select('*').from(tableName);
        return roles.map(role => RoleTypeService.convert(role));
    }

    static convert(props){
        return mapKeys(props, (value, key)=>invert(attributes)[key]);
    }

    static reverse(props){
        return mapKeys(props, (value, key)=>attributes[key]);
    }
}

module.exports = RoleTypeService;
