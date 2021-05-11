const { AutoPhraseNomenclatureRelation } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class AutoPhraseNomenclatureRelationService {
    static async fetch(query) {
        const relations = await AutoPhraseNomenclatureRelation.findByPage(
            query.page,
            {FECHA_BAJA: null}
        );
        return relations.map(relation => ({
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            autoPhraseId: relation.ID_AUTOFRASE,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        }));
    }
    static async find(filters){
        const relation = await AutoPhraseNomenclatureRelation.findById({
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_NOMENCLATURA: filters.nomenclatureId,
            ID_AUTOFRASE: filters.autoPhraseId
        });
        return {
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            autoPhraseId: relation.ID_AUTOFRASE,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        };
    }
    static async create(params, userCreator){
        const formattedAutoPhraseNomenclatureRelation = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            ID_AUTOFRASE: params.autoPhraseId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null
        };
        const relation = await AutoPhraseNomenclatureRelation.insertOne(formattedAutoPhraseNomenclatureRelation);
        return {
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            autoPhraseId: relation.ID_AUTOFRASE,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        };
    }
    static async update(filters, params){
        const formattedAutoPhraseNomenclatureRelation = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            ID_AUTOFRASE: params.autoPhraseId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            FECHA_BAJA: stringToDate(params.deletedAt),
            ID_USUARIO_BAJA: params.userDeleted
        };
        const relation = await AutoPhraseNomenclatureRelation.updateOne({
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_NOMENCLATURA: filters.nomenclatureId,
            ID_AUTOFRASE: filters.autoPhraseId
        }, formattedAutoPhraseNomenclatureRelation);
        return {
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            autoPhraseId: relation.ID_AUTOFRASE,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        };
    }
    static async delete(filters, userDeleted){
        const success = await AutoPhraseNomenclatureRelation.deleteOne({
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_NOMENCLATURA: filters.nomenclatureId,
            ID_AUTOFRASE: filters.autoPhraseId
        }, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = AutoPhraseNomenclatureRelationService;
