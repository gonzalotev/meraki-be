const { relationshipNomenclature: relationshipNomenclatureModel } =
  include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');
class RelationshipNomenclatureService {
    static async fetch(query) {
        const autosPhrases = await relationshipNomenclatureModel.findByPage(
            query.page,
            { FECHA_BAJA: null },
            relationshipNomenclatureModel.selectableProps,
            [{ column: 'ID_NOMENCLADOR', order: 'asc' }]
        );
        return autosPhrases.map(relationshipNomenclature => ({
            nomenclatorId: relationshipNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipNomenclature.ID_NOMENCLATURA,
            autophraseId: relationshipNomenclature.ID_AUTOFRASE,
            approved: relationshipNomenclature.SUPERVISADO,
            observation: relationshipNomenclature.OBSERVACION,
            domain: relationshipNomenclature.DOMINIO,
            createdAt: dateToString(relationshipNomenclature.FECHA_ALTA),
            userCreator: relationshipNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipNomenclature.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedRelationshipNomenclature = {
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            ID_AUTOFRASE: trim(params.autophraseId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const relationshipNomenclature =
      await relationshipNomenclatureModel.insertOne(
          formattedRelationshipNomenclature
      );

        return {
            nomenclatorId: relationshipNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipNomenclature.ID_NOMENCLATURA,
            autophraseId: relationshipNomenclature.ID_AUTOFRASE,
            approved: relationshipNomenclature.SUPERVISADO,
            observation: relationshipNomenclature.OBSERVACION,
            domain: relationshipNomenclature.DOMINIO,
            createdAt: dateToString(relationshipNomenclature.FECHA_ALTA),
            userCreator: relationshipNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipNomenclature.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const relationshipNomenclature =
      await relationshipNomenclatureModel.findById({
          ID_NOMENCLADOR: filters.id
      });
        return {
            nomenclatorId: relationshipNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipNomenclature.ID_NOMENCLATURA,
            autophraseId: relationshipNomenclature.ID_AUTOFRASE,
            approved: relationshipNomenclature.SUPERVISADO,
            observation: relationshipNomenclature.OBSERVACION,
            domain: relationshipNomenclature.DOMINIO,
            createdAt: dateToString(relationshipNomenclature.FECHA_ALTA),
            userCreator: relationshipNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipNomenclature.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await relationshipNomenclatureModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params, userCreator) {
        const formattedRelationshipNomenclature = {
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            ID_AUTOFRASE: trim(params.autophraseId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const relationshipNomenclature =
      await relationshipNomenclatureModel.updateOne(
          { ID_NOMENCLADOR: filters.id },
          formattedRelationshipNomenclature
      );
        return {
            nomenclatorId: relationshipNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipNomenclature.ID_NOMENCLATURA,
            autophraseId: relationshipNomenclature.ID_AUTOFRASE,
            approved: relationshipNomenclature.SUPERVISADO,
            observation: relationshipNomenclature.OBSERVACION,
            domain: relationshipNomenclature.DOMINIO,
            createdAt: dateToString(relationshipNomenclature.FECHA_ALTA),
            userCreator: relationshipNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipNomenclature.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_NOMENCLADOR: filters.id };
        const success = await relationshipNomenclatureModel.deleteOne(
            formattedFilters,
            {
                FECHA_BAJA: new Date(),
                ID_USUARIO_BAJA: userDeleted
            }
        );
        return !!success;
    }
}

module.exports = RelationshipNomenclatureService;
