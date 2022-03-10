const { stepsLinguisticProcesses } = include('models');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const DictionaryTypeService = require('./dictionaryType');
const { dateToString } = include('util');
const toNumber = require('lodash/toNumber');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class StepsLinguisticProcessesService {
    static async fetch() {
        let stepsLinguisticProcessesList = await stepsLinguisticProcesses.find();
        stepsLinguisticProcessesList = stepsLinguisticProcessesList.map(operative => ({
            sourceId: operative.ID_FUENTE,
            questionId: operative.ID_PREGUNTA,
            dictionaryTypologyId: operative.ID_TIPOLOGIA_DE_DICCIONARIO,
            order: operative.ORDEN,
            linguisticFieldNameId: operative.ID_NOMBRE_CAMPO_LINGUISTICO,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            userCreator: operative.ID_USUARIO_ALTA,
            createdAt: dateToString(operative.FECHA_ALTA)
        }));
        await OperativeSourcesService.getSourceData(stepsLinguisticProcessesList);
        await QuestionsService.getQuestionData(stepsLinguisticProcessesList);
        await DictionaryTypeService.getDictionaryTypeData(stepsLinguisticProcessesList);
        return stepsLinguisticProcessesList;
    }

    static async create(params, userCreator) {
        const formattedStepLinguisticProcess = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ID_TIPOLOGIA_DE_DICCIONARIO: params.dictionaryTypologyId,
            ORDEN: params.order,
            ID_NOMBRE_CAMPO_LINGUISTICO: params.linguisticFieldNameId,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const operativeId = await stepsLinguisticProcesses.insertOne(formattedStepLinguisticProcess, ['ID_FUENTE', 'ID_PREGUNTA', 'ID_TIPOLOGIA_DE_DICCIONARIO', 'ORDEN']);
        const operative = await StepsLinguisticProcessesService.findOne(
            {sourceId: operativeId.ID_FUENTE,
                questionId: operativeId.ID_PREGUNTA,
                dictionaryTypologyId: operativeId.ID_TIPOLOGIA_DE_DICCIONARIO,
                order: operativeId.ORDEN
            });
        return operative;
    }

    static async findOne(filters){
        const formattedFilters = {
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypologyId,
            ORDEN: filters.order
        };
        const stepLinguisticProcess = await stepsLinguisticProcesses.findById(formattedFilters);
        return {
            sourceId: stepLinguisticProcess.ID_FUENTE,
            questionId: stepLinguisticProcess.ID_PREGUNTA,
            dictionaryTypologyId: stepLinguisticProcess.ID_TIPOLOGIA_DE_DICCIONARIO,
            order: stepLinguisticProcess.ORDEN,
            linguisticFieldNameId: stepLinguisticProcess.ID_NOMBRE_CAMPO_LINGUISTICO,
            observation: stepLinguisticProcess.OBSERVACION,
            domain: stepLinguisticProcess.DOMINIO,
            userCreator: stepLinguisticProcess.ID_USUARIO_ALTA,
            createdAt: dateToString(stepLinguisticProcess.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedStepLinguisticProcess = {
            ID_FUENTE: toNumber(params.sourceId),
            ID_PREGUNTA: toNumber(params.questionId),
            ID_TIPOLOGIA_DE_DICCIONARIO: params.dictionaryTypologyId,
            ORDEN: toNumber(params.order),
            ID_NOMBRE_CAMPO_LINGUISTICO: params.linguisticFieldNameId,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator
        };
        const formattedFilters = {
            ID_FUENTE: toNumber(filters.sourceId),
            ID_PREGUNTA: toNumber(filters.questionId),
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypologyId,
            ORDEN: toNumber(filters.order)
        };
        const stepLinguisticProcessId = await stepsLinguisticProcesses.updateOne(formattedFilters, formattedStepLinguisticProcess, ['ID_FUENTE', 'ID_PREGUNTA', 'ID_TIPOLOGIA_DE_DICCIONARIO', 'ORDEN']);
        const stepLinguisticProcess =
        await StepsLinguisticProcessesService.findOne({
            sourceId: stepLinguisticProcessId.ID_FUENTE,
            questionId: stepLinguisticProcessId.ID_PREGUNTA,
            dictionaryTypologyId: stepLinguisticProcessId.ID_TIPOLOGIA_DE_DICCIONARIO,
            order: stepLinguisticProcessId.ORDEN
        });
        return stepLinguisticProcess;
    }

    static async delete(filters){
        const success = await stepsLinguisticProcesses.delete({
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypologyId,
            ORDEN: filters.order
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = stepsLinguisticProcesses.knex.select(columns)
                .from(stepsLinguisticProcesses.tableName)
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
                original: 'ID_FUENTE',
                modified: 'FUENTE ID'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA ID'
            },
            {
                original: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                modified: 'TIPOLOGÍA DE DICCIONARIO'
            },
            {
                original: 'ORDEN',
                modified: 'ORDEN'
            },
            {
                original: 'ID_NOMBRE_CAMPO_LINGUISTICO',
                modified: 'NOMBRE CAMPO LINGÜISTICO ID'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            }
        ];
    }
}

module.exports = StepsLinguisticProcessesService;
