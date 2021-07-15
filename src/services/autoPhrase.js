const { autoPhrase: autoPhraseModel } = include('models');
const { dateToString, arrayToCsvFormat } = include('util');
const StaticalVariableService = require('./staticalVariable');
const trim = require('lodash/trim');
const knex = include('helpers/database');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class AutoPhraseService {
    static async fetch(query) {
        let autosPhrases;
        if (query.search) {
            autosPhrases = await knex.select(autoPhraseModel.selectableProps)
                .from(autoPhraseModel.tableName)
                .where('FRASE_FINAL', 'like', `${query.search}%`)
                .orderBy([{ column: 'FRASE_FINAL', order: 'asc' }])
                .timeout(autoPhraseModel.timeout);
        } else if
        (query.page) {
            autosPhrases = await autoPhraseModel.findByPage(
                query.page,
                { FECHA_BAJA: null },
                autoPhraseModel.selectableProps,
                [{ column: 'ID_AUTOFRASE', order: 'asc' }]
            );

        }
        autosPhrases = autosPhrases.map(autoPhrase => ({
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: !!autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateToString(autoPhrase.FECHA_RETROALIMENTACION),
            prhaseRetro: !!autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        }));

        await StaticalVariableService.getVariableData(autosPhrases);

        return autosPhrases;
    }

    static async create(params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: null,
            ID_VARIABLE: trim(params.variableId),
            FRASE_FINAL: trim(params.finalPhrase),
            FECHA_RETROALIMENTACION: dateToString(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const autoPhraseId = await autoPhraseModel.insertOne(formattedAutoPhrase, ['ID_AUTOFRASE']);
        const autoPhrase = await AutoPhraseService.findOne({id: autoPhraseId});
        return autoPhrase;
    }

    static async findOne(filters) {
        const autoPhrase = await autoPhraseModel.findById({
            ID_AUTOFRASE: filters.id
        });
        return {
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: !!autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateToString(autoPhrase.FECHA_RETROALIMENTACION),
            prhaseRetro: !!autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await autoPhraseModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: null,
            ID_VARIABLE: trim(params.variableId),
            FRASE_FINAL: trim(params.finalPhrase),
            FECHA_RETROALIMENTACION: dateToString(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const autoPhraseId = await autoPhraseModel.updateOne({ ID_AUTOFRASE: filters.id },
            formattedAutoPhrase, ['ID_AUTOFRASE']);
        const autoPhrase = await AutoPhraseService.findOne({id: autoPhraseId});
        return autoPhrase;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_AUTOFRASE: filters.id };
        const success = await autoPhraseModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getAutoPhrase(resources) {
        const autophraseIds = compact(uniq(map(resources, resource => resource.autophraseId)));
        if (isEmpty(autophraseIds)) {
            return resources;
        }
        let autoPhrases = await autoPhraseModel.findByValues('ID_AUTOFRASE', autophraseIds, autoPhraseModel.selectableProps, []);
        autoPhrases = map(autoPhrases, autoPhrase => ({
            id: autoPhrase.ID_AUTOFRASE,
            finalPhrase: autoPhrase.FRASE_FINAL
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.autoPhrase = find(
                autoPhrases,
                autoPhrase => autoPhrase.id === resource.autophraseId
            );
            return resource;
        });
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_AUTOFRASE',
                    nameInFile: 'ID DE AUTOFRASE'
                },
                {
                    nameInTable: 'ID_VARIABLE',
                    nameInFile: 'ID DE VARIABLE'
                },
                {
                    nameInTable: 'FRASE_FINAL',
                    nameInFile: 'FRASE FINAL'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
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
                    nameInTable: 'FECHA_RETROALIMENTACION',
                    nameInFile: 'FECHA DE RETROALIMENTACIÓN'
                },
                {
                    nameInTable: 'FRASE_RETROALIMENTADA_SI_NO',
                    nameInFile: 'FRASE_RETROALIMENTADA_SI_NO'
                }
            ];
            const autoPhraseTableHeaders = map(fieldNames, field => field.nameInTable);
            const autoPhraseFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(autoPhraseFileHeaders);
            csvString += headers;
            const stream = autoPhraseModel.knex.select(autoPhraseTableHeaders)
                .from(autoPhraseModel.tableName)
                .orderBy([{column: 'FRASE_FINAL', order: 'asc'}])
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

module.exports = AutoPhraseService;
