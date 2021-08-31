const { microprocessesClosedQuestionIf: microprocessesClosedQuestionIfModel } = include('models');
const { dateToString, arrayToCsvFormat } = include('util');
const map = require('lodash/map');
const trim = require('lodash/trim');

class microprocessesClosedQuestionIfService {
    static async fetch(query) {
        console.log (query);
        const microprocessesClosedQuestionIfTypes = await microprocessesClosedQuestionIfModel.findByPage(
            query.page,
            {ID_PREGUNTA_CERRADA: query.id},
            microprocessesClosedQuestionIfModel.selectableProps,
            [{ column: 'ID_PREGUNTA_CERRADA', order: 'asc' }]
        );
        return microprocessesClosedQuestionIfTypes.map(microprocessesClosedQuestionIf => ({
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
            approved: microprocessesClosedQuestionIf.SUPERVISADO,
            userCreator: microprocessesClosedQuestionIf.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesClosedQuestionIf.FECHA_ALTA),
            signJs: microprocessesClosedQuestionIf.SIGNO_JS
        }));
    }
    static async getTotal(filters) {
        const total = await microprocessesClosedQuestionIfModel.countDocuments({ID_PREGUNTA_CERRADA: filters.id});
        return total['COUNT(*)'];
    }

    static async create(params, userCreator) {
        console.log(userCreator);
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
            approved: microprocessesClosedQuestionIf.SUPERVISADO,
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

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID PREGUNTA CERRADA',
                    nameInFile: 'ID PREGUNTA CERRADA'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = microprocessesClosedQuestionIfModel.knex.select(tableHeaders)
                .from(microprocessesClosedQuestionIfModel.tableName)
                .orderBy([{column: 'ID_PREGUNTA_CERRADA', order: 'asc'}])
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

module.exports = microprocessesClosedQuestionIfService;
