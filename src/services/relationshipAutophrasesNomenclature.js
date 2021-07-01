const { relationshipAutophrasesNomenclature: relationshipAutophrasesNomenclatureModel } = include('models');
const AutoPhraseService = require('./autoPhrase');
const NomenclatorsService = require('./nomenclators');
const NomenclaturesService = require('./nomenclatures');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class RelationshipAutophrasesNomenclatureService {
    static async fetch() {
        let relationshipsTypes = await relationshipAutophrasesNomenclatureModel.find({ FECHA_BAJA: null });
        relationshipsTypes = relationshipsTypes.map(relationshipAutophrasesNomenclature => ({
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA),
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        }));
        await AutoPhraseService.getAutoPhrase(relationshipsTypes);
        await NomenclatorsService.getNomenclatorData(relationshipsTypes);
        await NomenclaturesService.getNomenclatureData(relationshipsTypes);

        return relationshipsTypes;

    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophrasesNomenclature = {
            ID_AUTOFRASE: trim(params.autophraseId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date(),
            AUTOFRASE: trim(params.id),
            NOMENCLATURA: trim(params.nomenclature),
            ID_VARIABLE: trim(params.variableId),
            ABREVIATURA: trim(params.abbreviation),
            VARIABLE_ESTADISTICA: trim(params.staticalVariable)
        };
        const relationshipAutophrasesNomenclature = await relationshipAutophrasesNomenclatureModel.
            insertOne(formattedRelationshipAutophrasesNomenclature);

        return {
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA),
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        };
    }

    static async findOne(filters) {
        const relationshipAutophrasesNomenclature = await relationshipAutophrasesNomenclatureModel.findById(
            { ID_AUTOFRASE: filters.autophraseId, ID_NOMENCLADOR: filters.nomenclatorId,
                ID_NOMENCLATURA: filters.nomenclatureId });
        return {
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA),
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        };
    }

    static async update(filters, params, userCreator) {
        const formattedRelationshipAutophrasesNomenclature = {
            ID_AUTOFRASE: trim(params.autophraseId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date(),
            AUTOFRASE: trim(params.id),
            NOMENCLATURA: trim(params.nomenclature),
            ID_VARIABLE: trim(params.variableId),
            ABREVIATURA: trim(params.abbreviation),
            VARIABLE_ESTADISTICA: trim(params.staticalVariable)
        };
        const relationshipAutophrasesNomenclature = await relationshipAutophrasesNomenclatureModel.updateOne(
            { ID_AUTOFRASE: filters.id },
            formattedRelationshipAutophrasesNomenclature);
        return {
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA),
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        };
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_AUTOFRASE: filters.autophraseId,
            ID_NOMENCLADOR: filters.nomenclatorId, ID_NOMENCLATURA: filters.nomenclatureId };
        const success = await relationshipAutophrasesNomenclatureModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RelationshipAutophrasesNomenclatureService;
