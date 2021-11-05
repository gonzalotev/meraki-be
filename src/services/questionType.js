const { questionType: questionTypeModel } = include('models');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');
const isArray = require('lodash/isArray');

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
        const questionType = await questionTypeModel.findById(
            {ID_ABIERTA_CERRADA: filters.id},
            questionTypeModel.selectableProps,
            []
        );
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

    static async getQuestionTypeData(resources){
        if(isArray(resources)){
            const questionTypesIds = compact(uniq(map(resources, resource => resource.questionTypeId)));
            if(isEmpty(questionTypesIds)){
                return resources;
            }
            let questionsTypes = await questionTypeModel.findByValues('ID_ABIERTA_CERRADA', questionTypesIds, questionTypeModel.selectableProps, []);
            questionsTypes = map(questionsTypes, questionType => ({
                id: questionType.ID_ABIERTA_CERRADA,
                description: questionType.DESCRIPCION
            }));
            return map(resources, resource => {
                if (!resource.foreignData) {
                    resource.foreignData = {};
                }
                resource.foreignData.questionType = find(
                    questionsTypes,
                    questionType => questionType.id === resource.questionTypeId
                );
                return resource;
            });
        }
        const questionType = await QuestionTypeService.findOne({id: resources.questionTypeId});
        if (!resources.foreignData) {
            resources.foreignData = {};
        }
        resources.foreignData.questionType = questionType;
        return resources;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = questionTypeModel.knex.select(columns)
                .from(questionTypeModel.tableName)
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
                original: 'ID_ABIERTA_CERRADA',
                modified: 'ABIERTA CERRADA ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            }
        ];
    }
}

module.exports = QuestionTypeService;
