const { runEncodingProcesses: runEncodingProcessesModel } = include('models');
const OperativeFontService = require('./operativeFonts');
const OperativesService = require('./operatives');
const LotsService = require('./lots');
const StaticalVariableService = require('./staticalVariable');
const { dateToString } = include('util');
const toNumber = require('lodash/toNumber');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RunEncodingProcessesService {
    static async fetch() {
        let runEncodingProcesses = await runEncodingProcessesModel.find({ SE_CODIFICA_SI_NO: true });
        runEncodingProcesses = runEncodingProcesses.map(encodingProcess => ({
            operativeId: encodingProcess.ID_OPERATIVO,
            lotId: encodingProcess.ID_LOTE,
            variableId: encodingProcess.ID_VARIABLE,
            description: encodingProcess.DESCRIPCION,
            observation: encodingProcess.OBSERVACION,
            domain: encodingProcess.DOMINIO,
            dateStartLinguistic: dateToString(encodingProcess.FECHA_INICIO_LINGUISTICO),
            dateFinLinguistic: dateToString(encodingProcess.FECHA_FIN_LINGUISTICO),
            dateStartPhrasesUniques: dateToString(encodingProcess.FECHA_INICIO_FRASES_UNICAS),
            dateFinPhrasesUniques: dateToString(encodingProcess.FECHA_FIN_FRASES_UNICAS),
            dateStartCodificationAutomatic: dateToString(encodingProcess.FECHA_INICIO_CODIFICACION_AUTOMATICA),
            dateFinCodificationAutomatic: dateToString(encodingProcess.FECHA_FIN_CODIFICACION_AUTOMATICA),
            dateStartCodificationManual: dateToString(encodingProcess.FECHA_INICIO_CODIFICACION_MANUAL),
            dateFinCodificationManual: dateToString(encodingProcess.FECHA_FIN_CODIFICACION_MANUAL),
            dateStartAprovedAutomatic: dateToString(encodingProcess.FECHA_INICIO_SUPERVISADO_AUTOMATICO),
            dateFinAprovedAutomatic: dateToString(encodingProcess.FECHA_FIN_SUPERVISADO_AUTOMATICO),
            dateStartAprovedManual: dateToString(encodingProcess.FECHA_INICIO_SUPERVISADO_MANUAL),
            dateFinAprovedManual: dateToString(encodingProcess.FECHA_FIN_SUPERVISADO_MANUAL),
            totalRecordsAutomatic: encodingProcess.TOTAL_REGISTROS_AUTOMATICO,
            totalRecordsManual: encodingProcess.TOTAL_REGISTROS_MANUAL,
            codingQualityAutomatic: encodingProcess.CALIDAD_CODIFICACION_AUTOMATICA,
            codingQualityManual: encodingProcess.CALIDAD_CODIFICACION_MANUAL,
            lotVariableRejected: encodingProcess.LOTE_VARIABLE_RECHAZADO,
            userCreator: encodingProcess.ID_USUARIO_ALTA,
            createdAt: dateToString(encodingProcess.FECHA_ALTA),
            encodeYesNo: encodingProcess.SE_CODIFICA_SI_NO,
            recordsLinguisticsProcessed: encodingProcess.REGISTROS_LINGUISTICOS_PROCESADOS,
            recordsLinguisticsNulls: encodingProcess.REGISTROS_LINGUISTICOS_NULOS,
            recordsPhrasesUniques: encodingProcess.REGISTROS_FRASES_UNICAS,
            recordsWordsUniques: encodingProcess.REGISTROS_PALABRAS_UNICAS
        }));
        await OperativeFontService.getOperativesData(runEncodingProcesses);
        await StaticalVariableService.getVariableData(runEncodingProcesses);
        await LotsService.getLots(runEncodingProcesses);
        await OperativesService.getOperativesData(runEncodingProcesses);
        return runEncodingProcesses;
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
            FECHA_ALTA: new Date(),
            ID_USUARIO_BAJA: null
        };
        const operativeId = await runEncodingProcessesModel.insertOne(formattedOperativeSource, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        const operative = await RunEncodingProcessesService.findOne(
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
        const encodingProcess = await runEncodingProcessesModel.findById(formattedFilters);
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
        const operativeId = await runEncodingProcessesModel.updateOne(formattedFilters, formattedOperativeSource, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        const operative = await RunEncodingProcessesService.findOne({sourceId: operativeId.ID_FUENTE,
            questionId: operativeId.ID_PREGUNTA,
            order: operativeId.ORDEN,
            encodingProcessId: operativeId.ID_PROCESO_CODIFICACION});
        return operative;
    }

    static async delete(filters){
        const success = await runEncodingProcessesModel.deleteOne({
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ORDEN: filters.order,
            ID_PROCESO_CODIFICACION: filters.encodingProcessId
        }
        );
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = runEncodingProcessesModel.knex.select(columns)
                .from(runEncodingProcessesModel.tableName)
                .where({FECHA_BAJA: null})
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

module.exports = RunEncodingProcessesService;
