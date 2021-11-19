const { OperativeStructure } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

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
        } else if (operative) {
            structures = await OperativeStructure.find({ID_OPERATIVO: operative, FECHA_BAJA: null});
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

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = OperativeStructure.knex.select(columns)
                .from(OperativeStructure.tableName)
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
                original: 'ID_OPERATIVO',
                modified: 'OPERATIVO ID'
            },
            {
                original: 'ID_ESTRUCTURA',
                modified: 'ESTRUCTURA ID'
            },
            {
                original: 'NOMBRE_ORIGINAL',
                modified: 'NOMBRE ORIGINAL'
            },
            {
                original: 'ID_NOMBRE_CAMPO_ENTRADA',
                modified: 'CAMPO DE ENTRADA'
            },
            {
                original: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL',
                modified: 'CAMPO AUXILIAR ORIGINAL'
            },
            {
                original: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL',
                modified: 'CAMPO AUXILIAR FINAL'
            },
            {
                original: 'DESCRIPCION_VARIABLE',
                modified: 'DESCRIPCIÓN DE VARIABLE'
            },
            {
                original: 'SE_MUESTRA_EN_PANTALLA_AUXILIAR',
                modified: 'SE MUESTRA EN PANTALLA'
            },
            {
                original: 'ES_PARTE_DEL_ID',
                modified: 'ES PARTE DEL ID'
            },
            {
                original: 'ID_TIPO_DE_DATO',
                modified: 'TIPO DE DATO ID'
            },
            {
                original: 'TAMANIO_DATO',
                modified: 'TAMAÑO DE DATO'
            },
            {
                original: 'TIENE_DECIMALES',
                modified: 'TIENE DECIMALES'
            },
            {
                original: 'DECIMALES',
                modified: 'DECIMALES'
            },
            {
                original: 'POSICION_INICIAL',
                modified: 'POSICIÓN INICIAL'
            },
            {
                original: 'POSICION_FINAL',
                modified: 'POSICIÓN FINAL'
            },
            {
                original: 'HAY_CONVERSION_DATO',
                modified: 'HAY CONVERSIÓN DE DATO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'ID_FUENTE',
                modified: 'FUENTE ID'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA ID'
            }
        ];
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
