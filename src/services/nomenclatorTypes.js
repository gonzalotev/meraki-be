const { nomenclatorTypes } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class NomenclatorTypesService {
    static async fetchStaticNomenclatorTypes() {
        const nomenclatorTypeGet = await nomenclatorTypes.find({FECHA_BAJA: null});
        return nomenclatorTypeGet.map(nomenclatorType => ({
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: !!nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA),
            userCreator: nomenclatorType.ID_USUARIO_ALTA,
            userDeleted: nomenclatorType.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclatorType.FECHA_BAJA)
        }));
    }

    static async findOne(filters){
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorType = await nomenclatorTypes.findById(formattedFilters);
        return {
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: !!nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA),
            userCreator: nomenclatorType.ID_USUARIO_ALTA,
            userDeleted: nomenclatorType.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclatorType.FECHA_BAJA)
        };
    }

    static async create(params, userCreator){
        const formattedNomenclatorType = {
            ID_TIPO: trim(params.id),
            DESCRIPCION: trim(params.description),
            SUPERVISADO: !!params.supervised,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: userCreator,
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const nomenclatorTypeId = await nomenclatorTypes.insertOne(formattedNomenclatorType, ['ID_TIPO']);
        const nomenclatorTypeReturn = await NomenclatorTypesService.findOne({id: nomenclatorTypeId});
        return nomenclatorTypeReturn;

    }

    static async update(filters, params){
        const formattedNomenclatorType = {
            ID_TIPO: trim(params.id),
            DESCRIPCION: trim(params.description),
            SUPERVISADO: !!params.supervised,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        console.log(formattedNomenclatorType);
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorTypeId = await nomenclatorTypes.updateOne(formattedFilters, formattedNomenclatorType, ['ID_TIPO']);
        const nomenclatorType = await NomenclatorTypesService.findOne({id: nomenclatorTypeId});
        return nomenclatorType;
    }

    static async deleteOne(filters, userDeleted){
        const{
            id: ID_TIPO
        } = filters;
        const id = {ID_TIPO};
        const success = await nomenclatorTypes.deleteOne(id, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = nomenclatorTypes.knex.select(columns)
                .from(nomenclatorTypes.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
            });
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_TIPO',
                modified: 'ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            }
        ];
    }
}

module.exports = NomenclatorTypesService;
