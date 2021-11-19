const { microprocessesStepsOption } = include('models');
const { dateToString } = include('util');
const toNumber = require('lodash/toNumber');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const MicroprocessStepsService = require('./microprocessSteps');
const staticalVariableService = require('./staticalVariable');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');

class MicroprocessesStepsOption {
    static async fetch() {
        let microprocessesStepsOptionList = await microprocessesStepsOption.find();
        microprocessesStepsOptionList = microprocessesStepsOptionList.map(microprocesses => ({
            id: microprocesses.ID_MICROPROCESO,
            microprocessId: microprocesses.ID_MICROPROCESO,
            orderId: microprocesses.ID_ORDEN,
            sourceId: microprocesses.ID_FUENTE,
            questionId: microprocesses.ID_PREGUNTA,
            order: microprocesses.ORDEN,
            abbreviation: microprocesses.ABREVIATURA,
            observation: microprocesses.OBSERVACION,
            userCreator: microprocesses.ID_USUARIO_ALTA,
            createdAt: microprocesses.FECHA_ALTA
        }));
        await MicroprocessStepsService.getMicroprocessesData(microprocessesStepsOptionList);
        await staticalVariableService.getVariableId(microprocessesStepsOptionList);
        await OperativeSourcesService.getSourceData(microprocessesStepsOptionList);
        await QuestionsService.getQuestionData(microprocessesStepsOptionList);
        return microprocessesStepsOptionList;
    }

    static async create(params, userCreator) {
        const formattedMicroprocessesStepsOption = {
            ID_MICROPROCESO: params.microprocessId,
            ID_ORDEN: params.orderId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ORDEN: params.order,
            ABREVIATURA: params.abbreviation,
            OBSERVACION: params.observation,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const microprocess = await microprocessesStepsOption.insertOne(formattedMicroprocessesStepsOption, ['ID_MICROPROCESO', 'ID_ORDEN', 'ID_FUENTE', 'ID_PREGUNTA']);
        const operative = await MicroprocessesStepsOption.findOne(
            {microprocessId: microprocess.ID_MICROPROCESO,
                orderId: microprocess.ID_ORDEN,
                sourceId: microprocess.ID_FUENTE,
                questionId: microprocess.ID_PREGUNTA
            });
        return operative;
    }

    static async findOne(filters){
        const formattedFilters = {
            ID_MICROPROCESO: filters.microprocessId,
            ID_ORDEN: filters.orderId,
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId
        };
        const microprocesses = await microprocessesStepsOption.findById(formattedFilters);
        return {
            microprocessId: microprocesses.ID_MICROPROCESO,
            orderId: toNumber(microprocesses.ID_ORDEN),
            sourceId: toNumber(microprocesses.ID_FUENTE),
            questionId: toNumber(microprocesses.ID_PREGUNTA),
            order: toNumber(microprocesses.ORDEN),
            abbreviation: microprocesses.ABREVIATURA,
            observation: microprocesses.OBSERVACION,
            userCreator: microprocesses.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocesses.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedMicroprocessesStepsOption = {
            ID_MICROPROCESO: params.microprocessId,
            ID_ORDEN: toNumber(params.orderId),
            ID_FUENTE: toNumber(params.sourceId),
            ID_PREGUNTA: toNumber(params.questionId),
            ORDEN: toNumber(params.order),
            ABREVIATURA: params.abbreviation,
            OBSERVACION: params.observation,
            ID_USUARIO_ALTA: params.userCreator
        };
        const formattedFilters = {
            ID_MICROPROCESO: filters.microprocessId,
            ID_ORDEN: filters.orderId,
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId
        };
        const microprocessesId = await microprocessesStepsOption.updateOne(formattedFilters, formattedMicroprocessesStepsOption, ['ID_MICROPROCESO', 'ID_ORDEN', 'ID_FUENTE', 'ID_PREGUNTA']);
        const microprocessStepOption =
        await MicroprocessesStepsOption.findOne({
            microprocessId: microprocessesId.ID_MICROPROCESO,
            orderId: microprocessesId.ID_ORDEN,
            sourceId: microprocessesId.ID_FUENTE,
            questionId: microprocessesId.ID_PREGUNTA
        });
        return microprocessStepOption;
    }

    static async delete(filters, userDeleted){
        const success = await microprocessesStepsOption.delete({
            ID_MICROPROCESO: filters.microprocessId,
            ID_ORDEN: filters.orderId,
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId
        },
        {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = microprocessesStepsOption.knex.select(columns)
                .from(microprocessesStepsOption.tableName)
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
                modified: 'ORDEN ID'
            },
            {
                original: 'ID_FUENTE',
                modified: 'FUENTE ID'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA ID'
            },
            {
                original: 'ORDEN',
                modified: 'ORDEN'
            },
            {
                original: 'ABREVIATURA',
                modified: 'ABREVIATURA'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            }
        ];
    }
}

module.exports = MicroprocessesStepsOption;
