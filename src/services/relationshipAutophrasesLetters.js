const { relationshipAutophrasesLetter: relationshipAutophrasesLetterModel } = include('models');
const AutoPhraseService = require('./autoPhrase');
const NomenclatorsService = require('./nomenclators');
const { dateToString, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

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

    static async findOne(filters) {
        const relationshipAutophrasesLetter = await relationshipAutophrasesLetterModel.findById(
            {
                ID_NOMENCLADOR: filters.nomenclatorId,
                ID_AGRUPACION: filters.groupId,
                ID_NOMENCLATURA_AGRUPACION: filters.nomenclatureGroupId,
                ID_AUTOFRASE: filters.autophraseId
            });
        return {
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
        };
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

    static async delete(filters, userDeleted) {
        const formattedFilters = {
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_AGRUPACION: filters.groupId,
            ID_NOMENCLATURA_AGRUPACION: filters.nomenclatureGroupId,
            ID_AUTOFRASE: filters.autophraseId
        };

        const success = await relationshipAutophrasesLetterModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
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

    static getCsv() {
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_NOMENCLADOR',
                    nameInFile: 'ID DE NOMENCLADOR'
                },
                {
                    nameInTable: 'ID_AGRUPACION',
                    nameInFile: 'ID AGRUPACION'
                },
                {
                    nameInTable: 'ID_NOMENCLATURA_AGRUPACION',
                    nameInFile: 'ID NOMENCLATURA AGRUPACION'
                },
                {
                    nameInTable: 'ID_AUTOFRASE',
                    nameInFile: 'ID DE AUTOFRASE'
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
            const stream = relationshipAutophrasesLetterModel.knex.select(tableHeaders)
                .from(relationshipAutophrasesLetterModel.tableName)
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function () {
                resolve(csvString);
            });
        });
    }
}

module.exports = RelationshipAutophrasesLetterService;
