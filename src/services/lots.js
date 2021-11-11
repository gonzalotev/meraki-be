const OperativesService = require('./operatives');
const Oracle = include('helpers/oracle');
const { lots } = include('models');
const { lotsAttrib } = include('constants/staticData');
const { dateToString, stringToDate, dateTimeToString } = include('util');
const toNumber = require('lodash/toNumber');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');
const has = require('lodash/has');

class LotsService {
    static async fetchStaticLots() {
        const lotss = await lots.findAll(lotsAttrib);
        return lotss.map(lot => ({
            operativeId: lot.ID_OPERATIVO,
            lotId: lot.ID_LOTE,
            description: lot.DESCRIPCION,
            observation: lot.OBSERVACION,
            domain: lot.DOMINIO
        }));
    }

    static async runLinguisticProcess(lotOperative, userCreator) {
        const oracle = new Oracle();
        const dataTypes = oracle.getOutBinds();
        return await oracle.executePlSql(
            `BEGIN
                LIN_DATOS_ENTRADA_A_PROCESAMIENTOS(:operativeId, :lotId, :userId, :sal);
                COMMIT;
                LIN_NORMALIZADO_ESTANDAR(:operativeId, :lotId, :sal);
                COMMIT;
                LIN_CORRECTOR_PALABRAS(:operativeId, :lotId);
                COMMIT;
                LIN_CORRER_PASOS_LINGUISTICOS(:operativeId, :lotId);
                COMMIT;
            END;`,
            {
                operativeId: lotOperative.operativeId,
                lotId: lotOperative.lotId,
                userId: userCreator,
                sal: dataTypes.varchar
            }
        );
    }

    static async fetch() {
        let lotss = await lots.find({ FECHA_BAJA: null });
        lotss = lotss.map(lot => ({
            operativeId: lot.ID_OPERATIVO,
            lotId: lot.ID_LOTE,
            description: lot.DESCRIPCION,
            observation: lot.OBSERVACION,
            domain: lot.DOMINIO,
            fileName: lot.NOMBRE_ARCHIVO,
            fileFormat: lot.FORMATO_ARCHIVO,
            numberOfRecords: lot.CANTIDAD_DE_REGISTROS,
            batchDataLoadDate: dateToString(lot.FECHA_CARGA_DATOS_LOTE),
            endBatchDataLoadDate: dateToString(lot.FECHA_FIN_CARGA_DATOS_LOTE),
            TotalBatchQuality: lot.CALIDAD_LOTE_TOTAL,
            TotalBatchErrorLevel: lot.NIVEL_ERROR_LOTE_TOTAL,
            lotRejected: lot.LOTE_RECHAZADO,
            batchRejectedDate: dateToString(lot.FECHA_LOTE_RECHAZADO),
            lotApproved: !!lot.LOTE_APROBADO,
            lotApprovedDate: dateToString(lot.FECHA_LOTE_APROBADO),
            feedback: lot.SE_RETROALIMENTA,
            feedbackStartDate: dateToString(lot.FECHA_INICIO_RETROALIMENTACION),
            endDateFeedBack: dateToString(lot.FECHA_FIN_RETROALIMENTACION),
            lotDeliveredArea: lot.LOTE_ENTREGADO_AREA,
            lotDeliveryArea: lot.FECHA_ENTREGA_AREA,
            lotDeliveredToDataLake: lot.LOTE_ENTREGADO_A_DATA_LAKE,
            startDateToDataLake: dateToString(lot.FECHA_INICIO_A_DATA_LAKE),
            endDateToDataLake: dateToString(lot.FECHA_FIN_A_DATA_LAKE),
            receiptLotOrCopy: lot.LOTE_DE_RESGUARDO_O_COPIA,
            dateDownloadedBatchReceiptOrCopy: dateToString(lot.FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA),
            wholeBatchDeleted: lot.SE_BORRA_TODO_EL_LOTE,
            deleteStarttDate: dateToString(lot.FECHA_INICIO_BORRADO),
            endDateErased: dateToString(lot.FECHA_FIN_BORRADO),
            userCreator: lot.ID_USUARIO_ALTA,
            createdAt: lot.FECHA_ALTA,
            userDeleted: lot.FECHA_BAJA,
            deletedAt: dateToString(lot.ID_USUARIO_BAJA)
        }));

        await OperativesService.getOperativesData(lotss);
        return lotss;

    }

