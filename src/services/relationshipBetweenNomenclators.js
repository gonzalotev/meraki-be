const { relationshipBetweenNomenclators } = include('models');
const { dateToString } = include('util');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RelationshipBetweenNomenclators {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ID_CORRESPONDENCIA', order: 'asc' }];
        const filterBy = {};
        const columnsToSelect = relationshipBetweenNomenclators.selectableProps;
        let relationships = [];
        if (page && search) {
            relationships = await relationshipBetweenNomenclators.findByMatch(
                page,
                search,
                ['ID_CORRESPONDENCIA'],
                filterBy,
                orderBy
            );
        } else if (page) {
            relationships = await relationshipBetweenNomenclators.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            relationships = await relationshipBetweenNomenclators.find(filterBy, columnsToSelect, orderBy);
        }

        return relationships.map(relationships => ({
            correspondenceId: relationships.ID_CORRESPONDENCIA,
            description: relationships.DESCRIPCION,
            relationTypeId: relationships.ID_TIPO_RELACION,
            domain: relationships.DOMINIO,
            nomenclatorId1: relationships.ID_NOMENCLADOR1,
            digitAmountId1: relationships.ID_CANTIDAD_DIGITOS1,
            nomenclatorId2: relationships.ID_NOMENCLADOR2,
            digitAmountId2: relationships.ID_CANTIDAD_DIGITOS2,
            userCreator: relationships.ID_USUARIO_ALTA,
            createdAt: relationships.FECHA_ALTA,
            observation: relationships.OBSERVACION,
            hasCoefficient: relationships.TIENE_COEFICIENTE,
            isInjective: relationships.ES_INYECTIVA,
            isSurjective: relationships.ES_SOBREYECTIVA
        }));
    }

    static async create(params, userCreator) {
        const formattedRelationship = {
            ID_CORRESPONDENCIA: null,
            DESCRIPCION: params.description,
            ID_TIPO_RELACION: params.relationTypeId,
            DOMINIO: params.domain,
            ID_NOMENCLADOR1: params.nomenclatorId1,
            ID_CANTIDAD_DIGITOS1: params.digitAmountId1,
            ID_NOMENCLADOR2: params.nomenclatorId2,
            ID_CANTIDAD_DIGITOS2: params.digitAmountId2,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            OBSERVACION: params.observation,
            TIENE_COEFICIENTE: params.hasCoefficient,
            ES_INYECTIVA: params.isInjective,
            ES_SOBREYECTIVA: params.isSurjective
        };
        const correspondenceId = await relationshipBetweenNomenclators.insertOne(formattedRelationship, ['ID_CORRESPONDENCIA']);
        const relationship = await RelationshipBetweenNomenclators.findOne({ correspondenceId: correspondenceId });
        return relationship;
    }

    static async findOne(filters) {
        const formattedFilters = { ID_CORRESPONDENCIA: filters.correspondenceId };
        const relationships = await relationshipBetweenNomenclators.findById(formattedFilters);
        return {
            correspondenceId: relationships.ID_CORRESPONDENCIA,
            description: relationships.DESCRIPCION,
            relationTypeId: relationships.ID_TIPO_RELACION,
            domain: relationships.DOMINIO,
            nomenclatorId1: relationships.ID_NOMENCLADOR1,
            digitAmountId1: relationships.ID_CANTIDAD_DIGITOS1,
            nomenclatorId2: relationships.ID_NOMENCLADOR2,
            digitAmountId2: relationships.ID_CANTIDAD_DIGITOS2,
            userCreator: relationships.ID_USUARIO_ALTA,
            createdAt: relationships.FECHA_ALTA,
            observation: relationships.OBSERVACION,
            hasCoefficient: relationships.TIENE_COEFICIENTE,
            isInjective: relationships.ES_INYECTIVA,
            isSurjective: relationships.ES_SOBREYECTIVA
        };
    }

    static async update(filters, params) {
        const formattedRelationship = {
            ID_CORRESPONDENCIA: params.correspondenceId,
            DESCRIPCION: params.description,
            ID_TIPO_RELACION: params.relationTypeId,
            DOMINIO: params.domain,
            ID_NOMENCLADOR1: params.nomenclatorId1,
            ID_CANTIDAD_DIGITOS1: params.digitAmountId1,
            ID_NOMENCLADOR2: params.nomenclatorId2,
            ID_CANTIDAD_DIGITOS2: params.digitAmountId2,
            OBSERVACION: params.observation,
            TIENE_COEFICIENTE: params.hasCoefficient,
            ES_INYECTIVA: params.isInjective,
            ES_SOBREYECTIVA: params.isSurjective
        };
        const correspondenceId = await relationshipBetweenNomenclators.updateOne({ ID_CORRESPONDENCIA: filters.correspondenceId }, formattedRelationship, ['ID_CORRESPONDENCIA']);
        const relationship = await RelationshipBetweenNomenclators.findOne({ correspondenceId: correspondenceId });
        return relationship;
    }

    static async delete(filters) {
        const success = await relationshipBetweenNomenclators.delete({ ID_CORRESPONDENCIA: filters.correspondenceId });
        return !!success;
    }

    static async getTotal({ search }) {
        const { total } = await relationshipBetweenNomenclators.countTotal({}, search, ['ID_CORRESPONDENCIA']);
        return total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipBetweenNomenclators.knex.select(columns)
                .from(relationshipBetweenNomenclators.tableName)
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
                original: 'ID_CORRESPONDENCIA',
                modified: 'ID CORRESPONDENCIA'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCION'
            },
            {
                original: 'ID_TIPO_RELACION',
                modified: 'ID TIPO RELACION'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'ID_NOMENCLADOR1',
                modified: 'ID NOMENCLADOR1'
            },
            {
                original: 'ID_CANTIDAD_DIGITOS1',
                modified: 'ID CANTIDAD DIGITOS 1'
            },
            {
                original: 'ID_NOMENCLADOR2',
                modified: 'ID NOMENCLADOR2'
            },
            {
                original: 'ID_CANTIDAD_DIGITOS2',
                modified: 'ID CANTIDAD DIGITOS 2'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACION'
            },
            {
                original: 'TIENE_COEFICIENTE',
                modified: 'TIENE COEFICIENTE'
            },
            {
                original: 'ES_INYECTIVA',
                modified: 'ES INYECTIVA'
            },
            {
                original: 'ES_SOBREYECTIVA',
                modified: 'ES SOBREYECTIVA'
            }
        ];
    }
}

module.exports = RelationshipBetweenNomenclators;
