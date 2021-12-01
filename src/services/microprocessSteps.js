const { MicroprocessSteps } = include('models');
const { dateToString, stringToDate, getPageSize, getOffset } = include('util');
const NomenclatureService = require('./nomenclatures');
const MicroprocessDefinitionService = require('./microprocessDefinition');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const find = require('lodash/find');
const toUpper = require('lodash/toUpper');
const head = require('lodash/head');

class MicroprocessStepsService {
    static async fetch({page, limit, ...filters}) {
        let steps=[];
        const stepsQuery = MicroprocessSteps.knex
            .select(MicroprocessSteps.selectableProps)
            .from(MicroprocessSteps.tableName)
            .orderBy([
                {column: 'ID_ORDEN', order: 'asc'},
                {column: 'ESTOY_EN', order: 'asc'}
            ]);
        if(filters && filters.microprocessId){
            stepsQuery.where({ID_MICROPROCESO: filters.microprocessId});
        }
        if(page){
            if(limit) {
                stepsQuery.limit(limit);
                stepsQuery.offset(getOffset(page, limit));
            } else {
                stepsQuery.limit(getPageSize());
                stepsQuery.offset(getOffset(page));
            }
        }

        stepsQuery.timeout(MicroprocessSteps.timeout);
        steps = await stepsQuery;

        steps = steps.map(step => MicroprocessStepsService.rebaseFormat(step));
        await NomenclatureService.getNomenclatureData(steps, 'nomenclatureIdNo', 'nomenclatureNo');
        await NomenclatureService.getNomenclatureData(steps, 'nomenclatureIdYes', 'nomenclatureYes');
        await MicroprocessDefinitionService.getMicroprocessesData(steps);
        return steps;
    }

    static async findOne({microprocessId, order}){
        const ids = {ID_MICROPROCESO: toUpper(microprocessId), ID_ORDEN: order};
        const step = await MicroprocessSteps.findById(ids);
        return step ? MicroprocessStepsService.rebaseFormat(step) : {};
    }

    static async create(params, userCreator){
        const formattedStep = MicroprocessStepsService.formatData({
            ...params,
            userCreator,
            createdAt: new Date()
        });
        const returnData = ['ID_MICROPROCESO', 'ID_ORDEN'];
        const id = await MicroprocessSteps.insertOne(formattedStep, returnData);
        return await MicroprocessStepsService.findOne({microprocessId: id.ID_MICROPROCESO, order: id.ID_ORDEN});
    }

    static async update({microprocessId, order}, params) {
        const formattedStep = MicroprocessStepsService.formatData({...params});
        const ids = {ID_MICROPROCESO: toUpper(microprocessId), ID_ORDEN: order};
        const returnData = ['ID_MICROPROCESO', 'ID_ORDEN'];
        const id = await MicroprocessSteps.updateOne(ids, formattedStep, returnData);
        return MicroprocessStepsService.findOne({microprocessId: id.ID_MICROPROCESO, order: id.ID_ORDEN});
    }

    static async delete({microprocessId, order}){
        const ids = {ID_MICROPROCESO: toUpper(microprocessId), ID_ORDEN: order};
        const success = await MicroprocessSteps.delete(ids);
        return !!success;
    }

    static async getTotal(query) {
        const stepsQuery = MicroprocessSteps.knex(MicroprocessSteps.tableName).count({ total: '*' });
        if(query && query.microprocessId){
            stepsQuery.where({ID_MICROPROCESO: query.microprocessId});
        }
        stepsQuery.timeout(MicroprocessSteps.timeout);
        const { total } = head(await stepsQuery);
        return total;
    }

    static rebaseFormat(step) {
        return {
            microprocessId: step.ID_MICROPROCESO,
            order: step.ID_ORDEN,
            in: step.ESTOY_EN,
            nomenclatorIdNo: step.ID_NOMENCLADOR_NO,
            nomenclatureIdNo: step.ID_NOMENCLATURA_NO,
            listId: step.ID_LISTAS,
            questionClosedId: step.ID_PREGUNTA_CERRADA,
            nomenclatorIdYes: step.ID_NOMENCLADOR_SI,
            nomenclatureIdYes: step.ID_NOMENCLATURA_SI,
            to: step.VOY_A,
            toDestiny: step.VOY_A_DESTINO,
            createdAt: dateToString(step.FECHA_ALTA),
            userCreator: step.ID_USUARIO_ALTA
        };
    }

    static formatData(step) {
        return {
            ID_MICROPROCESO: step.microprocessId,
            ID_ORDEN: step.order,
            ESTOY_EN: step.in,
            ID_NOMENCLADOR_NO: step.nomenclatorIdNo,
            ID_NOMENCLATURA_NO: step.nomenclatureIdNo,
            ID_LISTAS: step.listId,
            ID_PREGUNTA_CERRADA: step.questionClosedId,
            ID_NOMENCLADOR_SI: step.nomenclatorIdYes,
            ID_NOMENCLATURA_SI: step.nomenclatureIdYes,
            VOY_A: step.to,
            VOY_A_DESTINO: step.toDestiny,
            FECHA_ALTA: stringToDate(step.createdAt),
            ID_USUARIO_ALTA: step.userCreator
        };
    }

    static async getMicroprocessesData(resources){
        const microprocessesIds = uniq(map(resources, resource => resource.id));
        let microprocessesData = await MicroprocessSteps.findByValues('ID_MICROPROCESO', microprocessesIds);
        microprocessesData = map(microprocessesData, microprocesse => ({
            id: microprocesse.ID_MICROPROCESO,
            description: microprocesse.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.microprocesse = find(
                microprocessesData, microprocesse => microprocesse.id === resource.id);
            return resource;
        });
    }
    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = MicroprocessSteps.knex.select(columns)
                .from(MicroprocessSteps.tableName)
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
    static getColumns() {
        return [
            {
                original: 'ID_MICROPROCESO',
                modified: 'MICROPROCESO ID'
            },
            {
                original: 'ID_ORDEN',
                modified: 'ORDEN'
            },
            {
                original: 'ESTOY_EN',
                modified: 'ESTOY EN'
            },
            {
                original: 'ID_NOMENCLADOR_NO',
                modified: 'CLASIFICADOR NO ID'
            },
            {
                original: 'ID_NOMENCLATURA_NO',
                modified: 'NOMENCLATURA NO ID'
            },
            {
                original: 'ID_LISTAS',
                modified: 'LISTAS ID'
            },
            {
                original: 'ID_PREGUNTA_CERRADA',
                modified: 'PREGUNTA CERRADA ID'
            },
            {
                original: 'ID_NOMENCLADOR_SI',
                modified: 'CLASIFICADOR SI ID'
            },
            {
                original: 'ID_NOMENCLATURA_SI',
                modified: 'NOMENCLATURA SI ID'
            },
            {
                original: 'VOY_A',
                modified: 'VOY A'
            },
            {
                original: 'VOY_A_DESTINO',
                modified: 'VOY A DESTINO'
            }
        ];
    }
}

module.exports = MicroprocessStepsService;