    static async create(params, userCreator) {
        const formattedLot = {
            ID_OPERATIVO: params.operativeId,
            ID_LOTE: params.lotId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            NOMBRE_ARCHIVO: params.fileName,
            FORMATO_ARCHIVO: params.fileFormat,
            CANTIDAD_DE_REGISTROS: params.numberOfRecords,
            FECHA_CARGA_DATOS_LOTE: stringToDate(params.batchDataLoadDate),
            FECHA_FIN_CARGA_DATOS_LOTE: stringToDate(params.endDateBatchDataLoad),
            CALIDAD_LOTE_TOTAL: params.qualityBatchTotal,
            NIVEL_ERROR_LOTE_TOTAL: params.TotalBatchErrorLevel,
            LOTE_RECHAZADO: params.lotRejected,
            FECHA_LOTE_RECHAZADO: stringToDate(params.batchRejectedDate),
            LOTE_APROBADO: params.lotApproved,
            FECHA_LOTE_APROBADO: stringToDate(params.lotApprovedDate),
            SE_RETROALIMENTA: params.feedback,
            FECHA_INICIO_RETROALIMENTACION: stringToDate(params.feedbackStartDate),
            FECHA_FIN_RETROALIMENTACION: stringToDate(params.endDateFeedBack),
            LOTE_ENTREGADO_AREA: params.lotDeliveredArea,
            FECHA_ENTREGA_AREA: stringToDate(params.lotDeliveryArea),
            LOTE_ENTREGADO_A_DATA_LAKE: params.lotDeliveredToDataLake,
            FECHA_INICIO_A_DATA_LAKE: stringToDate(params.startDateToDataLake),
            FECHA_FIN_A_DATA_LAKE: stringToDate(params.endDateToDataLake),
            LOTE_DE_RESGUARDO_O_COPIA: params.receiptLotOrCopy,
            FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA: stringToDate(params.dateDownloadedBatchReceiptOrCopy),
            SE_BORRA_TODO_EL_LOTE: params.wholeBatchDeleted,
            FECHA_INICIO_BORRADO: stringToDate(params.deleteStarttDate),
            FECHA_FIN_BORRADO: stringToDate(params.endDateErased),
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: new Date()
        };

        const lotId = await lots.insertOne(formattedLot, ['ID_LOTE']);
        const lot = await LotsService.findOne({ lotId: lotId });
        return lot;
    }

    static async findOne(filters) {
        const lot = await lots.findById({ ID_LOTE: toNumber(filters.lotId) });
        return {
            operativeId: lot.ID_OPERATIVO,
            lotId: lot.ID_LOTE,
            description: lot.DESCRIPCION,
            observation: lot.OBSERVATION,
            domain: lot.DOMINIO,
            fileName: lot.NOMBRE_ARCHIVO,
            fileFormat: lot.FORMATO_ARCHIVO,
            numberOfRecords: lot.CANTIDAD_DE_REGISTROS,
            batchDataLoadDate: dateTimeToString(lot.FECHA_CARGA_DATOS_LOTE),
            endBatchDataLoadDate: dateTimeToString(lot.FECHA_FIN_CARGA_DATOS_LOTE),
            TotalBatchQuality: lot.CALIDAD_LOTE_TOTAL,
            TotalBatchErrorLevel: lot.NIVEL_ERROR_LOTE_TOTAL,
            lotRejected: lot.LOTE_RECHAZADO,
            batchRejectedDate: dateTimeToString(lot.FECHA_LOTE_RECHAZADO),
            lotApproved: !!lot.LOTE_APROBADO,
            lotApprovedDate: dateTimeToString(lot.FECHA_LOTE_APROBADO),
            feedback: lot.SE_RETROALIMENTA,
            feedbackStartDate: dateTimeToString(lot.FECHA_INICIO_RETROALIMENTACION),
            endDateFeedBack: dateTimeToString(lot.FECHA_FIN_RETROALIMENTACION),
            lotDeliveredArea: lot.LOTE_ENTREGADO_AREA,
            lotDeliveryArea: lot.FECHA_ENTREGA_AREA,
            lotDeliveredToDataLake: lot.LOTE_ENTREGADO_A_DATA_LAKE,
            startDateToDataLake: dateTimeToString(lot.FECHA_INICIO_A_DATA_LAKE),
            endDateToDataLake: dateTimeToString(lot.FECHA_FIN_A_DATA_LAKE),
            receiptLotOrCopy: lot.LOTE_DE_RESGUARDO_O_COPIA,
            dateDownloadedBatchReceiptOrCopy: dateTimeToString(lot.FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA),
            wholeBatchDeleted: lot.SE_BORRA_TODO_EL_LOTE,
            deleteStarttDate: dateTimeToString(lot.FECHA_INICIO_BORRADO),
            endDateErased: lot.FECHA_FIN_BORRADO,
            userCreator: lot.ID_USUARIO_ALTA,
            createdAt: dateToString(lot.FECHA_ALTA),
            userDeleted: lot.FECHA_BAJA,
            deletedAt: dateToString(lot.ID_USUARIO_BAJA)
        };
    }

