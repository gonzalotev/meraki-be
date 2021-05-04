const { questionType: questionTypeModel } = include('models');
const trim = require('lodash/trim');

class QuestionTypeService {
    static async fetch() {
        const questionsTypes = await questionTypeModel.find();
        return questionsTypes.map(questionType => ({
            id: questionType.ID_ABIERTA_CERRADA,
            description: questionType.DESCRIPCION
        }));
    }

    static async create(params) {
        const formattedQuestionType = {
            ID_ABIERTA_CERRADA: null,
            DESCRIPCION: trim(params.description)
        };
        const questionType = await questionTypeModel.insertOne(formattedQuestionType);

        return {
            id: questionType.ID_ABIERTA_CERRADA,
            description: questionType.DESCRIPCION
        };
    }

    static async findOne(filters){
        const questionType = await questionTypeModel.findById({ID_ABIERTA_CERRADA: filters.id});
        return {
            id: questionType.ID_ABIERTA_CERRADA,
            description: questionType.DESCRIPCION
        };
    }

    static async update(filters, params){
        const formattedQuestionType = {
            ID_ABIERTA_CERRADA: params.id,
            DESCRIPCION: trim(params.description)
        };
        const questionType = await questionTypeModel.updateOne({ID_ABIERTA_CERRADA: filters.id}, formattedQuestionType);
        return {
            id: questionType.ID_ABIERTA_CERRADA,
            description: questionType.DESCRIPCION
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_ABIERTA_CERRADA: filters.id};
        const success = await questionTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = QuestionTypeService;
