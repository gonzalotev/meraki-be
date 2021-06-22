const { questions: questionsModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class QuestionService {
    static async fetch() {
        const Questions = await questionsModel.find({FECHA_BAJA: null});
        return Questions.map(question => ({
            id: question.ID_PREGUNTA,
            pregunta: question.PREGUNTA,
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
            PREGUNTA: trim(params.question),
            SUPERVISADO: params.approved,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),            
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const question = await questionModel.insertOne(formattedQuestion);

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

    static async findOne(filters){
        const question = await questionsModel.findById({ID_PREGUNTA: filters.id});
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

    static async update(filters, params){
        const formattedQuestion = {
            ID_PREGUNTA: params.id,
            PREGUNTA: trim(params.question),
            SUPERVISADO: params.approved,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),            
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
            
        };
        const question = await questionsModel.updateOne({ID_PREGUNTA: filters.id},
            formattedQuestion);
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

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_PREGUNTA: filters.id};
        const success = await questionsModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = QuestionService;

