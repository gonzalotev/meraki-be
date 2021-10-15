const OperativesService = require('./operatives');
const Oracle = include('helpers/oracle');
const { lots } = include('models');
const { lotsAttrib } = include('constants/staticData');
const { dateToString, stringToDate, dateTimeToString } = include('util');
const toNumber = require('lodash/toNumber');

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
                G_DATOS_ENTRADA_A_PROCESAMIENTOS(:operativeId, :lotId, :userId, :sal);
                commit;
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
}

module.exports = LotsService;
