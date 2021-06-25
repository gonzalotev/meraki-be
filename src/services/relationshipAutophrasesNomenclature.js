const { relationshipAutophrasesNomenclature: relationshipAutophrasesNomenclatureModel } = include('models');
const AutoPhraseService = require('./autoPhrase');
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
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA)
        }));
        await AutoPhraseService.getAutoPhrase(relationshipsTypes);

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
            FECHA_ALTA: new Date()
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
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const relationshipAutophrasesNomenclature = await relationshipAutophrasesNomenclatureModel.findById(
            { ID_AUTOFRASE: filters.id });
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
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA)
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
            FECHA_ALTA: new Date()
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
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA)
        };
    }


    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_AUTOFRASE: filters.id };
        const success = await relationshipAutophrasesNomenclatureModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RelationshipAutophrasesNomenclatureService;
