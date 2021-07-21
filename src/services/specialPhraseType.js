const { specialPhraseType: specialPhraseTypeModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const toUpper = require('lodash/toUpper');

class SpecialPhraseTypeService {
    static async fetch() {
        const specialPhrasesTypes = await specialPhraseTypeModel.find({FECHA_BAJA: null});
        return specialPhrasesTypes.map(specialPhraseType => ({
            id: specialPhraseType.ID_TIPO_FRASE_ESPECIAL,
            description: specialPhraseType.DESCRIPCION,
            observation: specialPhraseType.OBSERVACION,
            domain: specialPhraseType.DOMINIO,
            approved: !!specialPhraseType.SUPERVISADO,
            createdAt: dateToString(specialPhraseType.FECHA_ALTA),
            userCreator: specialPhraseType.ID_USUARIO_ALTA,
            userDeleted: specialPhraseType.ID_USUARIO_BAJA,
            deletedAt: dateToString(specialPhraseType.FECHA_BAJA)
        }));

    }

    static async create(params, userCreator) {
        const formattedSpecialPhraseType = {
            ID_TIPO_FRASE_ESPECIAL: null,
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const specialPhraseTypeId = await specialPhraseTypeModel.insertOne(formattedSpecialPhraseType, ['ID_TIPO_FRASE_ESPECIAL']);
        const specialPhraseType = await SpecialPhraseTypeService.findOne({id: specialPhraseTypeId});
        return specialPhraseType;
    }

    static async findOne(filters){
        const specialPhraseType = await specialPhraseTypeModel.findById({ID_TIPO_FRASE_ESPECIAL: filters.id});
        return {
            id: specialPhraseType.ID_TIPO_FRASE_ESPECIAL,
            description: specialPhraseType.DESCRIPCION,
            observation: specialPhraseType.OBSERVACION,
            domain: specialPhraseType.DOMINIO,
            approved: !!specialPhraseType.SUPERVISADO,
            createdAt: dateToString(specialPhraseType.FECHA_ALTA),
            userCreator: specialPhraseType.ID_USUARIO_ALTA,
            userDeleted: specialPhraseType.ID_USUARIO_BAJA,
            deletedAt: dateToString(specialPhraseType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedSpecialPhraseType = {
            ID_TIPO_FRASE_ESPECIAL: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const specialPhraseTypeId = await specialPhraseTypeModel.updateOne({ID_TIPO_FRASE_ESPECIAL: filters.id},
            formattedSpecialPhraseType, ['ID_TIPO_FRASE_ESPECIAL']);
        const specialPhraseType = await SpecialPhraseTypeService.findOne({id: specialPhraseTypeId});
        return specialPhraseType;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_FRASE_ESPECIAL: filters.id};
        const success = await specialPhraseTypeModel.deleteOne(formattedFilters, {
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
                    nameInTable: 'ID_TIPO_FRASE_ESPECIAL',
                    nameInFile: 'ID'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
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
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = specialPhraseTypeModel.knex.select(tableHeaders)
                .from(specialPhraseTypeModel.tableName)
                .orderBy([{column: 'ID_TIPO_FRASE_ESPECIAL', order: 'asc'}])
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

module.exports = SpecialPhraseTypeService;
