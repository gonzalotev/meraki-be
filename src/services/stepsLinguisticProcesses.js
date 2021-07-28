const { stepsLinguisticProcesses } = include('models');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const EncodingProcessService = require('./encodingProcesses');
const { dateToString, arrayToCsvFormat } = include('util');
const map = require('lodash/map');
const toNumber = require('lodash/toNumber');

class StepsLinguisticProcessesService {
    static async fetch() {
        let stepsLinguisticProcessesList = await stepsLinguisticProcesses.find({FECHA_BAJA: null});
        stepsLinguisticProcessesList = stepsLinguisticProcessesList.map(operative => ({
            sourceId: operative.ID_FUENTE,
            questionId: operative.ID_PREGUNTA,
            order: operative.ORDEN,
            encodingProcessId: operative.ID_PROCESO_CODIFICACION,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            userCreator: operative.ID_USUARIO_ALTA,
            createdAt: dateToString(operative.FECHA_ALTA),
            userDeleted: operative.ID_USUARIO_BAJA,
            deletedAt: dateToString(operative.FECHA_BAJA)
        }));
        await OperativeSourcesService.getSourceData(stepsLinguisticProcessesList);
        await QuestionsService.getQuestionData(stepsLinguisticProcessesList);
        await EncodingProcessService.getEncodingProcessesData(stepsLinguisticProcessesList);
        return stepsLinguisticProcessesList;
    }

    static async create(params, userCreator) {
        const formattedStepLinguisticProcess = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ID_PROCESO_CODIFICACION: params.encodingProcessId,
            ORDEN: params.order,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null
        };
        const operativeId = await stepsLinguisticProcesses.insertOne(formattedStepLinguisticProcess, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        console.log(operativeId);
        const operative = await StepsLinguisticProcessesService.findOne(
            {sourceId: operativeId.ID_FUENTE,
                questionId: operativeId.ID_PREGUNTA,
                order: operativeId.ORDEN,
                encodingProcessId: operativeId.ID_PROCESO_CODIFICACION});
        return operative;
    }

    static async findOne(filters){
        const formattedFilters = {
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ORDEN: filters.order,
            ID_PROCESO_CODIFICACION: filters.encodingProcessId
        };
        const stepLinguisticProcess = await stepsLinguisticProcesses.findById(formattedFilters);
        return {
            sourceId: stepLinguisticProcess.ID_FUENTE,
            questionId: stepLinguisticProcess.ID_PREGUNTA,
            order: stepLinguisticProcess.ORDEN,
            encodingProcessId: stepLinguisticProcess.ID_PROCESO_CODIFICACION,
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
            ID_PROCESO_CODIFICACION: params.encodingProcessId,
            ORDEN: toNumber(params.order),
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator
        };
        const formattedFilters = {
            ID_FUENTE: toNumber(filters.sourceId),
            ID_PREGUNTA: toNumber(filters.questionId),
            ORDEN: toNumber(filters.order),
            ID_PROCESO_CODIFICACION: filters.encodingProcessId
        };
        const stepLinguisticProcessId = await stepsLinguisticProcesses.updateOne(formattedFilters, formattedStepLinguisticProcess, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        const stepLinguisticProcess =
        await StepsLinguisticProcessesService.findOne({sourceId: stepLinguisticProcessId.ID_FUENTE,
            questionId: stepLinguisticProcessId.ID_PREGUNTA,
            order: stepLinguisticProcessId.ORDEN,
            encodingProcessId: stepLinguisticProcessId.ID_PROCESO_CODIFICACION});
        return stepLinguisticProcess;
    }

    static async delete(filters, userDeleted){
        const success = await stepsLinguisticProcesses.deleteOne({
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ORDEN: filters.order,
            ID_PROCESO_CODIFICACION: filters.encodingProcessId
        },
        {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_FUENTE',
                    nameInFile: 'FUENTE'
                },
                {
                    nameInTable: 'ID_PREGUNTA',
                    nameInFile: 'PREGUNTA'
                },
                {
                    nameInTable: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                    nameInFile: 'TIPOLOGIA DE DICCIONARIO'
                },
                {
                    nameInTable: 'ORDEN',
                    nameInFile: 'ORDEN'
                },
                {
                    nameInTable: 'ID_NOMBRE_CAMPO_LINGUISTICO',
                    nameInFile: 'NOMBRE CAMPO LINGUISTICO'
                },
                {
                    nameInTable: 'SE_MUESTRA_EN_PANTALLA',
                    nameInFile: 'SE MUESTRA EN PANTALLA'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACION'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                }
            ];

            const stepsLinguiticProcessesTableHeaders = map(fieldNames, field => field.nameInTable);
            const stepsLinguisticProcessesFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(stepsLinguisticProcessesFileHeaders);
            csvString += headers;
            const stream = stepsLinguisticProcesses.knex.select(stepsLinguiticProcessesTableHeaders)
                .from(stepsLinguisticProcesses.tableName)
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

module.exports = StepsLinguisticProcessesService;
