const { StepsEncodingProcesses } = include('models');
const { dateToString, arrayToCsvFormat, stringToDate } = include('util');
const map = require('lodash/map');

class StepsEncodingProcessesService {
    static async fetch() {
        const operatives = await StepsEncodingProcesses.find({FECHA_BAJA: null});
        return operatives.map(operative => ({
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
    }

    static async create(params, userCreator) {
        console.log(params);
        const formattedOperativeSource = {
            ID_FUENTE: params.sourceId,
            NOMBRE: params.name,
            SIGLA: params.initial,
            ID_TIPO_OPERATIVO: params.operativeTypeId,
            ID_FRECUENCIA: params.frequencyId,
            ID_SOPORTE: params.supportId,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        const operativeId = await StepsEncodingProcesses.insertOne(formattedOperativeSource, ['ID_FUENTE']);
        console.log(operativeId);
        const operative = await StepsEncodingProcessesService.findOne({sourceId: operativeId});
        return operative;
    }

    static async findOne(filters){
        const formattedFilters = {ID_FUENTE: filters.sourceId};
        const encodingProcess = await StepsEncodingProcesses.findById(formattedFilters);
        console.log(encodingProcess);
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
            NOMBRE: params.name,
            SIGLA: params.initial,
            ID_TIPO_OPERATIVO: params.operativeTypeId,
            ID_FRECUENCIA: params.frequencyId,
            ID_SOPORTE: params.supportId,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        const formattedFilters = {ID_FUENTE: filters.sourceId};
        const operativeSourceId = await StepsEncodingProcesses.updateOne(formattedFilters, formattedOperativeSource, ['ID_FUENTE']);
        console.log(operativeSourceId);
        const operative = await StepsEncodingProcessesService.findOne({sourceId: operativeSourceId});
        return operative;
    }

    static async delete(filters, userDeleted){
        const success = await StepsEncodingProcesses.deleteOne({ID_FUENTE: filters.sourceId}, {
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
            const stream = StepsEncodingProcesses.knex.select(operativeSourcesTableHeaders)
                .from(StepsEncodingProcesses.tableName)
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
