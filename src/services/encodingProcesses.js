const { encodingProcesses: encodingProcessesModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const replace = require('lodash/replace');

class EncodingProcessService {
    static async fetch() {
        const encodingProcesses = await encodingProcessesModel.find({ FECHA_BAJA: null });
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
            createdAt: dateToString(encodingProcess.FECHA_ALTA),
            userDeleted: encodingProcess.ID_USUARIO_BAJA,
            deletedAt: dateToString(encodingProcess.FECHA_BAJA)
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
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
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
            createdAt: dateToString(encodingProcess.FECHA_ALTA),
            userDeleted: encodingProcess.ID_USUARIO_BAJA,
            deletedAt: dateToString(encodingProcess.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedEncodingProcess = {
            ID_PROCESO_CODIFICACION: trim(params.id),
            DESCRIPCION: trim(params.description),
            AUTOMATICO_SI_NO: params.automatic_yes_no,
            PORCENTAJE_PARA_AUDITAR: replace(params.percentage_to_audit, ',', '.'),
            NIVEL_DE_ERROR_ACEPTABLE: replace(params.acceptable_level_error, ',', '.'),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        const encodingId = await encodingProcessesModel.updateOne({ ID_PROCESO_CODIFICACION: filters.id },
            formattedEncodingProcess, ['ID_PROCESO_CODIFICACION']);
        const encoding = await EncodingProcessService.findOne({ id: encodingId });
        return encoding;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_PROCESO_CODIFICACION: filters.id };
        const success = await encodingProcessesModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = EncodingProcessService;
