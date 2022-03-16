const { operativeSources } = include('models');
const { dateToString, stringDate, dateString } = include('util');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const isDate = require('lodash/isDate');
const find = require('lodash/find');

class OperativeSourcesService {
    static async fetch() {
        const operatives = await operativeSources.find();
        return operatives.map(operative => ({
            sourceId: operative.ID_FUENTE,
            name: operative.NOMBRE,
            initial: operative.SIGLA,
            operativeTypeId: operative.ID_TIPO_OPERATIVO,
            frequencyId: operative.ID_FRECUENCIA,
            supportId: operative.ID_SOPORTE,
            dateFrom: dateString(operative.FECHA_DESDE, 'YYYY-MM-DD'),
            dateTo: dateString(operative.FECHA_HASTA, 'YYYY-MM-DD'),
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            supervised: !!operative.SUPERVISADO,
            createdAt: dateString(operative.FECHA_ALTA, 'YYYY-MM-DD'),
            userCreator: operative.ID_USUARIO_ALTA
        }));
    }

    static async create(params, userCreator) {
        const formattedOperativeSource = {
            NOMBRE: params.name,
            SIGLA: params.initial,
            ID_TIPO_OPERATIVO: params.operativeTypeId,
            ID_FRECUENCIA: params.frequencyId,
            ID_SOPORTE: params.supportId,
            FECHA_DESDE: stringDate(params.dateFrom, 'YYYY-MM-DD'),
            FECHA_HASTA: stringDate(params.dateTo, 'YYYY-MM-DD'),
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const sourceId = await operativeSources.insertOne(formattedOperativeSource, ['ID_FUENTE']);
        const source = await OperativeSourcesService.findOne({ sourceId });
        return source;
    }

    static async findOne(filters) {
        const formattedFilters = { ID_FUENTE: filters.sourceId };
        const operativeSource = await operativeSources.findById(formattedFilters);

        return {
            sourceId: operativeSource.ID_FUENTE,
            name: operativeSource.NOMBRE,
            initial: operativeSource.SIGLA,
            operativeTypeId: operativeSource.ID_TIPO_OPERATIVO,
            frequencyId: operativeSource.ID_FRECUENCIA,
            supportId: operativeSource.ID_SOPORTE,
            dateFrom: dateString(operativeSource.FECHA_DESDE, 'YYYY-MM-DD'),
            dateTo: dateString(operativeSource.FECHA_HASTA, 'YYYY-MM-DD'),
            observation: operativeSource.OBSERVACION,
            domain: operativeSource.DOMINIO,
            supervised: operativeSource.SUPERVISADO,
            createdAt: dateString(operativeSource.FECHA_ALTA, 'YYYY-MM-DD'),
            userCreator: operativeSource.ID_USUARIO_ALTA
        };
    }

    static async update(filters, params) {
        const formattedOperativeSource = {
            NOMBRE: params.name,
            SIGLA: params.initial,
            ID_TIPO_OPERATIVO: params.operativeTypeId,
            ID_FRECUENCIA: params.frequencyId,
            ID_SOPORTE: params.supportId,
            FECHA_DESDE: stringDate(params.dateFrom, 'YYYY-MM-DD'),
            FECHA_HASTA: stringDate(params.dateTo, 'YYYY-MM-DD'),
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised
        };
        const formattedFilters = { ID_FUENTE: filters.sourceId };
        const sourceId = await operativeSources.updateOne(formattedFilters, formattedOperativeSource, ['ID_FUENTE']);
        const source = await OperativeSourcesService.findOne({ sourceId });
        return source;
    }

    static async delete(filters) {
        const success = await operativeSources.delete({ ID_FUENTE: filters.sourceId });
        return !!success;
    }

    static async getSourceOperativeData(resources){
        const sourcesIds = uniq(map(resources, resource => resource.sourceId));
        let sourcesData = await operativeSources.findByValues('ID_FUENTE', sourcesIds);
        sourcesData = map(sourcesData, source => ({
            id: source.ID_FUENTE,
            name: source.NOMBRE,
            initials: source.SIGLA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.source = find(sourcesData, source => source.id === resource.sourceId);
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = operativeSources.knex.select(columns)
                .from(operativeSources.tableName)
                .where({ FECHA_BAJA: null })
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                const formattedData = map(data, function(value) {
                    if(isDate(value)) {
                        return dateToString(value);
                    }
                    return value;
                });
                worksheet.addRow(formattedData);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'ID_FUENTE',
                modified: 'ID'
            },
            {
                original: 'ID_SOPORTE',
                modified: 'SOPORTE ID'
            },
            {
                original: 'NOMBRE',
                modified: 'NOMBRE'
            },
            {
                original: 'SIGLA',
                modified: 'SIGLA'
            },
            {
                original: 'ID_TIPO_OPERATIVO',
                modified: 'TIPO DE OPERATIVO'
            },
            {
                original: 'ID_FRECUENCIA',
                modified: 'FRECUENCIA'
            },
            {
                original: 'FECHA_DESDE',
                modified: 'DESDE'
            },
            {
                original: 'FECHA_HASTA',
                modified: 'HASTA'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }

    static async fetchIfExist(Model, id, filters = {}) {
        const sources = await operativeSources.knex(operativeSources.tableName).whereExists(function () {
            this.select('*')
                .from(Model.tableName)
                .whereRaw(`${operativeSources.tableName}.${id} = ${Model.tableName}.${id}`)
                .andWhere(filters);
        })
            .orderBy([{ column: 'NOMBRE', order: 'asc' }]);

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
            userCreator: source.ID_USUARIO_ALTA
        }));
    }

    static async getSourceData(resources) {
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
