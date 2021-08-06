const { OperativeStructure } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class OperativeStructureService {
    static async fetch({page, operative}) {
        let structures=[];
        if(page && operative) {
            structures = await OperativeStructure.findByPage(
                page,
                {ID_OPERATIVO: operative, FECHA_BAJA: null},
                OperativeStructure.selectableProps,
                [
                    {column: 'ID_OPERATIVO', order: 'asc'},
                    {column: 'ID_ESTRUCTURA', order: 'asc'}
                ]
            );
        } else if(page){
            structures = await OperativeStructure.findByPage(
                page,
                {FECHA_BAJA: null},
                OperativeStructure.selectableProps,
                [
                    {column: 'ID_OPERATIVO', order: 'asc'},
                    {column: 'ID_ESTRUCTURA', order: 'asc'}
                ]
            );
        } else {
            structures = await OperativeStructure.find({FECHA_BAJA: null});
        }
        return structures.map(structure => OperativeStructureService.rebaseFormat(structure));
    }

    static async findOne({operativeId, structureId}){
        const ids = {
            ID_OPERATIVO: operativeId,
            ID_ESTRUCTURA: structureId
        };
        const structure = await OperativeStructure.findById(ids);
        return structure ? OperativeStructureService.rebaseFormat(structure) : {};
    }

    static async create(params, userCreator){
        const formattedOperativeStructure = OperativeStructureService.formatData({
            ...params,
            userCreator,
            userDeleted: null,
            createdAt: new Date(),
            deletedAt: null
        });
        const returnData = ['ID_OPERATIVO', 'ID_ESTRUCTURA'];
        const id = await OperativeStructure.insertOne(formattedOperativeStructure, returnData);
        return await OperativeStructureService.findOne({operativeId: id.ID_OPERATIVO, structureId: id.ID_ESTRUCTURA});
    }

    static async update({operativeId, structureId}, params) {
        const formattedOperativeStructure = OperativeStructureService.formatData({...params});
        const ids = {
            ID_OPERATIVO: operativeId,
            ID_ESTRUCTURA: structureId
        };
        const returnData = ['ID_OPERATIVO', 'ID_ESTRUCTURA'];
        const id = await OperativeStructure.updateOne(ids, formattedOperativeStructure, returnData);
        return OperativeStructureService.findOne({operativeId: id.ID_OPERATIVO, structureId: id.ID_ESTRUCTURA});
    }

    static async delete({operativeId, structureId}, userDeleted){
        const ids = {
            ID_OPERATIVO: operativeId,
            ID_ESTRUCTURA: structureId
        };
        const success = await OperativeStructure.deleteOne(ids, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getTotal(){
        const result = await OperativeStructure.countTotal({FECHA_BAJA: null});
        return result.total;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_OPERATIVO',
                    nameInFile: 'ID DE OPERATIVO'
                },
                {
                    nameInTable: 'ID_ESTRUCTURA',
                    nameInFile: 'ID DE ESTRUCTURA'
                },
                {
                    nameInTable: 'NOMBRE_ORIGINAL',
                    nameInFile: 'NOMBRE ORIGINAL'
                },
                {
                    nameInTable: 'ID_NOMBRE_CAMPO_ENTRADA',
                    nameInFile: 'CAMPO DE ENTRADA'
                },
                {
                    nameInTable: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL',
                    nameInFile: 'CAMPO AUXILIAR ORIGINAL'
                },
                {
                    nameInTable: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL',
                    nameInFile: 'CAMPO AUXILIAR FINAL'
                },
                {
                    nameInTable: 'DESCRIPCION_VARIABLE',
                    nameInFile: 'DESCRIPCION DE VARIABLE'
                },
                {
                    nameInTable: 'SE_MUESTRA_EN_PANTALLA_AUXILIAR',
                    nameInFile: 'SE MUESTRA EN PANTALLA'
                },
                {
                    nameInTable: 'ES_PARTE_DEL_ID',
                    nameInFile: 'ES PARTE DEL ID'
                },
                {
                    nameInTable: 'ID_TIPO_DE_DATO',
                    nameInFile: 'TIPO DE DATO'
                },
                {
                    nameInTable: 'TAMANIO_DATO',
                    nameInFile: 'TAMAÑO DE DATO'
                },
                {
                    nameInTable: 'TIENE_DECIMALES',
                    nameInFile: 'TIENE DECIMALES'
                },
                {
                    nameInTable: 'DECIMALES',
                    nameInFile: 'DECIMALES'
                },
                {
                    nameInTable: 'POSICION_INICIAL',
                    nameInFile: 'POSICION INICIAL'
                },
                {
                    nameInTable: 'POSICION_FINAL',
                    nameInFile: 'POSICION FINAL'
                },
                {
                    nameInTable: 'HAY_CONVERSION_DATO',
                    nameInFile: 'HAY CONVERSION DE DATO'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACION'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'ID_FUENTE',
                    nameInFile: 'ID DE FUENTE'
                },
                {
                    nameInTable: 'ID_PREGUNTA',
                    nameInFile: 'ID DE PREGUNTA'
                }
            ];

            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = OperativeStructure.knex.select(tableHeaders)
                .from(OperativeStructure.tableName)
                .where({FECHA_BAJA: null})
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

    static rebaseFormat(structure) {
        return {
            operativeId: structure.ID_OPERATIVO,
            structureId: structure.ID_ESTRUCTURA,
            originalName: structure.NOMBRE_ORIGINAL,
            entryFieldNameId: structure.ID_NOMBRE_CAMPO_ENTRADA,
            originalAuxiliaryFieldId: structure.ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL,
            finalAuxiliaryFieldId: structure.ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL,
            variableDescription: structure.DESCRIPCION_VARIABLE,
            shouldDisplayAuxiliary: structure.SE_MUESTRA_EN_PANTALLA_AUXILIAR,
            isPartOfTheId: structure.ES_PARTE_DEL_ID,
            datatypeId: structure.ID_TIPO_DE_DATO,
            dataSize: structure.TAMANIO_DATO,
            hasDecimals: structure.TIENE_DECIMALES,
            decimals: structure.DECIMALES,
            initialPosition: structure.POSICION_INICIAL,
            finalPosition: structure.POSICION_FINAL,
            shouldDataBeConverted: structure.HAY_CONVERSION_DATO,
            observation: structure.OBSERVACION,
            domain: structure.DOMINIO,
            sourceId: structure.ID_FUENTE,
            questionId: structure.ID_PREGUNTA,
            userCreator: structure.ID_USUARIO_ALTA,
            createdAt: dateToString(structure.FECHA_ALTA),
            userDeleted: structure.ID_USUARIO_BAJA,
            deletedAt: dateToString(structure.FECHA_BAJA)
        };
    }

    static formatData(structure) {
        return {
            ID_OPERATIVO: structure.operativeId,
            ID_ESTRUCTURA: structure.structureId,
            NOMBRE_ORIGINAL: trim(structure.originalName),
            ID_NOMBRE_CAMPO_ENTRADA: structure.entryFieldNameId,
            ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL: structure.originalAuxiliaryFieldId,
            ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL: structure.finalAuxiliaryFieldId,
            DESCRIPCION_VARIABLE: structure.variableDescription,
            SE_MUESTRA_EN_PANTALLA_AUXILIAR: structure.shouldDisplayAuxiliary,
            ES_PARTE_DEL_ID: structure.isPartOfTheId,
            ID_TIPO_DE_DATO: structure.datatypeId,
            TAMANIO_DATO: structure.dataSize,
            TIENE_DECIMALES: !!structure.decimals,
            DECIMALES: structure.decimals,
            POSICION_INICIAL: structure.initialPosition,
            POSICION_FINAL: structure.finalPosition,
            HAY_CONVERSION_DATO: structure.shouldDataBeConverted,
            OBSERVACION: trim(structure.observation),
            DOMINIO: trim(structure.domain),
            ID_FUENTE: structure.sourceId || null,
            ID_PREGUNTA: structure.questionId || null,
            ID_USUARIO_ALTA: structure.userCreator,
            FECHA_ALTA: stringToDate(structure.createdAt),
            ID_USUARIO_BAJA: structure.userDeleted,
            FECHA_BAJA: stringToDate(structure.deletedAt)
        };
    }
}

module.exports = OperativeStructureService;
