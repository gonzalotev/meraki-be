const { MicroprocessSteps } = include('models');
const { dateToString, stringToDate } = include('util');
const NomenclatureService = require('./nomenclatures');
const MicroprocessDefinitionService = require('./microprocessDefinition');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const toUpper = require('lodash/toUpper');

class MicroprocessStepsService {
    static async fetch({page}) {
        let steps=[];
        if(page){
            steps = await MicroprocessSteps.findByPage(
                page,
                {},
                MicroprocessSteps.selectableProps,
                [{column: 'ID_MICROPROCESO', order: 'asc'}, {column: 'ID_ORDEN', order: 'asc'}]
            );
        } else {
            steps = await MicroprocessSteps.find();
        }
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
        const success = await MicroprocessSteps.deleteOne(ids);
        return !!success;
    }

    static async getTotal(){
        const {total} = await MicroprocessSteps.countTotal();
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
}

module.exports = MicroprocessStepsService;
