const { microprocessesStepsOption } = include('models');
const { dateToString, arrayToCsvFormat } = include('util');
const map = require('lodash/map');
const toNumber = require('lodash/toNumber');
const MicroprocessStepsService = require('./microprocessSteps');
const staticalVariableService = require('./staticalVariable');

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
            ID_MICROPROCESO: filters.microprocessId
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
        const success = await microprocessesStepsOption.deleteOne({
            ID_MICROPROCESO: filters.microprocessId
        },
        {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_MICROPROCESO',
                    nameInFile: 'MICROPROCESO'
                },
                {
                    nameInTable: 'ID_ORDEN',
                    nameInFile: 'ID ORDEN'
                },
                {
                    nameInTable: 'ID_FUENTE',
                    nameInFile: 'FUENTE'
                },
                {
                    nameInTable: 'ID_PREGUNTA',
                    nameInFile: 'PREGUNTA'
                },
                {
                    nameInTable: 'ORDEN',
                    nameInFile: 'ORDEN'
                },
                {
                    nameInTable: 'ABREVIATURA',
                    nameInFile: 'ABREVIATURA'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACION'
                }
            ];

            const microprocessesStepsOptionTableHeaders = map(fieldNames, field => field.nameInTable);
            const microprocessesStepsOptionFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(microprocessesStepsOptionFileHeaders);
            csvString += headers;
            const stream = microprocessesStepsOption.knex.select(microprocessesStepsOptionTableHeaders)
                .from(microprocessesStepsOption.tableName)
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
}

module.exports = MicroprocessesStepsOption;
