const { closedQuestions: closedQuestionsModel } = include('models');
const { dateToString } = include('util');
const QuestionService = require('./questions');
const NomenclatorsService = require('./nomenclators');
const OperativeSourcesService = require('./operativeSources');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class ClosedQuestionsService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ID_PREGUNTA_CERRADA', order: 'asc' }];
        const filterBy = {};
        const columnsToSelect = closedQuestionsModel.selectableProps;
        let closedQuestions = [];
        if (page && search) {
            closedQuestions = await closedQuestionsModel.fetchByPageAndTerm(page, search);
        } else if (page) {
            closedQuestions = await closedQuestionsModel.findByPage(page, filterBy, columnsToSelect, orderBy);
        } else {
            closedQuestions = await closedQuestionsModel.find();
        }

        closedQuestions = closedQuestions.map(closedQuestion => ({
            closedQuestionId: closedQuestion.ID_PREGUNTA_CERRADA,
            sourceId: closedQuestion.ID_FUENTE,
            questionId: closedQuestion.ID_PREGUNTA,
            description: closedQuestion.DESCRIPCION,
            observation: closedQuestion.OBSERVACION,
            domain: closedQuestion.DOMINIO,
            operatorId: closedQuestion.ID_OPERADOR,
            plsqlSymbol: closedQuestion.SIGNO_PLSQL,
            jsSymbol: closedQuestion.SIGNO_JS,
            nomenclatorId: closedQuestion.ID_NOMENCLADOR,
            nomenclatureId: closedQuestion.ID_NOMENCLATURA,
            approved: !!closedQuestion.SUPERVISADO,
            userCreator: closedQuestion.ID_USUARIO_ALTA,
            createdAt: dateToString(closedQuestion.FECHA_ALTA),
            nomenclatorEncodeId: closedQuestion.ID_NOMENCLADOR_A_CODIFICAR,
            nomenclatorAmount: closedQuestion.CANTIDAD_DE_NOMENCLATURAS,
            groupingsAmount: closedQuestion.CANTIDAD_DE_AGRUPACIONES
        }));
        await OperativeSourcesService.getSourceData(closedQuestions);
        await QuestionService.getQuestionData(closedQuestions);
        await NomenclatorsService.getNomenclatorData(closedQuestions);

        return closedQuestions;
    }

    static async create(params, userCreator) {
        const formattedClosedQuestion = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_OPERADOR: params.operatorId,
            SIGNO_PLSQL: params.plsqlSymbol,
            SIGNO_JS: params.jsSymbol,
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            ID_NOMENCLADOR_A_CODIFICAR: params.nomenclatorEncodeId,
            CANTIDAD_DE_NOMENCLATURAS: params.nomenclatorAmount,
            CANTIDAD_DE_AGRUPACIONES: params.groupingsAmount
        };
        const closedQuestionId = await closedQuestionsModel.insertOne(formattedClosedQuestion, ['ID_PREGUNTA_CERRADA']);
        const closedQuestion = await ClosedQuestionsService.findOne({ id: closedQuestionId });
        return closedQuestion;
    }

    static async findOne(filters) {
        let closedQuestion = await closedQuestionsModel.findById({
            ID_PREGUNTA_CERRADA: filters.id
        });
        closedQuestion = {
            closedQuestionId: closedQuestion.ID_PREGUNTA_CERRADA,
            sourceId: closedQuestion.ID_FUENTE,
            questionId: closedQuestion.ID_PREGUNTA,
            description: closedQuestion.DESCRIPCION,
            observation: closedQuestion.OBSERVACION,
            domain: closedQuestion.DOMINIO,
            operatorId: closedQuestion.ID_OPERADOR,
            plsqlSymbol: closedQuestion.SIGNO_PLSQL,
            jsSymbol: closedQuestion.SIGNO_JS,
            nomenclatorId: closedQuestion.ID_NOMENCLADOR,
            nomenclatureId: closedQuestion.ID_NOMENCLATURA,
            approved: !!closedQuestion.SUPERVISADO,
            userCreator: closedQuestion.ID_USUARIO_ALTA,
            createdAt: dateToString(closedQuestion.FECHA_ALTA),
            nomenclatorEncodeId: closedQuestion.ID_NOMENCLADOR_A_CODIFICAR,
            nomenclatorAmount: closedQuestion.CANTIDAD_DE_NOMENCLATURAS,
            groupingsAmount: closedQuestion.CANTIDAD_DE_AGRUPACIONES
        };
        return closedQuestion;
    }

    static async getTotal({ search }) {
        const { total } = await closedQuestionsModel.countTotal({}, search, ['FRASE_FINAL']);
        return total;
    }

    static async update(filters, params, userCreator) {
        const formattedClosedQuestion = {
            ID_PREGUNTA_CERRADA: params.closedQuestionId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_OPERADOR: params.operatorId,
            SIGNO_PLSQL: params.plsqlSymbol,
            SIGNO_JS: params.jsSymbol,
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            ID_NOMENCLADOR_A_CODIFICAR: params.nomenclatorEncodeId,
            CANTIDAD_DE_NOMENCLATURAS: params.nomenclatorAmount,
            CANTIDAD_DE_AGRUPACIONES: params.groupingsAmount
        };
        const closedQuestionId = await closedQuestionsModel.updateOne({ ID_PREGUNTA_CERRADA: filters.id },
            formattedClosedQuestion, ['ID_PREGUNTA_CERRADA']);
        const closedQuestion = await ClosedQuestionsService.findOne({ id: closedQuestionId });
        return closedQuestion;
    }

    static async delete(filters) {
        const formattedFilters = { ID_PREGUNTA_CERRADA: filters.id };
        const success = await closedQuestionsModel.delete(formattedFilters, {
        });
        return !!success;
    }

    static async getClosedQuestion(resources) {
        const closedQuestionIds = compact(uniq(map(resources, resource => resource.closedQuestionId)));
        if (isEmpty(closedQuestionIds)) {
            return resources;
        }
        let closedQuestions = await closedQuestionsModel.findByValues('ID_PREGUNTA_CERRADA', closedQuestionIds, closedQuestionsModel.selectableProps, []);
        closedQuestions = map(closedQuestions, closedQuestion => ({
            closedQuestionId: closedQuestion.ID_PREGUNTA_CERRADA,
            questionId: closedQuestion.ID_PREGUNTA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.closedQuestion = find(
                closedQuestions,
                closedQuestion => closedQuestion.closedQuestionId === resource.closedQuestionId
            );
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = closedQuestionsModel.knex.select(columns)
                .from(closedQuestionsModel.tableName)
                .where({})
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
                original: 'ID_PREGUNTA_CERRADA',
                modified: 'PREGUNTA CERRADA ID'
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
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
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
                original: 'ID_OPERADOR',
                modified: 'OPERADOR ID'
            },
            {
                original: 'SIGNO_PLSQL',
                modified: 'SIGNO PLSQL'
            },
            {
                original: 'SIGNO_JS',
                modified: 'SIGNO JS'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ID_NOMENCLATURA',
                modified: 'NOMENCLATURA ID'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            },
            {
                original: 'ID_NOMENCLADOR_A_CODIFICAR',
                modified: 'ID DE NOMENCLADOR A CODIFICAR'
            },
            {
                original: 'CANTIDAD_DE_NOMENCLATURAS',
                modified: 'CANTIDAD DE NOMENCLATURAS'
            },
            {
                original: 'CANTIDAD_DE_AGRUPACIONES',
                modified: 'CANTIDAD DE AGRUPACIONES'
            }
        ];
    }
}

module.exports = ClosedQuestionsService;
