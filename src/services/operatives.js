const knex = include('helpers/database');
const { dateTimeToString, getOffset, getPageSize } = include('util');
const { rolesTableName } = include('constants');

class UserRoleService {
    static async find() {
        const operatives = await knex.select()
            .from(rolesTableName)
            .limit(getPageSize())
            .offset(getOffset(1));

        return operatives.map(operative => ({
            id: operative.ID_OPERATIVO,
            sourceId: operative.ID_ROL_USUARIO,
            description: operative.DESCRIPCION,
            domain: operative.DOMINIO,
            observation: operative.OBSERVACION,
            dateArrival: dateTimeToString(operative.FECHA_LLEGADA_OPERATIVO),
            totalRecords: operative.TOTAL_REGISTROS_OPERATIVO,
            contact: operative.CONTACTO_OPERATIVO,
            contactEmail: operative.MAIL_CONTACTO,
            encodingStartDate: dateTimeToString(operative.FECHA_INICIO_CODIFICACION),
            encodingEndDate: dateTimeToString(operative.FECHA_FIN_CODIFICACION),
            deliveryStartDate: dateTimeToString(operative.FECHA_INICIO_ENTREGA),
            eraseStartDate: dateTimeToString(operative.FECHA_INICIO_BORRADO),
            eraseEndDate: dateTimeToString(operative.FECHA_FIN_BORRADO),
            totalQuality: operative.CALIDAD_TOTAL_OPERATIVO,
            errorLevel: operative.NIVEL_ERROR_OPERATIVO,
            userId: operative.ID_USUARIO,
            createdAt: dateTimeToString(operative.FECHA_ALTA)
        }));
    }
}

module.exports = UserRoleService;
