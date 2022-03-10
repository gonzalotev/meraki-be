const { encodingProcesses: encodingProcessesModel } = include('models');
const { dateToString, stringToDate } = include('util');
const knex = include('helpers/database');
const trim = require('lodash/trim');
const replace = require('lodash/replace');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const uniq = require('lodash/uniq');
const find = require('lodash/find');

class EncodingProcessService {
    static async fetch(query) {
        if (query.sourceId && query.questionId) {
            const encodingProcesses = await knex('PROCESOS_DE_CODIFICACION')
                .whereNotExists(function() {
                    this.select('*')
                        .from('PASOS_PROCESOS_CODIFICACION')
                        .whereRaw('PASOS_PROCESOS_CODIFICACION.ID_PROCESO_CODIFICACION = PROCESOS_DE_CODIFICACION.ID_PROCESO_CODIFICACION')
                        .andWhere('ID_FUENTE', query.sourceId)
                        .andWhere('ID_PREGUNTA', query.questionId);
                })
                .andWhere('AUTOMATICO_SI_NO', true)
                .orderBy('DESCRIPCION');
            return encodingProcesses.map(encodingProcess => ({
                id: encodingProcess.ID_PROCESO_CODIFICACION,
                description: encodingProcess.DESCRIPCION,
                automatic_yes_no: encodingProcess.AUTOMATICO_SI_NO,
                percentage_to_audit: encodingProcess.PORCENTAJE_PARA_AUDITAR,
                acceptable_level_error: encodingProcess.NIVEL_DE_ERROR_ACEPTABLE,
                domain: encodingProcess.DOMINIO,
                observation: encodingProcess.OBSERVACION,
                approved: encodingProcess.SUPERVISADO,
                userCreator: encodingProcess.ID_USUARIO_ALTA,
                createdAt: dateToString(encodingProcess.FECHA_ALTA)
            }));
        }
        const encodingProcesses = await encodingProcessesModel.find();
        return encodingProcesses.map(encodingProcess => ({
            id: encodingProcess.ID_PROCESO_CODIFICACION,
            description: encodingProcess.DESCRIPCION,
            automatic_yes_no: encodingProcess.AUTOMATICO_SI_NO,
            percentage_to_audit: encodingProcess.PORCENTAJE_PARA_AUDITAR,
            acceptable_level_error: encodingProcess.NIVEL_DE_ERROR_ACEPTABLE,
            domain: encodingProcess.DOMINIO,
            observation: encodingProcess.OBSERVACION,
            approved: encodingProcess.SUPERVISADO,
            userCreator: encodingProcess.ID_USUARIO_ALTA,
            createdAt: dateToString(encodingProcess.FECHA_ALTA)
        }));
    }

    static async create(params, userCreator) {
        const formattedEncodingProcess = {
            ID_PROCESO_CODIFICACION: trim(params.id),
            DESCRIPCION: trim(params.description),
            AUTOMATICO_SI_NO: params.automatic_yes_no,
            PORCENTAJE_PARA_AUDITAR: replace(params.percentage_to_audit, ',', '.'),
            NIVEL_DE_ERROR_ACEPTABLE: replace(params.acceptable_level_error, ',', '.'),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };

        const encodingId = await encodingProcessesModel.insertOne(formattedEncodingProcess, ['ID_PROCESO_CODIFICACION']);
        const encoding = await EncodingProcessService.findOne({ id: encodingId });
        return encoding;
    }

    static async findOne(filters) {
        const encodingProcess = await encodingProcessesModel.findById({ ID_PROCESO_CODIFICACION: filters.id });
        return {
            id: encodingProcess.ID_PROCESO_CODIFICACION,
            description: encodingProcess.DESCRIPCION,
            automatic_yes_no: encodingProcess.AUTOMATICO_SI_NO,
            percentage_to_audit: encodingProcess.PORCENTAJE_PARA_AUDITAR,
            acceptable_level_error: encodingProcess.NIVEL_DE_ERROR_ACEPTABLE,
            domain: encodingProcess.DOMINIO,
            observation: encodingProcess.OBSERVACION,
            approved: !!encodingProcess.SUPERVISADO,
            userCreator: encodingProcess.ID_USUARIO_ALTA,
            createdAt: dateToString(encodingProcess.FECHA_ALTA)
        };
    }

    static async update(filters, params, userCreator) {
        const formattedEncodingProcess = {
            ID_PROCESO_CODIFICACION: trim(params.id),
            DESCRIPCION: trim(params.description),
            AUTOMATICO_SI_NO: params.automatic_yes_no,
            PORCENTAJE_PARA_AUDITAR: replace(params.percentage_to_audit, ',', '.'),
            NIVEL_DE_ERROR_ACEPTABLE: replace(params.acceptable_level_error, ',', '.'),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const encodingId = await encodingProcessesModel.updateOne({ ID_PROCESO_CODIFICACION: filters.id },
            formattedEncodingProcess, ['ID_PROCESO_CODIFICACION']);
        const encoding = await EncodingProcessService.findOne({ id: encodingId });
        return encoding;
    }

    static async delete(filters) {
        const formattedFilters = { ID_PROCESO_CODIFICACION: filters.id };
        const success = await encodingProcessesModel.delete(formattedFilters);
        return !!success;
    }

    static async getEncodingProcessesData(resources){
        const encodingProcessIds = uniq(map(resources, resource => resource.encodingProcessId));
        let encodingProcesses = await encodingProcessesModel.knex.select()
            .from(encodingProcessesModel.tableName)
            .whereIn('ID_PROCESO_CODIFICACION', encodingProcessIds);
        encodingProcesses = map(encodingProcesses, encodingProcess => ({
            id: encodingProcess.ID_PROCESO_CODIFICACION,
            name: encodingProcess.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.encodingProcess =
            find(encodingProcesses, source => source.id === resource.encodingProcessId);
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = encodingProcessesModel.knex.select(columns)
                .from(encodingProcessesModel.tableName)
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
                original: 'ID_PROCESO_CODIFICACION',
                modified: 'PROCESO CODIFICACION ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'AUTOMATICO_SI_NO',
                modified: 'AUTOMÁTICO SI/NO'
            },
            {
                original: 'PORCENTAJE_PARA_AUDITAR',
                modified: 'PORCENTAJE DE MUESTA A AUDITAR'
            },
            {
                original: 'NIVEL_DE_ERROR_ACEPTABLE',
                modified: 'PORCENTAJE NIVEL DE ERROR DE LA MUESTRA'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = EncodingProcessService;
