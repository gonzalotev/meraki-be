const { operativeSources } = include('models');
const { dateToString, arrayToCsvFormat, stringToDate } = include('util');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');

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
            FECHA_DESDE: stringToDate(params.dateFrom),
            FECHA_HASTA: stringToDate(params.dateTo),
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        const operativeId = await operativeSources.insertOne(formattedOperativeSource, ['ID_FUENTE']);
        const operative = await OperativeSourcesService.findOne({sourceId: operativeId});
        return operative;
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
            FECHA_DESDE: stringToDate(params.dateFrom),
            FECHA_HASTA: stringToDate(params.dateTo),
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        const formattedFilters = {ID_FUENTE: filters.sourceId};
        const operativeSourceId = await operativeSources.updateOne(formattedFilters, formattedOperativeSource, ['ID_FUENTE']);
        const operative = await OperativeSourcesService.findOne({sourceId: operativeSourceId});
        return operative;
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
            const fieldNames = [
                {
                    nameInTable: 'ID_FUENTE',
                    nameInFile: 'ID'
                },
                {
                    nameInTable: 'NOMBRE',
                    nameInFile: 'NOMBRE'
                },
                {
                    nameInTable: 'SIGLA',
                    nameInFile: 'SIGLA'
                },
                {
                    nameInTable: 'ID_TIPO_OPERATIVO',
                    nameInFile: 'TIPO DE OPERATIVO'
                },
                {
                    nameInTable: 'ID_FRECUENCIA',
                    nameInFile: 'FRECUENCIA'
                },
                {
                    nameInTable: 'FECHA_DESDE',
                    nameInFile: 'DESDE'
                },
                {
                    nameInTable: 'FECHA_HASTA',
                    nameInFile: 'HASTA'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                }
            ];

            const operativeSourcesTableHeaders = map(fieldNames, field => field.nameInTable);
            const operativeSourcesFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(operativeSourcesFileHeaders);
            csvString += headers;
            const stream = operativeSources.knex.select(operativeSourcesTableHeaders)
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

    static async fetchIfExist(Model, id, filters = {}){
        const sources = await operativeSources.knex(operativeSources.tableName).whereExists(function() {
            this.select('*')
                .from(Model.tableName)
                .whereRaw(`${operativeSources.tableName}.${id} = ${Model.tableName}.${id}`)
                .andWhere(filters);
        })
            .orderBy([{column: 'NOMBRE', order: 'asc'}]);

        return sources.map(source => ({
            id: source.ID_FUENTE,
            name: source.NOMBRE,
            initial: source.SIGLA,
            operativeTypeId: source.ID_TIPO_OPERATIVO,
            frequencyId: source.ID_FRECUENCIA,
            supportId: source.ID_SOPORTE,
            dateFrom: dateToString(source.FECHA_DESDE),
            dateTo: dateToString(source.FECHA_HASTA),
            observation: source.OBSERVACION,
            domain: source.DOMINIO,
            supervised: source.SUPERVISADO,
            createdAt: dateToString(source.FECHA_ALTA),
            userCreator: source.ID_USUARIO_ALTA,
            userDeleted: source.ID_USUARIO_BAJA,
            deletedAt: dateToString(source.FECHA_BAJA)
        }));
    }

    static async getSourceData(resources){
        const sourcesIds = uniq(map(resources, resource => resource.sourceId));
        let sources = await operativeSources.knex.select()
            .from(operativeSources.tableName)
            .whereIn('ID_FUENTE', sourcesIds);
        sources = map(sources, source => ({
            id: source.ID_FUENTE,
            name: source.NOMBRE,
            initials: source.SIGLA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.source = find(sources, source => source.id === resource.sourceId);
            return resource;
        });
    }
}

module.exports = OperativeSourcesService;
