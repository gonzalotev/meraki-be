const { operativeSources } = include('models');
const { dateToString } = include('util');
const {arrayToCsvFormat} = include('util');

class OperativeSourcesService {
    static async fetch() {
        const operatives = await operativeSources.find({FECHA_BAJA: null});
        return operatives.map(operative => ({
            sourceId: operative.ID_FUENTE,
            name: operative.NOMBRE,
            initial: operative.SIGLA,
            operativeTypeId: operative.ID_TIPO_OPERATIVO,
            frequencyId: operative.ID_FRECUENCIA,
            supportId: operative.ID_SOPORTE,
            dateFrom: dateToString(operative.FECHA_DESDE),
            dateTo: dateToString(operative.FECHA_HASTA),
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            supervised: operative.SUPERVISADO,
            createdAt: dateToString(operative.FECHA_ALTA),
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            deletedAt: dateToString(operative.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedOperativeSource = {
            ID_FUENTE: params.sourceId,
            NOMBRE: params.name,
            SIGLA: params.initial,
            ID_TIPO_OPERATIVO: params.operativeTypeId,
            ID_FRECUENCIA: params.frequencyId,
            ID_SOPORTE: params.supportId,
            FECHA_DESDE: params.dateFrom,
            FECHA_HASTA: params.dateTo,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: params.createdAt,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt
        };
        const operative = await operativeSources.insertOne(formattedOperativeSource);

        return {
            sourceId: operative.ID_FUENTE,
            name: operative.NOMBRE,
            initial: operative.SIGLA,
            operativeTypeId: operative.ID_TIPO_OPERATIVO,
            frequencyId: operative.ID_FRECUENCIA,
            supportId: operative.ID_SOPORTE,
            dateFrom: dateToString(operative.FECHA_DESDE),
            dateTo: dateToString(operative.FECHA_HASTA),
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            supervised: operative.SUPERVISADO,
            createdAt: dateToString(operative.FECHA_ALTA),
            userCreator: operative.ID_USUARIO_ALTA,
            userDeleted: operative.ID_USUARIO_BAJA,
            deletedAt: dateToString(operative.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const formattedFilters = {ID_FUENTE: filters.sourceId};
        const operativeSource = await operativeSources.findById(formattedFilters);
        return {
            sourceId: operativeSource.ID_FUENTE,
            name: operativeSource.NOMBRE,
            initial: operativeSource.SIGLA,
            operativeTypeId: operativeSource.ID_TIPO_OPERATIVO,
            frequencyId: operativeSource.ID_FRECUENCIA,
            supportId: operativeSource.ID_SOPORTE,
            dateFrom: dateToString(operativeSource.FECHA_DESDE),
            dateTo: dateToString(operativeSource.FECHA_HASTA),
            observation: operativeSource.OBSERVACION,
            domain: operativeSource.DOMINIO,
            supervised: operativeSource.SUPERVISADO,
            createdAt: dateToString(operativeSource.FECHA_ALTA),
            userCreator: operativeSource.ID_USUARIO_ALTA,
            userDeleted: operativeSource.ID_USUARIO_BAJA,
            deletedAt: dateToString(operativeSource.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedOperativeSource = {
            ID_FUENTE: params.sourceId,
            NOMBRE: params.name,
            SIGLA: params.initial,
            ID_TIPO_OPERATIVO: params.operativeTypeId,
            ID_FRECUENCIA: params.frequencyId,
            ID_SOPORTE: params.supportId,
            FECHA_DESDE: params.dateFrom,
            FECHA_HASTA: params.dateTo,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: params.createdAt,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt
        };
        const formattedFilters = {ID_FUENTE: filters.sourceId};
        const operativeSource = await operativeSources.updateOne(formattedFilters, formattedOperativeSource);
        return {
            sourceId: operativeSource.ID_FUENTE,
            name: operativeSource.NOMBRE,
            initial: operativeSource.SIGLA,
            operativeTypeId: operativeSource.ID_TIPO_OPERATIVO,
            frequencyId: operativeSource.ID_FRECUENCIA,
            supportId: operativeSource.ID_SOPORTE,
            dateFrom: dateToString(operativeSource.FECHA_DESDE),
            dateTo: dateToString(operativeSource.FECHA_HASTA),
            observation: operativeSource.OBSERVACION,
            domain: operativeSource.DOMINIO,
            supervised: operativeSource.SUPERVISADO,
            createdAt: dateToString(operativeSource.FECHA_ALTA),
            userCreator: operativeSource.ID_USUARIO_ALTA,
            userDeleted: operativeSource.ID_USUARIO_BAJA,
            deletedAt: dateToString(operativeSource.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await operativeSources.deleteOne({ID_FUENTE: filters.sourceId}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const operativeSourcesHeaders = [
                'ID_FUENTE',
                'NOMBRE',
                'SIGLA',
                'ID_TIPO_OPERATIVO',
                'ID_FRECUENCIA',
                'FECHA_DESDE',
                'FECHA_HASTA',
                'OBSERVACION',
                'DOMINIO',
                'SUPERVISADO'
            ];
            const headers = arrayToCsvFormat(operativeSourcesHeaders);
            csvString += headers;
            const stream = operativeSources.knex.select(operativeSourcesHeaders)
                .from(operativeSources.tableName)
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function() {
                resolve(csvString);
            });
        });
    }
}

module.exports = OperativeSourcesService;
