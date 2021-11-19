const { relationshipAutophrasesLetter: relationshipAutophrasesLetterModel } = include('models');
const AutoPhraseService = require('./autoPhrase');
const NomenclaturesGroupingService = require('./nomenclaturesGroupings');
const NomenclatorsService = require('./nomenclators');
const NomenclatorsGroupingService = require('./nomenclatorsGroupings');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RelationshipAutophrasesLetterService {
    static async fetch() {
        let relationshipsLetter = await relationshipAutophrasesLetterModel.find({ FECHA_BAJA: null });
        relationshipsLetter = relationshipsLetter.map(relationshipAutophrasesLetter => ({
            nomenclatorId: relationshipAutophrasesLetter.ID_NOMENCLADOR,
            groupId: relationshipAutophrasesLetter.ID_AGRUPACION,
            nomenclatureGroupId: relationshipAutophrasesLetter.ID_NOMENCLATURA_AGRUPACION,
            autophraseId: relationshipAutophrasesLetter.ID_AUTOFRASE,
            observation: relationshipAutophrasesLetter.OBSERVACION,
            domain: relationshipAutophrasesLetter.DOMINIO,
            approved: !!relationshipAutophrasesLetter.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesLetter.FECHA_ALTA),
            userCreator: relationshipAutophrasesLetter.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesLetter.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesLetter.FECHA_BAJA)
        }));
        await AutoPhraseService.getAutoPhrase(relationshipsLetter);
        await NomenclatorsService.getNomenclatorData(relationshipsLetter);
        await NomenclatorsGroupingService.getNomenclatorsGroupingsData(relationshipsLetter);
        await NomenclaturesGroupingService.getNomenclaturesGroupingsData(relationshipsLetter);
        return relationshipsLetter;

    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophrasesLetter = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_AGRUPACION: params.groupId,
            ID_NOMENCLATURA_AGRUPACION: trim(params.nomenclatureGroupId),
            ID_AUTOFRASE: params.autophraseId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesLetterId = await relationshipAutophrasesLetterModel.
            insertOne(formattedRelationshipAutophrasesLetter, ['ID_NOMENCLADOR', 'ID_AGRUPACION', 'ID_NOMENCLATURA_AGRUPACION', 'ID_AUTOFRASE']);
        const relationshipAutophrasesLetter = await RelationshipAutophrasesLetterService.findOne(
            {
                nomenclatorId: relationshipAutophrasesLetterId.ID_NOMENCLADOR,
                groupId: relationshipAutophrasesLetterId.ID_AGRUPACION,
                nomenclatureGroupId: relationshipAutophrasesLetterId.ID_NOMENCLATURA_AGRUPACION,
                autophraseId: relationshipAutophrasesLetterId.ID_AUTOFRASE
            });
        return relationshipAutophrasesLetter;
    }

    static async findOne({ nomenclatorId, groupId, nomenclatureGroupId, autophraseId }) {
        const ids = {
            ID_NOMENCLADOR: nomenclatorId,
            ID_AGRUPACION: groupId,
            ID_NOMENCLATURA_AGRUPACION: nomenclatureGroupId,
            ID_AUTOFRASE: autophraseId
        };
        let relationshipAutophrasesLetter = await relationshipAutophrasesLetterModel.findById(ids);
        relationshipAutophrasesLetter = relationshipAutophrasesLetter ? {
            nomenclatorId: relationshipAutophrasesLetter.ID_NOMENCLADOR,
            groupId: relationshipAutophrasesLetter.ID_AGRUPACION,
            nomenclatureGroupId: relationshipAutophrasesLetter.ID_NOMENCLATURA_AGRUPACION,
            autophraseId: relationshipAutophrasesLetter.ID_AUTOFRASE,
            observation: relationshipAutophrasesLetter.OBSERVACION,
            domain: relationshipAutophrasesLetter.DOMINIO,
            approved: !!relationshipAutophrasesLetter.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesLetter.FECHA_ALTA),
            userCreator: relationshipAutophrasesLetter.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesLetter.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesLetter.FECHA_BAJA)
        } : {};
        await NomenclatorsService.getNomenclatorData([relationshipAutophrasesLetter]);
        await NomenclatorsGroupingService.getNomenclatorsGroupingsData([relationshipAutophrasesLetter]);
        await NomenclaturesGroupingService.getNomenclaturesGroupingsData([relationshipAutophrasesLetter]);
        return relationshipAutophrasesLetter;
    }

    static async update(filters, params, userCreator) {
        const formattedRelationshipAutophrasesLetter = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_AGRUPACION: params.groupId,
            ID_NOMENCLATURA_AGRUPACION: trim(params.nomenclatureGroupId),
            ID_AUTOFRASE: params.autophraseId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesLetterId = await relationshipAutophrasesLetterModel.updateOne(
            { ID_AUTOFRASE: filters.autophraseId },
            formattedRelationshipAutophrasesLetter, ['ID_NOMENCLADOR', 'ID_AGRUPACION', 'ID_NOMENCLATURA_AGRUPACION', 'ID_AUTOFRASE']);
        const relationshipAutophrasesLetter = await RelationshipAutophrasesLetterService.findOne(
            {
                nomenclatorId: relationshipAutophrasesLetterId.ID_NOMENCLADOR,
                groupId: relationshipAutophrasesLetterId.ID_AGRUPACION,
                nomenclatureGroupId: relationshipAutophrasesLetterId.ID_NOMENCLATURA_AGRUPACION,
                autophraseId: relationshipAutophrasesLetterId.ID_AUTOFRASE
            });
        return relationshipAutophrasesLetter;
    }

    static async delete({ nomenclatorId, groupId, nomenclatureGroupId, autophraseId }) {
        const ids = { ID_NOMENCLADOR: nomenclatorId, ID_AGRUPACION: groupId,
            ID_NOMENCLATURA_AGRUPACION: nomenclatureGroupId, ID_AUTOFRASE: autophraseId };
        const success = await relationshipAutophrasesLetterModel.delete(ids, {
        });
        return !!success;
    }

    static async getTotal({ relationshipAutophrasesLetter }) {
        let result;
        if (relationshipAutophrasesLetter) {
            result = await relationshipAutophrasesLetterModel.countTotal(
                { ID_NOMENCLATURA_AGRUPACION: relationshipAutophrasesLetter, FECHA_BAJA: null });
        } else {
            result = await relationshipAutophrasesLetterModel.countTotal({ FECHA_BAJA: null });
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipAutophrasesLetterModel.knex.select(columns)
                .from(relationshipAutophrasesLetterModel.tableName)
                .where({FECHA_BAJA: null})
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
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ID_AGRUPACION',
                modified: 'AGRUPACIÓN ID'
            },
            {
                original: 'ID_NOMENCLATURA_AGRUPACION',
                modified: 'NOMENCLATURA AGRUPACIÓN ID'
            },
            {
                original: 'ID_AUTOFRASE',
                modified: 'AUTOFRASE ID'
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

module.exports = RelationshipAutophrasesLetterService;
