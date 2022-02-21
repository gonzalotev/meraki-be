const { specialPhraseType: specialPhraseTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const toUpper = require('lodash/toUpper');

class SpecialPhraseTypeService {
    static async fetch() {
        const specialPhrasesTypes = await specialPhraseTypeModel.find();
        return specialPhrasesTypes.map(specialPhraseType => ({
            id: specialPhraseType.ID_TIPO_FRASE_ESPECIAL,
            description: specialPhraseType.DESCRIPCION,
            observation: specialPhraseType.OBSERVACION,
            domain: specialPhraseType.DOMINIO,
            approved: !!specialPhraseType.SUPERVISADO,
            createdAt: dateToString(specialPhraseType.FECHA_ALTA),
            userCreator: specialPhraseType.ID_USUARIO_ALTA
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
            userCreator: specialPhraseType.ID_USUARIO_ALTA
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
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const specialPhraseTypeId = await specialPhraseTypeModel.updateOne({ID_TIPO_FRASE_ESPECIAL: filters.id},
            formattedSpecialPhraseType, ['ID_TIPO_FRASE_ESPECIAL']);
        const specialPhraseType = await SpecialPhraseTypeService.findOne({id: specialPhraseTypeId});
        return specialPhraseType;
    }

    static delete(specialPhraseTypeId){
        return specialPhraseTypeModel.deleteOne({ID_TIPO_FRASE_ESPECIAL: specialPhraseTypeId});
    }

    static async getTotal({search}){
        const { total } = await specialPhraseTypeModel.countTotal({}, search, ['DESCRIPCION']);
        return total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = specialPhraseTypeModel.knex.select(columns)
                .from(specialPhraseTypeModel.tableName)
                .where({})
                .stream();
            stream.on('error', function(err) {
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
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_TIPO_FRASE_ESPECIAL',
                modified: 'TIPO FRASE ESPECIAL ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
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
}

module.exports = SpecialPhraseTypeService;