    static async update(filters, params, userCreator) {
        const formattedLot = {
            ID_OPERATIVO: params.operativeId,
            ID_LOTE: params.lotId,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            NOMBRE_ARCHIVO: params.fileName,
            FORMATO_ARCHIVO: params.fileFormat,
            CANTIDAD_DE_REGISTROS: params.numberOfRecords,
            FECHA_CARGA_DATOS_LOTE: null,
            FECHA_FIN_CARGA_DATOS_LOTE: null,
            CALIDAD_LOTE_TOTAL: params.qualityBatchTotal,
            NIVEL_ERROR_LOTE_TOTAL: params.TotalBatchErrorLevel,
            LOTE_RECHAZADO: params.lotRejected,
            FECHA_LOTE_RECHAZADO: null,
            LOTE_APROBADO: params.lotApproved,
            FECHA_LOTE_APROBADO: null,
            SE_RETROALIMENTA: params.feedback,
            FECHA_INICIO_RETROALIMENTACION: null,
            FECHA_FIN_RETROALIMENTACION: null,
            LOTE_ENTREGADO_AREA: params.lotDeliveredArea,
            FECHA_ENTREGA_AREA: null,
            LOTE_ENTREGADO_A_DATA_LAKE: params.lotDeliveredToDataLake,
            FECHA_INICIO_A_DATA_LAKE: null,
            FECHA_FIN_A_DATA_LAKE: null,
            LOTE_DE_RESGUARDO_O_COPIA: params.receiptLotOrCopy,
            FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA: null,
            SE_BORRA_TODO_EL_LOTE: params.wholeBatchDeleted,
            FECHA_INICIO_BORRADO: null,
            FECHA_FIN_BORRADO: null,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const formattedFilters = {ID_LOTE: params.lotId};
        const lotId = await lots.updateOne(formattedFilters, formattedLot, ['ID_LOTE']);
        const lot = await LotsService.findOne({lotId: lotId});
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
        if(has(lot, 'ID_OPERATIVO')){
            rebaseLot['operativeId'] = lot.ID_OPERATIVO;
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
            rebaseLot['batchDataLoadDate'] = dateToString(lot.FECHA_CARGA_DATOS_LOTE);
        }
        if(has(lot, 'FECHA_FIN_CARGA_DATOS_LOTE')){
            rebaseLot['endBatchDataLoadDate'] = dateToString(lot.FECHA_FIN_CARGA_DATOS_LOTE);
        }
        if(has(lot, 'CALIDAD_LOTE_TOTAL')){
            rebaseLot['TotalBatchQuality'] = lot.CALIDAD_LOTE_TOTAL;
        }
        if(has(lot, 'NIVEL_ERROR_LOTE_TOTAL')){
            rebaseLot['TotalBatchErrorLevel'] = lot.NIVEL_ERROR_LOTE_TOTAL;
        }
        if(has(lot, 'LOTE_RECHAZADO')){
            rebaseLot['lotRejected'] = lot.LOTE_RECHAZADO;
        }
        if(has(lot, 'FECHA_LOTE_RECHAZADO')){
            rebaseLot['batchRejectedDate'] = dateToString(lot.FECHA_LOTE_RECHAZADO);
        }
        if(has(lot, 'LOTE_APROBADO')){
            rebaseLot['lotApproved'] = !!lot.LOTE_APROBADO;
        }
        if(has(lot, 'FECHA_LOTE_APROBADO')){
            rebaseLot['lotApprovedDate'] = dateToString(lot.FECHA_LOTE_APROBADO);
        }
        if(has(lot, 'SE_RETROALIMENTA')){
            rebaseLot['feedback'] = lot.SE_RETROALIMENTA;
        }
        if(has(lot, 'FECHA_INICIO_RETROALIMENTACION')){
            rebaseLot['feedbackStartDate'] = dateToString(lot.FECHA_INICIO_RETROALIMENTACION);
        }
        if(has(lot, 'FECHA_FIN_RETROALIMENTACION')){
            rebaseLot['endDateFeedBack'] = dateToString(lot.FECHA_FIN_RETROALIMENTACION);
        }
        if(has(lot, 'LOTE_ENTREGADO_AREA')){
            rebaseLot['lotDeliveredArea'] = lot.LOTE_ENTREGADO_AREA;
        }
        if(has(lot, 'FECHA_ENTREGA_AREA')){
            rebaseLot['lotDeliveryArea'] = lot.FECHA_ENTREGA_AREA;
        }
        if(has(lot, 'LOTE_ENTREGADO_A_DATA_LAKE')){
            rebaseLot['lotDeliveredToDataLake'] = lot.LOTE_ENTREGADO_A_DATA_LAKE;
        }
        if(has(lot, 'FECHA_INICIO_A_DATA_LAKE')){
            rebaseLot['startDateToDataLake'] = dateToString(lot.FECHA_INICIO_A_DATA_LAKE);
        }
        if(has(lot, 'FECHA_FIN_A_DATA_LAKE')){
            rebaseLot['endDateToDataLake'] = dateToString(lot.FECHA_FIN_A_DATA_LAKE);
        }
        if(has(lot, 'LOTE_DE_RESGUARDO_O_COPIA')){
            rebaseLot['receiptLotOrCopy'] = lot.LOTE_DE_RESGUARDO_O_COPIA;
        }
        if(has(lot, 'FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA')){
            rebaseLot['dateDownloadedBatchReceiptOrCopy'] = dateToString(lot.FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA);
        }
        if(has(lot, 'SE_BORRA_TODO_EL_LOTE')){
            rebaseLot['wholeBatchDeleted'] = lot.SE_BORRA_TODO_EL_LOTE;
        }
        if(has(lot, 'FECHA_INICIO_BORRADO')){
            rebaseLot['deleteStarttDate'] = dateToString(lot.FECHA_INICIO_BORRADO);
        }
        if(has(lot, 'FECHA_FIN_BORRADO')){
            rebaseLot['endDateErased'] = dateToString(lot.FECHA_FIN_BORRADO);
        }
        if(has(lot, 'ID_USUARIO_ALTA')){
            rebaseLot['userCreator'] = lot.ID_USUARIO_ALTA;
        }
        if(has(lot, 'ID_OPERATIFECHA_ALTAVO')){
            rebaseLot['createdAt'] = dateToString(lot.FECHA_ALTA);
        }
        if(has(lot, 'ID_USUARIO_BAJA')){
            rebaseLot['userDeleted'] = lot.ID_USUARIO_BAJA;
        }
        if(has(lot, 'FECHA_BAJA')){
            rebaseLot['deletedAt'] = dateToString(lot.FECHA_BAJA);
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
        if(has(lot, 'operativeId')){
            rebaseLot['ID_OPERATIVO'] = lot.operativeId;
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
        if(has(lot, 'batchDataLoadDate')){
            rebaseLot['FECHA_CARGA_DATOS_LOTE'] = stringToDate(lot.batchDataLoadDate);
        }
        if(has(lot, 'endBatchDataLoadDate')){
            rebaseLot['FECHA_FIN_CARGA_DATOS_LOTE'] = stringToDate(lot.endBatchDataLoadDate);
        }
        if(has(lot, 'TotalBatchQuality')){
            rebaseLot['CALIDAD_LOTE_TOTAL'] = lot.TotalBatchQuality;
        }
        if(has(lot, 'TotalBatchErrorLevel')){
            rebaseLot['NIVEL_ERROR_LOTE_TOTAL'] = lot.TotalBatchErrorLevel;
        }
        if(has(lot, 'lotRejected')){
            rebaseLot['LOTE_RECHAZADO'] = lot.lotRejected;
        }
        if(has(lot, 'batchRejectedDate')){
            rebaseLot['FECHA_LOTE_RECHAZADO'] = stringToDate(lot.batchRejectedDate);
        }
        if(has(lot, 'lotApproved')){
            rebaseLot['LOTE_APROBADO'] = lot.lotApproved;
        }
        if(has(lot, 'lotApprovedDate')){
            rebaseLot['FECHA_LOTE_APROBADO'] = stringToDate(lot.lotApprovedDate);
        }
        if(has(lot, 'feedback')){
            rebaseLot['SE_RETROALIMENTA'] = lot.feedback;
        }
        if(has(lot, 'feedbackStartDate')){
            rebaseLot['FECHA_INICIO_RETROALIMENTACION'] = stringToDate(lot.feedbackStartDate);
        }
        if(has(lot, 'endDateFeedBack')){
            rebaseLot['FECHA_FIN_RETROALIMENTACION'] = stringToDate(lot.endDateFeedBack);
        }
        if(has(lot, 'lotDeliveredArea')){
            rebaseLot['LOTE_ENTREGADO_AREA'] = lot.lotDeliveredArea;
        }
        if(has(lot, 'lotDeliveryArea')){
            rebaseLot['FECHA_ENTREGA_AREA'] = lot.lotDeliveryArea;
        }
        if(has(lot, 'lotDeliveredToDataLake')){
            rebaseLot['LOTE_ENTREGADO_A_DATA_LAKE'] = lot.lotDeliveredToDataLake;
        }
        if(has(lot, 'startDateToDataLake')){
            rebaseLot['FECHA_INICIO_A_DATA_LAKE'] = stringToDate(lot.startDateToDataLake);
        }
        if(has(lot, 'endDateToDataLake')){
            rebaseLot['FECHA_FIN_A_DATA_LAKE'] = stringToDate(lot.endDateToDataLake);
        }
        if(has(lot, 'receiptLotOrCopy')){
            rebaseLot['LOTE_DE_RESGUARDO_O_COPIA'] = lot.receiptLotOrCopy;
        }
        if(has(lot, 'dateDownloadedBatchReceiptOrCopy')){
            rebaseLot['FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA'] = stringToDate(lot.dateDownloadedBatchReceiptOrCopy);
        }
        if(has(lot, 'wholeBatchDeleted')){
            rebaseLot['SE_BORRA_TODO_EL_LOTE'] = lot.wholeBatchDeleted;
        }
        if(has(lot, 'deleteStarttDate')){
            rebaseLot['FECHA_INICIO_BORRADO'] = stringToDate(lot.deleteStarttDate);
        }
        if(has(lot, 'endDateErased')){
            rebaseLot['FECHA_FIN_BORRADO'] = stringToDate(lot.endDateErased);
        }
        if(has(lot, 'userCreator')){
            rebaseLot['ID_USUARIO_ALTA'] = lot.userCreator;
        }
        if(has(lot, 'createdAt')){
            rebaseLot['FECHA_ALTA'] = stringToDate(lot.createdAt);
        }
        if(has(lot, 'userDeleted')){
            rebaseLot['ID_USUARIO_BAJA'] = lot.userDeleted;
        }
        if(has(lot, 'deletedAt')){
            rebaseLot['FECHA_BAJA'] = stringToDate(lot.deletedAt);
        }
        return rebaseLot;
    }
}

module.exports = LotsService;
