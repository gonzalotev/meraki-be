const { microprocessesClosedQuestionIf: microprocessesClosedQuestionIfModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const NomenclatureService = require('./nomenclatures');
const NomenclatorService = require('./nomenclators');

class microprocessesClosedQuestionIfService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_PREGUNTA_CERRADA', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = microprocessesClosedQuestionIfModel.selectableProps;
        let microprocesses=[];
        if(page && search) {
            microprocesses = await microprocessesClosedQuestionIfModel.findByMatch(
                page,
                search,
                ['DESCRIPCION'],
                filterBy,
                orderBy
            );
        } else if(page){
            microprocesses = await microprocessesClosedQuestionIfModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            microprocesses = await microprocessesClosedQuestionIfModel.find();
        }

        microprocesses=microprocesses.map(microprocessesClosedQuestionIf => ({
            id: microprocessesClosedQuestionIf.ID_PREGUNTA_CERRADA,
            sourceId: microprocessesClosedQuestionIf.ID_FUENTE,
            questionId: microprocessesClosedQuestionIf.ID_PREGUNTA,
            description: microprocessesClosedQuestionIf.DESCRIPCION,
            observation: microprocessesClosedQuestionIf.OBSERVACION,
            domain: microprocessesClosedQuestionIf.DOMINIO,
            operatorId: microprocessesClosedQuestionIf.ID_OPERADOR,
            signPlsql: microprocessesClosedQuestionIf.SIGNO_PLSQL,
            nomenclatorId: microprocessesClosedQuestionIf.ID_NOMENCLADOR,
            nomenclatureId: microprocessesClosedQuestionIf.ID_NOMENCLATURA,
            approved: !!microprocessesClosedQuestionIf.SUPERVISADO,
            userCreator: microprocessesClosedQuestionIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesClosedQuestionIf.FECHA_ALTA),
            signJs: microprocessesClosedQuestionIf.SIGNO_JS
        }));
        await OperativeSourcesService.getSourceData(microprocesses);
        await QuestionsService.getQuestionData(microprocesses);
        await NomenclatureService.getNomenclatureData(microprocesses);
        await NomenclatorService.getNomenclatorData(microprocesses);
        return microprocesses;
    }

    static async getTotal({ microprocesses }) {
        let result;
        if (microprocesses) {
            result = await microprocessesClosedQuestionIfModel.countTotal({ ID_PREGUNTA_CERRADA: microprocesses });
        } else {
            result = await microprocessesClosedQuestionIfModel.countTotal();
        }
        return result.total;
    }

    static async create(params, userCreator) {
        const formattedMicroprocessesClosedQuestionIf = {
            ID_PREGUNTA_CERRADA: null,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_OPERADOR: params.operatorId,
            SIGNO_PLSQL: trim(params.signPlsql),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: false,
            ID_USUARIO_ALTA: userCreator.id,
            FECHA_ALTA: new Date(),
            SIGNO_JS: trim(params.signJs)
        };
        const microprocessesClosedQuestionIfId = await microprocessesClosedQuestionIfModel.insertOne(formattedMicroprocessesClosedQuestionIf, ['ID_PREGUNTA_CERRADA']);
        // eslint-disable-next-line max-len
        const microprocessesClosedQuestionIf = await microprocessesClosedQuestionIfService.findOne({id: microprocessesClosedQuestionIfId});
        return microprocessesClosedQuestionIf;

    }

    static async findOne({id}) {
        const ids= {ID_PREGUNTA_CERRADA: id};
        let microprocessesClosedQuestionIf = await microprocessesClosedQuestionIfModel.findById(ids);
        // const microprocessesClosedQuestionIf = await microprocessesClosedQuestionIfModel.findById({
        //     ID_PREGUNTA_CERRADA: filters.id
        // });
        microprocessesClosedQuestionIf = microprocessesClosedQuestionIf ? {
            id: microprocessesClosedQuestionIf.ID_PREGUNTA_CERRADA,
            sourceId: microprocessesClosedQuestionIf.ID_FUENTE,
            questionId: microprocessesClosedQuestionIf.ID_PREGUNTA,
            description: microprocessesClosedQuestionIf.DESCRIPCION,
            observation: microprocessesClosedQuestionIf.OBSERVACION,
            domain: microprocessesClosedQuestionIf.DOMINIO,
            operatorId: microprocessesClosedQuestionIf.ID_OPERADOR,
            signPlsql: microprocessesClosedQuestionIf.SIGNO_PLSQL,
            nomenclatorId: microprocessesClosedQuestionIf.ID_NOMENCLADOR,
            nomenclatureId: microprocessesClosedQuestionIf.ID_NOMENCLATURA,
            approved: !!microprocessesClosedQuestionIf.SUPERVISADO,
            userCreator: microprocessesClosedQuestionIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesClosedQuestionIf.FECHA_ALTA),
            signJs: microprocessesClosedQuestionIf.SIGNO_JS
        }: {};
        return microprocessesClosedQuestionIf;
    }

    static async update(filters, params) {
        const formattedMicroprocessesClosedQuestionIf = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_OPERADOR: params.operatorId,
            SIGNO_PLSQL: trim(params.signPlsql),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: params.approved,
            SIGNO_JS: trim(params.signJs)
        };
        // eslint-disable-next-line max-len
        const microprocessesClosedQuestionIfId = await microprocessesClosedQuestionIfModel.updateOne({ ID_PREGUNTA_CERRADA: filters.id },
            formattedMicroprocessesClosedQuestionIf, ['ID_PREGUNTA_CERRADA']);
        // eslint-disable-next-line max-len
        const microprocessesClosedQuestionIf = await microprocessesClosedQuestionIfService.findOne({id: microprocessesClosedQuestionIfId});
        return microprocessesClosedQuestionIf;

    }
    static async delete({id}) {
        const ids = { ID_PREGUNTA_CERRADA: id};
        const success = await microprocessesClosedQuestionIfModel.delete(ids, {
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = microprocessesClosedQuestionIfModel.knex.select(columns)
                .from(microprocessesClosedQuestionIfModel.tableName)
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
                modified: 'CLASIFICADOR ID'
            },
            {
                original: 'ID_NOMENCLATURA',
                modified: 'NOMENCLATURA ID'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = microprocessesClosedQuestionIfService;
