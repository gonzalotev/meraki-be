const { autoPhrase: autoPhraseModel } = include('models');
const { dateToString, stringToDate, dateTimeToStrings } = include('util');
const StaticalVariableService = require('./staticalVariable');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const toUpper = require('lodash/toUpper');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class AutoPhraseService {
    static async fetch({ page, search }) {
        let autosPhrases = [];
        if (page && search) {
            autosPhrases = await autoPhraseModel.fetchByPageAndTerm(page, search, { FECHA_BAJA: null });
        } else if (page) {
            autosPhrases = await autoPhraseModel.findByPage(page, { FECHA_BAJA: null });
        } else {
            autosPhrases = await autoPhraseModel.find({ FECHA_BAJA: null });
        }

        autosPhrases = autosPhrases.map(autoPhrase => ({
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: !!autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateToString(autoPhrase.FECHA_RETROALIMENTACION),
            dependId: autoPhrase.ID_DEPENDE_ID_AUTOFRASE,
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
            FRASE_FINAL: toUpper(trim(params.finalPhrase)),
            FECHA_RETROALIMENTACION: stringToDate(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_DEPENDE_ID_AUTOFRASE: params.dependId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const autoPhraseId = await autoPhraseModel.insertOne(formattedAutoPhrase, ['ID_AUTOFRASE']);
        const autoPhrase = await AutoPhraseService.findOne({ id: autoPhraseId });
        return autoPhrase;
    }

    static async findOne(filters) {
        let autoPhrase = await autoPhraseModel.findById({
            ID_AUTOFRASE: filters.id
        });
        autoPhrase = {
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: !!autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateTimeToStrings(autoPhrase.FECHA_RETROALIMENTACION),
            prhaseRetro: !!autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            dependId: autoPhrase.ID_DEPENDE_ID_AUTOFRASE,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        };

        await StaticalVariableService.getVariableData([autoPhrase]);
        return autoPhrase;

    }
    static async getTotal({ search }) {
        const { total } = await autoPhraseModel.countTotal({ FECHA_BAJA: null }, search, ['FRASE_FINAL']);
        return total;
    }

    static async update(filters, params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: params.id,
            ID_VARIABLE: trim(params.variableId),
            FRASE_FINAL: trim(params.finalPhrase),
            FECHA_RETROALIMENTACION: stringToDate(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_DEPENDE_ID_AUTOFRASE: params.dependId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const autoPhraseId = await autoPhraseModel.updateOne({ ID_AUTOFRASE: filters.id },
            formattedAutoPhrase, ['ID_AUTOFRASE']);
        const autoPhrase = await AutoPhraseService.findOne({ id: autoPhraseId });
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

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = autoPhraseModel.knex.select(columns)
                .from(autoPhraseModel.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
            });
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_AUTOFRASE',
                modified: 'id'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'variableId'
            },
            {
                original: 'FRASE_FINAL',
                modified: 'finalPhrase'
            },
            {
                original: 'OBSERVACION',
                modified: 'observation'
            },
            {
                original: 'DOMINIO',
                modified: 'domain'
            },
            {
                original: 'ID_DEPENDE_ID_AUTOFRASE',
                modified: 'dependId'
            },
            {
                original: 'SUPERVISADO',
                modified: 'approved'
            }
        ];
    }
}

module.exports = AutoPhraseService;
