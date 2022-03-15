const OperativesService = require('./operatives');
const StaticalVariableService = require('./staticalVariable');
const knex = include('helpers/database');
const { lots } = include('models');
const { lotsAttrib } = include('constants/staticData');
const { dateToString, dateTimeToString, dateString, stringDate } = include('util');
const toNumber = require('lodash/toNumber');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');
const has = require('lodash/has');
const head = require('lodash/head');
const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
const dateFormat = 'YYYY-MM-DD';

class LotsService {
    static async fetchStaticLots() {
        const lotss = await lots.findAll(lotsAttrib);
        return lotss.map(lot => LotsService.rebaseFormat(lot));
    }

    static async getLotsVariables(lotId){
        let lotsVariables = await lots.knex
            .select()
            .from('LOTES_VARIABLES')
            .where({ID_LOTE: lotId});

        lotsVariables = map(lotsVariables, lotVariable => ({
            operativeId: lotVariable.ID_OPERATIVO,
            lotId: lotVariable.ID_LOTE,
            variableId: lotVariable.ID_VARIABLE,
            description: lotVariable.DESCRIPCION,
            observation: lotVariable.OBSERVACION,
            domain: lotVariable.DOMINIO,
            linguisticStartDate: dateTimeToString(lotVariable.FECHA_INICIO_LINGUISTICO),
            linguisticEndDate: dateTimeToString(lotVariable.FECHA_FIN_LINGUISTICO),
            uniquePhrasesStartDate: dateTimeToString(lotVariable.FECHA_INICIO_FRASES_UNICAS),
            uniquePhrasesEndDate: dateTimeToString(lotVariable.FECHA_FIN_FRASES_UNICAS),
            automaticCodingStartDate: dateTimeToString(lotVariable.FECHA_INICIO_CODIFICACION_AUTOMATICA),
            automaticCodingEndDate: dateTimeToString(lotVariable.FECHA_FIN_CODIFICACION_AUTOMATICA),
            manualCodingStartDate: dateTimeToString(lotVariable.FECHA_INICIO_CODIFICACION_MANUAL),
            manualCodingEndDate: dateTimeToString(lotVariable.FECHA_FIN_CODIFICACION_MANUAL),
            automaticSupervisionStartDate: dateTimeToString(lotVariable.FECHA_INICIO_SUPERVISADO_AUTOMATICO),
            automaticSupervisionEndDate: dateTimeToString(lotVariable.FECHA_FIN_SUPERVISADO_AUTOMATICO),
            manualSupervisionStartDate: dateTimeToString(lotVariable.FECHA_INICIO_SUPERVISADO_MANUAL),
            manualSupervisionEndDate: dateTimeToString(lotVariable.FECHA_FIN_SUPERVISADO_MANUAL),
            totalAutomaticRecords: lotVariable.TOTAL_REGISTROS_AUTOMATICO,
            totalManualRecords: lotVariable.TOTAL_REGISTROS_MANUAL,
            automaticCodingQuality: lotVariable.CALIDAD_CODIFICACION_AUTOMATICA,
            manualCodingQuality: lotVariable.CALIDAD_CODIFICACION_MANUAL,
            rejectedLotVariable: lotVariable.LOTE_VARIABLE_RECHAZADO,
            userId: lotVariable.ID_USUARIO_ALTA,
            createdAt: dateToString(lotVariable.FECHA_ALTA),
            shouldBeEncode: lotVariable.SE_CODIFICA_SI_NO,
            linguisticRecordsProcessed: lotVariable.REGISTROS_LINGUISTICOS_PROCESADOS,
            nullLinguisticRecords: lotVariable.REGISTROS_LINGUISTICOS_NULOS,
            uniquePhrasesRecords: lotVariable.REGISTROS_FRASES_UNICAS,
            uniqueWordsRecords: lotVariable.REGISTROS_PALABRAS_UNICAS,
            standardizationStartDate: dateTimeToString(lotVariable.FECHA_INICIO_NORMALIZADO),
            standardizationEndDate: dateTimeToString(lotVariable.FECHA_FIN_NORMALIZADO),
            correctorStartDate: dateTimeToString(lotVariable.FECHA_INICIO_CORRECTOR),
            correctorEndDate: dateTimeToString(lotVariable.FECHA_FIN_CORRECTOR),
            totalStandardizationRecords: lotVariable.TOTAL_REGISTROS_NORMALIZADOS,
            totalCorrectorRecords: lotVariable.TOTAL_REGISTROS_CORREGIDOS,
            standardizationTotalTime: lotVariable.TIEMPO_TOTAL_NORMALIZADO,
            correctorTotalTime: lotVariable.TIEMPO_TOTAL_CORRECTOR,
            linguisticTotalTime: lotVariable.TIEMPO_TOTAL_LINGUISTICO,
            times: JSON.parse(lotVariable.TIEMPOS)
        }));

        await StaticalVariableService.getVariableData(lotsVariables);

        return lotsVariables;
    }

