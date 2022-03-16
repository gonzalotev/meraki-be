const { questions: questionsModel } = include('models');
const { dateToString, dateString } = include('util');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const find = require('lodash/find');

class QuestionService {
    static async fetch() {
        const Questions = await questionsModel.find();
        return Questions.map(question => ({
            id: question.ID_PREGUNTA,
            question: question.PREGUNTA,
            approved: !!question.SUPERVISADO,
            observation: question.OBSERVACION,
            domain: question.DOMINIO,
            createdAt: dateString(question.FECHA_ALTA, 'YYYY-MM-DD'),
            userCreator: question.ID_USUARIO_ALTA
        }));
    }

    static async create(params, userCreator) {
        const formattedQuestion = {
            PREGUNTA: params.question,
            SUPERVISADO: params.approved,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };

        const questionId = await questionsModel.insertOne(formattedQuestion, ['ID_PREGUNTA']);
        const question = await QuestionService.findOne({ id: questionId });
        return question;
    }

    static async findOne(filters) {
        const question = await questionsModel.findById({ ID_PREGUNTA: filters.id });
        return {
            id: question.ID_PREGUNTA,
            question: question.PREGUNTA,
            approved: !!question.SUPERVISADO,
            observation: question.OBSERVACION,
            domain: question.DOMINIO,
            createdAt: dateString(question.FECHA_ALTA, 'YYYY-MM-DD'),
            userCreator: question.ID_USUARIO_ALTA
        };
    }

    static async update(filters, params) {
        const formattedQuestion = {
            PREGUNTA: params.question,
            SUPERVISADO: params.approved,
            OBSERVACION: params.observation,
            DOMINIO: params.domain
        };

        const questionId = await questionsModel.updateOne({ ID_PREGUNTA: filters.id },
            formattedQuestion, ['ID_PREGUNTA']);
        const question = await QuestionService.findOne({ id: questionId });
        return question;
    }

    static async delete(filters) {
        const formattedFilters = { ID_PREGUNTA: filters.id };
        const success = await questionsModel.delete(formattedFilters);
        return !!success;
    }

    static async getQuestionData(resources){
        const questionsIds = uniq(map(resources, resource => resource.questionId));
        let questions = await questionsModel.knex.select()
            .from(questionsModel.tableName)
            .whereIn('ID_PREGUNTA', questionsIds);
        questions = map(questions, question => ({
            id: question.ID_PREGUNTA,
            question: question.PREGUNTA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.question = find(questions, question => question.id === resource.questionId);
            return resource;
        });
    }

    static async fetchIfExist(Model, id, filters = {}){
        const questions = await questionsModel.knex(questionsModel.tableName).whereExists(function() {
            this.select('*')
                .from(Model.tableName)
                .whereRaw(`${questionsModel.tableName}.${id} = ${Model.tableName}.${id}`)
                .andWhere(filters);
        })
            .orderBy([{column: 'PREGUNTA', order: 'asc'}]);
        return questions.map(question => ({
            id: question.ID_PREGUNTA,
            question: question.PREGUNTA,
            approved: question.SUPERVISADO,
            observation: question.OBSERVACION,
            domain: question.DOMINIO,
            createdAt: dateToString(question.FECHA_ALTA),
            userCreator: question.ID_USUARIO_ALTA
        }));
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = questionsModel.knex.select(columns)
                .from(questionsModel.tableName)
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
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA ID'
            },
            {
                original: 'PREGUNTA',
                modified: 'PREGUNTA'
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
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = QuestionService;
