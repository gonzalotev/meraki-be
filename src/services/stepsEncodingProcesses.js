const { stepsEncodingProcesses } = include('models');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const { dateToString, arrayToCsvFormat } = include('util');
const map = require('lodash/map');

class StepsEncodingProcessesService {
    static async fetch() {
        let operatives = await stepsEncodingProcesses.find({FECHA_BAJA: null});
        operatives = operatives.map(operative => ({
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
        await OperativeSourcesService.getSourceData(operatives);
        await QuestionsService.getQuestionData(operatives);
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
            FECHA_ALTA: new Date(),
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null
        };
        const operativeId = await stepsEncodingProcesses.insertOne(formattedOperativeSource, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        console.log(operativeId);
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
            createdAt: dateToString(encodingProcess.FECHA_ALTA),
            userDeleted: encodingProcess.ID_USUARIO_BAJA,
            deletedAt: dateToString(encodingProcess.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedOperativeSource = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ID_PROCESO_CODIFICACION: params.encodingProcessId,
            ORDEN: params.order,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator
        };
        const formattedFilters = {
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId,
            ORDEN: filters.order,
            ID_PROCESO_CODIFICACION: filters.encodingProcessId
        };
        const operativeId = await stepsEncodingProcesses.updateOne(formattedFilters, formattedOperativeSource, ['ID_FUENTE', 'ID_PREGUNTA', 'ORDEN', 'ID_PROCESO_CODIFICACION']);
        console.log(operativeId);
        const operative = await StepsEncodingProcessesService.findOne({sourceId: operativeId.ID_FUENTE,
            questionId: operativeId.ID_PREGUNTA,
            order: operativeId.ORDEN,
            encodingProcessId: operativeId.ID_PROCESO_CODIFICACION});
        return operative;
    }

    static async delete(filters, userDeleted){
        const success = await stepsEncodingProcesses.deleteOne({
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
                    nameInFile: 'ID'
                },
                {
                    nameInTable: 'NOMBRE',
                    nameInFile: 'NOMBRE'
                },
                {
                    nameInTable: 'SIGLA',
                    nameInFile: 'SIGLA'
                },
                {
                    nameInTable: 'ID_TIPO_OPERATIVO',
                    nameInFile: 'TIPO DE OPERATIVO'
                },
                {
                    nameInTable: 'ID_FRECUENCIA',
                    nameInFile: 'FRECUENCIA'
                },
                {
                    nameInTable: 'FECHA_DESDE',
                    nameInFile: 'DESDE'
                },
                {
                    nameInTable: 'FECHA_HASTA',
                    nameInFile: 'HASTA'
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
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                }
            ];

            const operativeSourcesTableHeaders = map(fieldNames, field => field.nameInTable);
            const operativeSourcesFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(operativeSourcesFileHeaders);
            csvString += headers;
            const stream = stepsEncodingProcesses.knex.select(operativeSourcesTableHeaders)
                .from(stepsEncodingProcesses.tableName)
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

module.exports = StepsEncodingProcessesService;