    static async getTotalAccumulatedLinguisticTime(lotId) {
        /* eslint-disable */ 
        const result = await knex.raw(`
            SELECT 
                TO_CHAR(TRUNC(segundos/3600),'FM9900') || 'hs:' ||
                TO_CHAR(TRUNC(MOD(segundos,3600)/60),'FM00') || 'min:' ||
                TO_CHAR(MOD(segundos,60),'FM00') || 'seg' suma_total_linguistico
            FROM (
                select horas*3600+minutos*60+segundos segundos
                from (
                    select
                        COALESCE(SUM(REGEXP_SUBSTR(REGEXP_SUBSTR(tiempo_total_linguistico, '\\d+hs'), '\\d+')), 0) horas,
                        COALESCE(SUM(REGEXP_SUBSTR(REGEXP_SUBSTR(tiempo_total_linguistico, '\\d+min'), '\\d+')), 0) minutos,
                        COALESCE(SUM(REGEXP_SUBSTR(REGEXP_SUBSTR(tiempo_total_linguistico, '\\d+seg'), '\\d+')), 0) segundos
                    from lotes_variables
                    where id_lote=?
                )
            )
        `, [lotId]);
        const totalAccumulatedLinguisticTime = head(result).SUMA_TOTAL_LINGUISTICO;
        return totalAccumulatedLinguisticTime;
    }

    static async runLinguisticProcess(lotOperative, userCreator) {
        // const oracle = new Oracle();
        const { operativeId, lotId, variableId, userId } = {
            operativeId: lotOperative.operativeId,
            lotId: lotOperative.lotId,
            variableId: lotOperative.variableId,
            userId: userCreator
        };
        const transaction = await knex.transaction();
        await transaction.raw(`begin
            LIN_DATOS_ENTRADA_A_PROCESAMIENTOS(?, ?, ?);
        end;`, [operativeId, lotId, userId]);
        
        await transaction.raw(`begin
            LIN_NORMALIZADO_ESTANDAR(?, ?, ?);
        end;`, [operativeId, lotId, variableId]);

        await transaction.raw(`begin
        LIN_CORRECTOR_PALABRAS(?, ?, ?);
        end;`, [operativeId, lotId, variableId]);

        await transaction.raw(`begin
        LIN_CORRER_PASOS_LINGUISTICOS(?, ?, ?);
        end;`, [operativeId, lotId, variableId]);

        await transaction.raw(`begin
        LIN_IDENTIFICAR_RESPUESTA_VACIO(?, ?, ?);
        end;`, [operativeId, lotId, variableId]);

        await transaction.commit();
        return true;
    }

    static async getTotal(query){
        if(!query) {
            const { total } = await lots.countDocuments({FECHA_BAJA: null});
            return total;
        }
        const [result] = await lots.knex(lots.tableName)
            .count({ total: '*' })
            .whereNotNull('FECHA_FIN_CARGA_DATOS_LOTE')
            .andWhere({FECHA_BAJA: null});
        return result.total;
    }

    static async fetch(query) {
        let lotss = null;
        if(!query){
            lotss = await lots.find({ FECHA_BAJA: null });
        } else if(query.linguisticLots) {
            lotss = await lots.knex
                .select(lots.selectableProps)
                .from(lots.tableName)
                .whereNotNull('FECHA_FIN_CARGA_DATOS_LOTE')
                .andWhere({FECHA_BAJA: null});
        }

        lotss = lotss.map(lot => LotsService.rebaseFormat(lot));
        await OperativesService.getOperativesData(lotss);
        return lotss;
    }

    static async create(params, userCreator) {
        const formattedLot = {
            ID_OPERATIVO: params.operativeId,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            NOMBRE_ARCHIVO: trim(params.fileName),
            FORMATO_ARCHIVO: trim(params.fileFormat),
            CANTIDAD_DE_REGISTROS: params.numberOfRecords,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };

        const lotId = await lots.insertOne(formattedLot, ['ID_LOTE']);
        const lot = await LotsService.findOne({ lotId: lotId });
        return lot;
    }

