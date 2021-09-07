const { questions: questionsModel } = include('models');
const { dateToString, stringToDate } = include('util');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');

class QuestionService {
    static async fetch() {
        const Questions = await questionsModel.find({ FECHA_BAJA: null });
        return Questions.map(question => ({
            id: question.ID_PREGUNTA,
            question: question.PREGUNTA,
            approved: question.SUPERVISADO,
            observation: question.OBSERVACION,
            domain: question.DOMINIO,
            createdAt: dateToString(question.FECHA_ALTA),
            userCreator: question.ID_USUARIO_ALTA,
            userDeleted: question.ID_USUARIO_BAJA,
            deletedAt: dateToString(question.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedQuestion = {
            ID_PREGUNTA: null,
            PREGUNTA: params.question,
            SUPERVISADO: params.approved,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
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
            userCreator: question.ID_USUARIO_ALTA,
            createdAt: dateToString(question.FECHA_ALTA),
            userDeleted: question.ID_USUARIO_BAJA,
            deletedAt: dateToString(question.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedQuestion = {
            ID_PREGUNTA: params.id,
            PREGUNTA: params.question,
            SUPERVISADO: params.approved,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };

        const questionId = await questionsModel.updateOne({ ID_PREGUNTA: filters.id },
            formattedQuestion, ['ID_PREGUNTA']);
        const question = await QuestionService.findOne({ id: questionId });
        return question;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_PREGUNTA: filters.id };
        const success = await questionsModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
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
            userCreator: question.ID_USUARIO_ALTA,
            userDeleted: question.ID_USUARIO_BAJA,
            deletedAt: dateToString(question.FECHA_BAJA)
        }));
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = questionsModel.knex.select(columns)
                .from(questionsModel.tableName)
                .where({FECHA_BAJA: null})
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

    static getColumns(){
        return [
            {
                original: 'ID_PREGUNTA',
                modified: 'id'
            },
            {
                original: 'PREGUNTA',
                modified: 'question'
            },
            {
                original: 'OBSERVACION',
                modified: 'observation'
            },
            {
                original: 'DOMINIO',
                modified: 'domain'
            },
            {
                original: 'SUPERVISADO',
                modified: 'approved'
            }
        ];
    }
}

module.exports = QuestionService;
