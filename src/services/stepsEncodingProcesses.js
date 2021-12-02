const { stepsEncodingProcesses } = include('models');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const EncodingProcessService = require('./encodingProcesses');
const { dateToString } = include('util');
const toNumber = require('lodash/toNumber');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class StepsEncodingProcessesService {
    static async fetch() {
        let operatives = await stepsEncodingProcesses.find();
        operatives = operatives.map(operative => ({
            sourceId: operative.ID_FUENTE,
            questionId: operative.ID_PREGUNTA,
            order: operative.ORDEN,
            encodingProcessId: operative.ID_PROCESO_CODIFICACION,
            observation: operative.OBSERVACION,
            domain: operative.DOMINIO,
            userCreator: operative.ID_USUARIO_ALTA,
            createdAt: dateToString(operative.FECHA_ALTA)
        }));
        await OperativeSourcesService.getSourceData(operatives);
        await QuestionsService.getQuestionData(operatives);
        await EncodingProcessService.getEncodingProcessesData(operatives);
        return operatives;
    }

    static async create(params, userCreator) {
        const formattedOperativeSource = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ID_PROCESO_CODIFICACION: params.encodingProcessId,
            ORDEN: params.order,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const operativeId = await stepsEncodingProcesses.insertOne(formattedOperativeSource, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        const operative = await StepsEncodingProcessesService.findOne(
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
        const encodingProcess = await stepsEncodingProcesses.findById(formattedFilters);
        return {
            sourceId: encodingProcess.ID_FUENTE,
            questionId: encodingProcess.ID_PREGUNTA,
            order: encodingProcess.ORDEN,
            encodingProcessId: encodingProcess.ID_PROCESO_CODIFICACION,
            observation: encodingProcess.OBSERVACION,
            domain: encodingProcess.DOMINIO,
            userCreator: encodingProcess.ID_USUARIO_ALTA,
            createdAt: dateToString(encodingProcess.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedOperativeSource = {
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
        const operativeId = await stepsEncodingProcesses.updateOne(formattedFilters, formattedOperativeSource, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        const operative = await StepsEncodingProcessesService.findOne({sourceId: operativeId.ID_FUENTE,
            questionId: operativeId.ID_PREGUNTA,
            order: operativeId.ORDEN,
            encodingProcessId: operativeId.ID_PROCESO_CODIFICACION});
        return operative;
    }

    static async delete(filters){
        const success = await stepsEncodingProcesses.deleteOne({
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ORDEN: filters.order,
            ID_PROCESO_CODIFICACION: filters.encodingProcessId
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = stepsEncodingProcesses.knex.select(columns)
                .from(stepsEncodingProcesses.tableName)
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
                original: 'ORDEN',
                modified: 'ORDEN'
            },
            {
                original: 'ID_PROCESO_CODIFICACION',
                modified: 'PROCESO DE CODIFICACIÓN'
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

module.exports = StepsEncodingProcessesService;
