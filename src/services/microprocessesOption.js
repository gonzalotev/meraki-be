const { microprocessesOption: microprocessesOptionModel } = include('models');
const { dateToString } = include('util');
const QuestionService = require('./questions');
const OperativeSourcesService = require('./operativeSources');
const trim = require('lodash/trim');
const StaticalVariableService = require('./staticalVariable');

class microprocessesOptionService {
    static async fetch(query) {
        let microprocessesOptionTypes = await microprocessesOptionModel.findByPage(
            query.page,
            {},
            microprocessesOptionModel.selectableProps,
            [{ column: 'ID_MICROPROCESO', order: 'asc' }]
        );
        microprocessesOptionTypes = microprocessesOptionTypes.map(microprocessesOption => ({
            id: microprocessesOption.ID_MICROPROCESO,
            sourceId: microprocessesOption.ID_FUENTE,
            questionId: microprocessesOption.ID_PREGUNTA,
            orden: microprocessesOption.ORDEN,
            observation: microprocessesOption.OBSERVACION,
            abbreviation: microprocessesOption.ABREVIATURA,
            userCreator: microprocessesOption.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesOption.FECHA_ALTA)
        }));
        await QuestionService.getQuestionData(microprocessesOptionTypes);
        await OperativeSourcesService.getSourceData(microprocessesOptionTypes);
        await StaticalVariableService.getVariableAbbreviationData(microprocessesOptionTypes);
        return microprocessesOptionTypes;
    }
    static async getTotal(filters) {
        const total = await microprocessesOptionModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async create(params, userCreator) {
        const formattedmicroprocessesOption = {
            ID_MICROPROCESO: params.id,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ORDEN: params.orden,
            OBSERVACION: trim(params.observation),
            ABREVIATURA: trim(params.abbreviation),
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const microprocessesOptionId = await microprocessesOptionModel.insertOne(
            formattedmicroprocessesOption, ['ID_MICROPROCESO', 'ID_FUENTE', 'ID_PREGUNTA', 'ORDEN']);
        const microprocessesOption = await microprocessesOptionService.findOne(
            { id: microprocessesOptionId.ID_MICROPROCESO, sourceId: microprocessesOptionId.ID_FUENTE,
                questionId: microprocessesOptionId.ID_PREGUNTA, orden: microprocessesOptionId.ORDEN });
        return microprocessesOption;

    }

    static async findOne(filters) {
        const microprocessesOption = await microprocessesOptionModel.findById({
            ID_MICROPROCESO: filters.id, ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId, ORDEN: filters.orden });
        return {
            id: microprocessesOption.ID_MICROPROCESO,
            sourceId: microprocessesOption.ID_FUENTE,
            questionId: microprocessesOption.ID_PREGUNTA,
            orden: microprocessesOption.ORDEN,
            observation: microprocessesOption.OBSERVACION,
            abbreviation: microprocessesOption.ABREVIATURA,
            userCreator: microprocessesOption.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesOption.FECHA_ALTA)
        };
    }

    static async update(filters, params) {
        const formattedmicroprocessesOption = {
            ID_MICROPROCESO: params.id,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ORDEN: params.orden,
            OBSERVACION: trim(params.observation),
            ABREVIATURA: trim(params.abbreviation),
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: new Date()
        };
        const microprocessesOptionId = await microprocessesOptionModel.updateOne(
            { ID_MICROPROCESO: filters.id, ID_FUENTE: filters.sourceId,
                ID_PREGUNTA: filters.questionId, ORDEN: filters.orden },
            formattedmicroprocessesOption, ['ID_MICROPROCESO', 'ID_FUENTE', 'ID_PREGUNTA', 'ORDEN']);
        const microprocessesOption = await microprocessesOptionService.findOne(
            { id: microprocessesOptionId.ID_MICROPROCESO, sourceId: microprocessesOptionId.ID_FUENTE,
                questionId: microprocessesOptionId.ID_PREGUNTA, orden: microprocessesOptionId.ORDEN });
        return microprocessesOption;
    }

    static async delete({ id, sourceId, questionId, orden }) {
        const ids = { ID_MICROPROCESO: id, ID_FUENTE: sourceId, ID_PREGUNTA: questionId, ORDEN: orden };
        const success = await microprocessesOptionModel.delete(ids, {
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = microprocessesOptionModel.knex.select(columns)
                .from(microprocessesOptionModel.tableName)
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
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
                modified: 'id'
            },
            {
                original: 'ID_FUENTE',
                modified: 'sourceId'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'questionId'
            },
            {
                original: 'ORDEN',
                modified: 'orden'
            },
            {
                original: 'OBSERVACION',
                modified: 'observation'
            },
            {
                original: 'ABREVIATURA',
                modified: 'abbreviation'
            }
        ];
    }
}

module.exports = microprocessesOptionService;
