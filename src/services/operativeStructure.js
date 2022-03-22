const { OperativeStructure } = include('models');
const { dateToString, stringToDate } = include('util');
const OperativesService = require('./operatives');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class OperativeStructureService {
    static async fetch({page, operative}) {
        let structures=[];
        if(page && operative) {
            structures = await OperativeStructure.findByPage(
                page,
                {ID_OPERATIVO: operative},
                OperativeStructure.selectableProps,
                [
                    {column: 'ID_OPERATIVO', order: 'asc'},
                    {column: 'ID_ESTRUCTURA', order: 'asc'}
                ]
            );
        } else if (operative) {
            structures = await OperativeStructure.find({ID_OPERATIVO: operative});
        } else if(page){
            structures = await OperativeStructure.findByPage(
                page,
                {},
                OperativeStructure.selectableProps,
                [
                    {column: 'ID_OPERATIVO', order: 'asc'},
                    {column: 'ID_ESTRUCTURA', order: 'asc'}
                ]
            );
        } else {
            structures = await OperativeStructure.find({});
        }
        structures = structures.map(structure => OperativeStructureService.rebaseFormat(structure));
        await OperativesService.getOperativesData(structures);
        return structures;
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
            createdAt: new Date()
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

    static async delete({operativeId, structureId}){
        const ids = {
            ID_OPERATIVO: operativeId,
            ID_ESTRUCTURA: structureId
        };
        const success = await OperativeStructure.delete(ids);
        return !!success;
    }

    static async getTotal(){
        const result = await OperativeStructure.countTotal({});
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = OperativeStructure.knex.select(columns)
                .from(OperativeStructure.tableName)
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
                original: 'ID_PROCESAMIENTO_PREGUNTA_CERRADA',
                modified: 'CAMPO AUXILIAR FINAL'
            },
            {
                original: 'DESCRIPCION_VARIABLE',
                modified: 'DESCRIPCIÓN DE VARIABLE'
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
            questionClosedProcessId: structure.ID_PROCESAMIENTO_PREGUNTA_CERRADA,
            variableDescription: structure.DESCRIPCION_VARIABLE,
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
            createdAt: dateToString(structure.FECHA_ALTA)
        };
    }

    static formatData(structure) {
        return {
            ID_OPERATIVO: structure.operativeId,
            ID_ESTRUCTURA: structure.structureId,
            NOMBRE_ORIGINAL: trim(structure.originalName),
            ID_NOMBRE_CAMPO_ENTRADA: structure.entryFieldNameId,
            ID_PROCESAMIENTO_PREGUNTA_CERRADA: structure.questionClosedProcessId,
            DESCRIPCION_VARIABLE: structure.variableDescription,
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
            FECHA_ALTA: stringToDate(structure.createdAt)
        };
    }
}

module.exports = OperativeStructureService;
