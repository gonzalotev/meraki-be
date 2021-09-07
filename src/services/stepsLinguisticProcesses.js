const { stepsLinguisticProcesses } = include('models');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const DictionaryTypeService = require('./dictionaryType');
const { dateToString } = include('util');
const toNumber = require('lodash/toNumber');

class StepsLinguisticProcessesService {
    static async fetch() {
        let stepsLinguisticProcessesList = await stepsLinguisticProcesses.find({FECHA_BAJA: null});
        stepsLinguisticProcessesList = stepsLinguisticProcessesList.map(operative => ({
            sourceId: operative.ID_FUENTE,
            questionId: operative.ID_PREGUNTA,
            dictionaryTypologyId: operative.ID_TIPOLOGIA_DE_DICCIONARIO,
            order: operative.ORDEN,
            linguisticFieldNameId: operative.ID_NOMBRE_CAMPO_LINGUISTICO,
            showOnScreen: !!operative.SE_MUESTRA_EN_PANTALLA,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            userCreator: operative.ID_USUARIO_ALTA,
            createdAt: dateToString(operative.FECHA_ALTA),
            userDeleted: operative.ID_USUARIO_BAJA,
            deletedAt: dateToString(operative.FECHA_BAJA)
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
            SE_MUESTRA_EN_PANTALLA: params.showOnScreen,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null
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
            showOnScreen: !!stepLinguisticProcess.SE_MUESTRA_EN_PANTALLA,
            observation: stepLinguisticProcess.OBSERVACION,
            domain: stepLinguisticProcess.DOMINIO,
            userCreator: stepLinguisticProcess.ID_USUARIO_ALTA,
            createdAt: dateToString(stepLinguisticProcess.FECHA_ALTA),
            userDeleted: stepLinguisticProcess.ID_USUARIO_BAJA,
            deletedAt: dateToString(stepLinguisticProcess.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedStepLinguisticProcess = {
            ID_FUENTE: toNumber(params.sourceId),
            ID_PREGUNTA: toNumber(params.questionId),
            ID_TIPOLOGIA_DE_DICCIONARIO: params.dictionaryTypologyId,
            ORDEN: toNumber(params.order),
            ID_NOMBRE_CAMPO_LINGUISTICO: params.linguisticFieldNameId,
            SE_MUESTRA_EN_PANTALLA: params.showOnScreen,
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

    static async delete(filters, userDeleted){
        const success = await stepsLinguisticProcesses.deleteOne({
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypologyId,
            ORDEN: filters.order
        },
        {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = stepsLinguisticProcesses.knex.select(columns)
                .from(stepsLinguisticProcesses.tableName)
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
                original: 'ID_FUENTE',
                modified: 'FUENTE'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA'
            },
            {
                original: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                modified: 'TIPOLOGIA DE DICCIONARIO'
            },
            {
                original: 'ORDEN',
                modified: 'ORDEN'
            },
            {
                original: 'ID_NOMBRE_CAMPO_LINGUISTICO',
                modified: 'NOMBRE CAMPO LINGUISTICO'
            },
            {
                original: 'SE_MUESTRA_EN_PANTALLA',
                modified: 'SE MUESTRA EN PANTALLA'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACION'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            }
        ];
    }
}

module.exports = StepsLinguisticProcessesService;
