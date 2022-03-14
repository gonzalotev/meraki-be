const { autoPhrase: autoPhraseModel } = include('models');
const { dateToString, stringToDate, dateTimeToStrings } = include('util');
const StaticalVariableService = require('./staticalVariable');
const NomenclatorService = require('./nomenclators');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const find = require('lodash/find');
const toUpper = require('lodash/toUpper');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class AutoPhraseService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ID_AUTOFRASE', order: 'asc' }];
        const filterBy = {};
        const columnsToSelect = autoPhraseModel.selectableProps;
        let autosPhrases = [];
        if (page && search) {
            autosPhrases = await autoPhraseModel.fetchByPageAndTerm(page, search);
        } else if (page) {
            autosPhrases = await autoPhraseModel.findByPage(page, filterBy, columnsToSelect, orderBy);
        } else {
            autosPhrases = await autoPhraseModel.find();
        }

        autosPhrases = autosPhrases.map(autoPhrase => ({
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_ORIGINAL,
            approved: !!autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateToString(autoPhrase.FECHA_RETROALIMENTACION),
            dependId: autoPhrase.ID_DEPENDE_ID_AUTOFRASE,
            prhaseRetro: !!autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            specialOrGeneralPhrase: !!autoPhrase.FRASE_ESPECIAL_O_GENERAL,
            orden: autoPhrase.ORDEN,
            nomenclatorId: autoPhrase.ID_NOMENCLADOR,
            numberOfNomenclatures: autoPhrase.CANTIDAD_DE_NOMENCLATURAS,
            numberOfAgrupations: autoPhrase.CANTIDAD_DE_AGRUPACIONES
        }));

        await StaticalVariableService.getVariableData(autosPhrases);
        await NomenclatorService.getNomenclatorData(autosPhrases);

        return autosPhrases;
    }

    static async create(params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: null,
            ID_VARIABLE: trim(params.variableId),
            FRASE_ORIGINAL: toUpper(trim(params.finalPhrase)),
            FECHA_RETROALIMENTACION: stringToDate(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_DEPENDE_ID_AUTOFRASE: params.dependId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            FRASE_ESPECIAL_O_GENERAL: params.specialOrGeneralPhrase,
            ORDEN: params.orden,
            ID_NOMENCLADOR: params.nomenclatorId,
            CANTIDAD_DE_NOMENCLATURAS: params.numberOfNomenclatures,
            CANTIDAD_DE_AGRUPACIONES: params.numberOfAgrupations
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
            finalPhrase: autoPhrase.FRASE_ORIGINAL,
            approved: !!autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateTimeToStrings(autoPhrase.FECHA_RETROALIMENTACION),
            prhaseRetro: !!autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            dependId: autoPhrase.ID_DEPENDE_ID_AUTOFRASE,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            specialOrGeneralPhrase: !!autoPhrase.FRASE_ESPECIAL_O_GENERAL,
            orden: autoPhrase.ORDEN,
            nomenclatorId: autoPhrase.ID_NOMENCLADOR,
            numberOfNomenclatures: autoPhrase.CANTIDAD_DE_NOMENCLATURAS,
            numberOfAgrupations: autoPhrase.CANTIDAD_DE_AGRUPACIONES
        };

        await StaticalVariableService.getVariableData([autoPhrase]);
        return autoPhrase;

    }
    static async getTotal({ search }) {
        const { total } = await autoPhraseModel.countTotal({}, search, ['FRASE_ORIGINAL']);
        return total;
    }

    static async update(filters, params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: params.id,
            ID_VARIABLE: trim(params.variableId),
            FRASE_ORIGINAL: trim(params.finalPhrase),
            FECHA_RETROALIMENTACION: stringToDate(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_DEPENDE_ID_AUTOFRASE: params.dependId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            FRASE_ESPECIAL_O_GENERAL: params.specialOrGeneralPhrase,
            ORDEN: params.orden,
            ID_NOMENCLADOR: params.nomenclatorId,
            CANTIDAD_DE_NOMENCLATURAS: params.numberOfNomenclatures,
            CANTIDAD_DE_AGRUPACIONES: params.numberOfAgrupations
        };
        const autoPhraseId = await autoPhraseModel.updateOne({ ID_AUTOFRASE: filters.id },
            formattedAutoPhrase, ['ID_AUTOFRASE']);
        const autoPhrase = await AutoPhraseService.findOne({ id: autoPhraseId });
        return autoPhrase;
    }

    static async delete(filters) {
        const formattedFilters = { ID_AUTOFRASE: filters.id };
        const success = await autoPhraseModel.delete(formattedFilters, {
        });
        return !!success;
    }

    static async getAutoPhrase(resources) {
        const autophraseIds = compact(uniq(map(resources, resource => resource.id)));
        if (isEmpty(autophraseIds)) {
            return resources;
        }
        let autoPhrases = await autoPhraseModel.findByValues('ID_AUTOFRASE', autophraseIds, autoPhraseModel.selectableProps, []);
        autoPhrases = map(autoPhrases, autoPhrase => ({
            id: autoPhrase.ID_AUTOFRASE,
            finalPhrase: autoPhrase.FRASE_ORIGINAL
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.autoPhrase = find(
                autoPhrases,
                autoPhrase => autoPhrase.autophraseId === resource.id
            );
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = autoPhraseModel.knex.select(columns)
                .from(autoPhraseModel.tableName)
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
                original: 'ID_AUTOFRASE',
                modified: 'AUTOFRASE ID'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'VARIABLE ID'
            },
            {
                original: 'FRASE_ORIGINAL',
                modified: 'FRASE ORIGINAL'
            },
            {
                original: 'ID_DEPENDE_ID_AUTOFRASE',
                modified: 'AUTOFRASE DEPENDE DE'
            },
            {
                original: 'FRASE_ESPECIAL_O_GENERAL',
                modified: 'ES ESPECIAL O GENERAL'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR'
            },
            {
                original: 'CANTIDAD_DE_NOMENCLATURAS',
                modified: 'CANTIDAD DE NOMENCLATURAS'
            },
            {
                original: 'CANTIDAD_DE_AGRUPACIONES',
                modified: 'CANTIDAD DE AGRUPACIONES'
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
                original: 'FECHA_RETROALIMENTACION',
                modified: 'FECHA RETROALIMENTACIÓN'
            },
            {
                original: 'FRASE_RETROALIMENTADA_SI_NO',
                modified: 'FRASE RETROALIMENTADA SI/NO'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = AutoPhraseService;