    static async findOne(filters) {
        const lot = await lots.findById({ ID_LOTE: toNumber(filters.lotId) });
        return LotsService.rebaseFormat(lot);
    }

    static async update(filters, params) {
        const formattedLot = {
            ID_OPERATIVO: params.operativeId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            NOMBRE_ARCHIVO: params.fileName,
            FORMATO_ARCHIVO: params.fileFormat,
            CANTIDAD_DE_REGISTROS: params.numberOfRecords
        };
        const formattedFilters = { ID_LOTE: toNumber(filters.id) };
        const lotId = await lots.updateOne(formattedFilters, formattedLot, ['ID_LOTE']);
        const lot = await LotsService.findOne({lotId});
        return lot;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_LOTE: filters.id };
        const success = await lots.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getLots(resources){
        const lotsIds = uniq(map(resources, resource => resource.lotId));
        let lotsData = await lots.findByValues('ID_LOTE', lotsIds);
        lotsData = map(lotsData, lots => ({
            id: lots.ID_LOTE,
            description: lots.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.lots = find(lotsData, lots => lots.id === resource.lotId);
            return resource;
        });
    }

    static rebaseFormat(lot) {
        const rebaseLot = {};
        if(has(lot, 'ID_OPERATIVO')){
            rebaseLot['operativeId'] = lot.ID_OPERATIVO;
        }
        if(has(lot, 'ID_LOTE')){
            rebaseLot['lotId'] = lot.ID_LOTE;
        }
        if(has(lot, 'DESCRIPCION')){
            rebaseLot['description'] = lot.DESCRIPCION;
        }
        if(has(lot, 'OBSERVACION')){
            rebaseLot['observation'] = lot.OBSERVACION;
        }
        if(has(lot, 'DOMINIO')){
            rebaseLot['domain'] = lot.DOMINIO;
        }
        if(has(lot, 'NOMBRE_ARCHIVO')){
            rebaseLot['fileName'] = lot.NOMBRE_ARCHIVO;
        }
        if(has(lot, 'FORMATO_ARCHIVO')){
            rebaseLot['fileFormat'] = lot.FORMATO_ARCHIVO;
        }
        if(has(lot, 'CANTIDAD_DE_REGISTROS')){
            rebaseLot['numberOfRecords'] = lot.CANTIDAD_DE_REGISTROS;
        }
        if(has(lot, 'FECHA_CARGA_DATOS_LOTE')){
            rebaseLot['loadDataStartDate'] = dateString(lot.FECHA_CARGA_DATOS_LOTE, dateTimeFormat);
        }
        if(has(lot, 'FECHA_FIN_CARGA_DATOS_LOTE')){
            rebaseLot['loadDataEndDate'] = dateString(lot.FECHA_FIN_CARGA_DATOS_LOTE, dateTimeFormat);
        }
        if(has(lot, 'CALIDAD_LOTE_TOTAL')){
            rebaseLot['totalLotQuality'] = lot.CALIDAD_LOTE_TOTAL;
        }
        if(has(lot, 'NIVEL_ERROR_LOTE_TOTAL')){
            rebaseLot['totalLotErrorLevel'] = lot.NIVEL_ERROR_LOTE_TOTAL;
        }
        if(has(lot, 'LOTE_RECHAZADO')){
            rebaseLot['lotRejected'] = !!lot.LOTE_RECHAZADO;
        }
        if(has(lot, 'FECHA_LOTE_RECHAZADO')){
            rebaseLot['lotRejectedDate'] = dateString(lot.FECHA_LOTE_RECHAZADO, dateTimeFormat);
        }
        if(has(lot, 'LOTE_APROBADO')){
            rebaseLot['lotApproved'] = !!lot.LOTE_APROBADO;
        }
        if(has(lot, 'FECHA_LOTE_APROBADO')){
            rebaseLot['lotApprovedDate'] = dateString(lot.FECHA_LOTE_APROBADO, dateTimeFormat);
        }
        if(has(lot, 'SE_RETROALIMENTA')){
            rebaseLot['hasFeedback'] = !!lot.SE_RETROALIMENTA;
        }
        if(has(lot, 'FECHA_INICIO_RETROALIMENTACION')){
            rebaseLot['feedbackStartDate'] = dateString(lot.FECHA_INICIO_RETROALIMENTACION), dateTimeFormat;
        }
        if(has(lot, 'FECHA_FIN_RETROALIMENTACION')){
            rebaseLot['feedbackEndDate'] = dateString(lot.FECHA_FIN_RETROALIMENTACION, dateTimeFormat);
        }
        if(has(lot, 'LOTE_ENTREGADO_AREA')){
            rebaseLot['hasLotDeliveredToArea'] = !!lot.LOTE_ENTREGADO_AREA;
        }
        if(has(lot, 'FECHA_ENTREGA_AREA')){
            rebaseLot['lotDeliveryToAreaDate'] = dateString(lot.FECHA_ENTREGA_AREA, dateTimeFormat);
        }
        if(has(lot, 'LOTE_ENTREGADO_A_DATA_LAKE')){
            rebaseLot['hasLotDeliveredToDataLake'] = !!lot.LOTE_ENTREGADO_A_DATA_LAKE;
        }
        if(has(lot, 'FECHA_INICIO_A_DATA_LAKE')){
            rebaseLot['dataLakeStartDate'] = dateString(lot.FECHA_INICIO_A_DATA_LAKE, dateTimeFormat);
        }
        if(has(lot, 'FECHA_FIN_A_DATA_LAKE')){
            rebaseLot['dataLakeEndDate'] = dateString(lot.FECHA_FIN_A_DATA_LAKE, dateTimeFormat);
        }
        if(has(lot, 'LOTE_DE_RESGUARDO_O_COPIA')){
            rebaseLot['haslotBackupOrCopy'] = !!lot.LOTE_DE_RESGUARDO_O_COPIA;
        }
        if(has(lot, 'FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA')){
            rebaseLot['lotBackupOrCopyDownloadDate'] = dateString(lot.FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA, dateTimeFormat);
        }
        if(has(lot, 'SE_BORRA_TODO_EL_LOTE')){
            rebaseLot['shouldDeleteWholeLot'] = !!lot.SE_BORRA_TODO_EL_LOTE;
        }
        if(has(lot, 'FECHA_INICIO_BORRADO')){
            rebaseLot['deleteStartDate'] = dateString(lot.FECHA_INICIO_BORRADO, dateTimeFormat);
        }
        if(has(lot, 'FECHA_FIN_BORRADO')){
            rebaseLot['deleteEndDate'] = dateString(lot.FECHA_FIN_BORRADO, dateTimeFormat);
        }
        if(has(lot, 'ID_USUARIO_ALTA')){
            rebaseLot['userCreator'] = lot.ID_USUARIO_ALTA;
        }
        if(has(lot, 'FECHA_ALTA')){
            rebaseLot['createdAt'] = dateString(lot.FECHA_ALTA, dateFormat);
        }
        if(has(lot, 'ID_USUARIO_BAJA')){
            rebaseLot['userDeleted'] = lot.ID_USUARIO_BAJA;
        }
        if(has(lot, 'FECHA_BAJA')){
            rebaseLot['deletedAt'] = dateString(lot.FECHA_BAJA, dateFormat);
        }
        return rebaseLot;
    }

    static formatData(lot) {
        const rebaseLot = {};
        if(has(lot, 'operativeId')){
            rebaseLot['ID_OPERATIVO'] = lot.operativeId;
        }
        if(has(lot, 'lotId')){
            rebaseLot['ID_LOTE'] = lot.lotId;
        }
        if(has(lot, 'description')){
            rebaseLot['DESCRIPCION'] = lot.description;
        }
        if(has(lot, 'observation')){
            rebaseLot['OBSERVACION'] = lot.observation;
        }
        if(has(lot, 'domain')){
            rebaseLot['DOMINIO'] = lot.domain;
        }
        if(has(lot, 'fileName')){
            rebaseLot['NOMBRE_ARCHIVO'] = lot.fileName;
        }
        if(has(lot, 'fileFormat')){
            rebaseLot['FORMATO_ARCHIVO'] = lot.fileFormat;
        }
        if(has(lot, 'numberOfRecords')){
            rebaseLot['CANTIDAD_DE_REGISTROS'] = lot.numberOfRecords;
        }
        if(has(lot, 'loadDataStartDate')){
            rebaseLot['FECHA_CARGA_DATOS_LOTE'] = stringDate(lot.loadDataStartDate, dateTimeFormat);
        }
        if(has(lot, 'loadDataEndDate')){
            rebaseLot['FECHA_FIN_CARGA_DATOS_LOTE'] = stringDate(lot.loadDataEndDate, dateTimeFormat);
        }
        if(has(lot, 'totalLotQuality')){
            rebaseLot['CALIDAD_LOTE_TOTAL'] = lot.totalLotQuality;
        }
        if(has(lot, 'totalLotErrorLevel')){
            rebaseLot['NIVEL_ERROR_LOTE_TOTAL'] = lot.totalLotErrorLevel;
        }
        if(has(lot, 'lotRejected')){
            rebaseLot['LOTE_RECHAZADO'] = lot.lotRejected;
        }
        if(has(lot, 'lotRejectedDate')){
            rebaseLot['FECHA_LOTE_RECHAZADO'] = stringDate(lot.lotRejectedDate, dateTimeFormat);
        }
        if(has(lot, 'lotApproved')){
            rebaseLot['LOTE_APROBADO'] = lot.lotApproved;
        }
        if(has(lot, 'lotApprovedDate')){
            rebaseLot['FECHA_LOTE_APROBADO'] = stringDate(lot.lotApprovedDate, dateTimeFormat);
        }
        if(has(lot, 'hasFeedback')){
            rebaseLot['SE_RETROALIMENTA'] = lot.hasFeedback;
        }
        if(has(lot, 'feedbackStartDate')){
            rebaseLot['FECHA_INICIO_RETROALIMENTACION'] = stringDate(lot.feedbackStartDate, dateTimeFormat);
        }
        if(has(lot, 'feedbackEndDate')){
            rebaseLot['FECHA_FIN_RETROALIMENTACION'] = stringDate(lot.feedbackEndDate, dateTimeFormat);
        }
        if(has(lot, 'hasLotDeliveredToArea')){
            rebaseLot['LOTE_ENTREGADO_AREA'] = lot.hasLotDeliveredToArea;
        }
        if(has(lot, 'lotDeliveryToAreaDate')){
            rebaseLot['FECHA_ENTREGA_AREA'] = stringDate(lot.lotDeliveryToAreaDate, dateTimeFormat);
        }
        if(has(lot, 'hasLotDeliveredToDataLake')){
            rebaseLot['LOTE_ENTREGADO_A_DATA_LAKE'] = lot.hasLotDeliveredToDataLake;
        }
        if(has(lot, 'dataLakeStartDate')){
            rebaseLot['FECHA_INICIO_A_DATA_LAKE'] = stringDate(lot.dataLakeStartDate, dateTimeFormat);
        }
        if(has(lot, 'dataLakeEndDate')){
            rebaseLot['FECHA_FIN_A_DATA_LAKE'] = stringDate(lot.dataLakeEndDate, dateTimeFormat);
        }
        if(has(lot, 'haslotBackupOrCopy')){
            rebaseLot['LOTE_DE_RESGUARDO_O_COPIA'] = lot.haslotBackupOrCopy;
        }
        if(has(lot, 'lotBackupOrCopyDownloadDate')){
            rebaseLot['FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA'] = stringDate(lot.lotBackupOrCopyDownloadDate, dateTimeFormat);
        }
        if(has(lot, 'shouldDeleteWholeLot')){
            rebaseLot['SE_BORRA_TODO_EL_LOTE'] = lot.shouldDeleteWholeLot;
        }
        if(has(lot, 'deleteStartDate')){
            rebaseLot['FECHA_INICIO_BORRADO'] = stringDate(lot.deleteStartDate, dateTimeFormat);
        }
        if(has(lot, 'deleteEndDate')){
            rebaseLot['FECHA_FIN_BORRADO'] = stringDate(lot.deleteEndDate, dateTimeFormat);
        }
        if(has(lot, 'userCreator')){
            rebaseLot['ID_USUARIO_ALTA'] = lot.userCreator;
        }
        if(has(lot, 'createdAt')){
            rebaseLot['FECHA_ALTA'] = stringDate(lot.createdAt, dateFormat);
        }
        if(has(lot, 'userDeleted')){
            rebaseLot['ID_USUARIO_BAJA'] = lot.userDeleted;
        }
        if(has(lot, 'deletedAt')){
            rebaseLot['FECHA_BAJA'] = stringDate(lot.deletedAt, dateFormat);
        }
        return rebaseLot;
    }
}

module.exports = LotsService;
