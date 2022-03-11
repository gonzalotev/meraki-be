const knex = include('helpers/database');
const NomenclatorService = require('./nomenclators');
const LotsService = require('./lots');
const map = require('lodash/map');

class StaticDataService {
    static async getGenders(data) {
        const genders = await knex
            .select({
                id: 'ID_GENERO_NUMERO',
                description: 'DESCRIPCION'
            })
            .from('GENERO_Y_NUMERO');
        return (data.genders = genders);
    }
    static async getNewWord(data) {
        const newWoord = await knex
            .select({
                id_operative: 'ID_OPERATIVO',
                id_variable: 'ID_VARIABLE',
                news_words: 'NUEVAS_PALABRAS',
                frequence: 'FRECUENCIAS',
                abc: 'ABC',
                corrected: 'CORREGIDA'
            })
            .from('NUEVAS_PALABRAS');
        return (data.newWoord = newWoord);
    }
    static async getAutoPhrase(data) {
        const autoPhrase = await knex
            .select({
                id: 'ID_AUTOFRASE',
                id_variable: 'ID_VARIABLE',
                name: 'FRASE_FINAL'
            })
            .from('AUTOFRASES');
        return (data.autoPhrase = autoPhrase);
    }
    static async getNewPhrase(data) {
        const newPhrases = await knex
            .select({
                operative: 'ID_OPERATIVO',
                variable: 'ID_VARIABLE',
                name: 'NUEVAS_PALABRAS',
                phrase: 'NUEVAS_FRASES'
            })
            .from('NUEVAS_FRASES');
        return (data.newPhrases = newPhrases);
    }
    static async getNomenclators(data) {
        const nomenclators = await knex.select({
            id: 'ID_NOMENCLADOR',
            description: 'DESCRIPCION_COMPLETA',
            initials: 'SIGLA'
        })
            .from('NOMENCLADORES')
            .where({})
            .orderBy([{column: 'DESCRIPCION_COMPLETA', order: 'asc'}]);
        data.nomenclators = nomenclators;
        return data;
    }
    static async getLots(data, lotsFilter) {
        const lots = await knex
            .select({
                id: 'ID_LOTE',
                description: 'DESCRIPCION'
            })
            .where(LotsService.formatData(lotsFilter.where))
            .orderByRaw('upper(DESCRIPCION) asc')
            .from('LOTES');
        return (data.lots = lots);
    }
    static async getFont(data) {
        const fonts = await knex
            .select({
                id: 'ID_FUENTE',
                questionId: 'ID_PREGUNTA',
                openClosedId: 'ID_ABIERTA_CERRADA',
                codWord: 'CODIGO_PREGUNTA',
                variableId: 'ID_VARIABLE'
            })
            .from('RELACION_FUENTE_PREGUNTAS');
        return (data.fonts = fonts);
    }
    static async getNomenclatures(data, filter=null) {
        const nomenclatures = await knex
            .select({
                id: 'ID_NOMENCLATURA',
                nomenclatorId: 'ID_NOMENCLADOR',
                description: 'DESCRIPCION'
            })
            .where(function() {
                if(filter && filter.nomenclatorId && filter.amountOfDigits) {
                    this
                        .where('ID_NOMENCLADOR', filter.nomenclatorId)
                        .andWhereRaw(`LENGTH(ID_NOMENCLATURA) = ${filter.amountOfDigits}`);
                } else if (filter && filter.nomenclatorId) {
                    this
                        .where('ID_NOMENCLADOR', filter.nomenclatorId);
                }
                if(filter && filter.nomenclatorId) {
                    this
                        .where('ID_NOMENCLADOR', filter.nomenclatorId);
                }
            })
            .from('NOMENCLATURAS')
            .orderByRaw('upper(DESCRIPCION) asc');
        return (data.nomenclatures = nomenclatures);
    }
    static async getNomenclatorsGroup(data) {
        const nomenclatorsGroup = await knex
            .select({
                nomenclatorId: 'ID_NOMENCLADOR',
                groupId: 'ID_AGRUPACION',
                description: 'DESCRIPCION'
            })
            .from('AGRUPACIONES_NOMENCLADOR')
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.nomenclatorsGroup = nomenclatorsGroup;
        return data;
    }
    static async getNomenclaturesGroup(data) {
        const nomenclaturesGroup = await knex.select({
            nomenclatorId: 'ID_NOMENCLADOR',
            groupId: 'ID_AGRUPACION',
            nomenclatureGroupId: 'ID_NOMENCLATURA_AGRUPACION',
            abbreviation: 'ABREVIATURA',
            description: 'DESCRIPCION'
        })
            .from('AGRUPACIONES_NOMENCLATURA')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.nomenclaturesGroup = nomenclaturesGroup;
        return data;
    }
    static async getRelationshipGroup(data) {
        const relationshipGroup = await knex.select({
            nomenclatorId: 'ID_NOMENCLADOR',
            groupId: 'ID_AGRUPACION',
            nomenclatureGroupId: 'ID_NOMENCLATURA_AGRUPACION',
            nomenclatureId: 'ID_NOMENCLATURA'
        })
            .from('AGRUPACIONES_RELACION')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'ID_NOMENCLATURA_AGRUPACION', order: 'asc'}]);
        data.relationshipGroup = relationshipGroup;
        return data;
    }
    static async getSources(data) {
        const sources = await knex.select({
            id: 'ID_FUENTE',
            name: 'NOMBRE',
            initials: 'SIGLA'
        })
            .from('FUENTES_OPERATIVO')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'NOMBRE', order: 'asc'}]);
        data.sources = sources;
        return data;
    }
    static async getLot(data) {
        const lot = await knex.select({
            id: 'ID_LOTE',
            description: 'DESCRIPCION'
        })
            .from('LOTES')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'ID_LOTE', order: 'asc'}]);
        data.lot = lot;
        return data;
    }
    static async getEditors(data) {
        const editors = await knex.select({
            editorId: 'ID_EDITOR',
            description: 'DESCRIPCION'
        })
            .from('EDITORES')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.editors = editors;
        return data;
    }

    static async getMicroprocessQuestionsClosedData(data) {
        const microprocessQuestionsClosed = await knex.select({
            id: 'ID_PREGUNTA_CERRADA',
            description: 'DESCRIPCION'
        })
            .from('MICROPROCESOS_PREGUNTA_CERRADA_IF')
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.microprocessQuestionsClosed = microprocessQuestionsClosed;
        return data;
    }

    static async getDocumentsTypes(data) {
        const documentsTypes = await knex.select({
            documentTypeId: 'ID_TIPO_DOCUMENTO',
            description: 'DESCRIPCION'
        })
            .from('TIPOS_DE_DOCUMENTOS')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.documentsTypes = documentsTypes;
        return data;
    }
    static async getQuestions(data) {
        const questions = await knex.select({
            id: 'ID_PREGUNTA',
            question: 'PREGUNTA'
        })
            .from('PREGUNTAS')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'PREGUNTA', order: 'asc'}]);
        data.questions = questions;
        return data;
    }
    static async getQuestionsTypes(data) {
        const questionsTypes = await knex.select({
            id: 'ID_ABIERTA_CERRADA',
            description: 'DESCRIPCION'
        })
            .from('TIPOS_DE_PREGUNTA')
            .orderBy([{column: 'ID_ABIERTA_CERRADA', order: 'asc'}]);
        data.questionsTypes = questionsTypes;
        return data;
    }
    static async getOperativeType(data){
        const operativeType = await knex.select({
            id: 'ID_TIPO_OPERATIVO',
            description: 'DESCRIPCION'
        })
            .from('TIPOS_DE_OPERATIVO')
            .orderBy([{column: 'ID_TIPO_OPERATIVO', order: 'asc'}]);
        data.operativeType = operativeType;
        return operativeType;
    }
    static async getOperators(data){
        const operators = await knex.select({
            id: 'ID_OPERADOR',
            description: 'DESCRIPCION',
            plSqlSign: 'SIGNO_PLSQL',
            jsSign: 'SIGNO_JS'
        })
            .from('OPERADORES')
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.operators = operators;
        return operators;
    }
    static async getFrequency(data){
        const frequency = await knex.select({
            id: 'ID_FRECUENCIA',
            description: 'DESCRIPCION'
        })
            .from('FRECUENCIAS')
            .orderBy([{column: 'ID_FRECUENCIA', order: 'asc'}]);
        data.frequency = frequency;
        return frequency;
    }
    static async getSupport(data){
        const support = await knex.select({
            id: 'ID_SOPORTE',
            description: 'DESCRIPCION'
        })
            .from('SOPORTE')
            .orderBy([{column: 'ID_SOPORTE', order: 'asc'}]);
        data.support = support;
        return support;
    }
    static async getTicketTypes(data){
        const ticketTypes = await knex.select({
            id: 'ID_TIPO_CHAT',
            description: 'DESCRIPCION'
        })
            .from('TIPOS_DE_CHAT')
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.ticketTypes = ticketTypes;
        return ticketTypes;
    }
    static async getOperatives(data){
        const operatives = await knex.select({
            id: 'ID_OPERATIVO',
            description: 'DESCRIPCION'
        })
            .from('OPERATIVOS')
            .where({FECHA_BAJA: null})
            .orderByRaw('upper(DESCRIPCION) asc');
        data.operatives = operatives;
        return operatives;
    }
    static async getLevels(data, filters){
        data.levels = {nomenclators: [], digits: []};
        if(filters.nomenclators) {
            data.levels.nomenclators = await NomenclatorService.fetchIfExist(
                {tableName: 'NIVEL'},
                'ID_NOMENCLADOR',
                {FECHA_BAJA: null}
            );
        }
        if(filters.digits) {
            const { nomenclatorId } = filters;
            let whereFilter = {FECHA_BAJA: null};
            if (nomenclatorId) {
                whereFilter = {FECHA_BAJA: null, ID_NOMENCLADOR: nomenclatorId};
            }
            data.levels.digits = await knex.select({
                amountOfDigits: 'ID_CANTIDAD_DIGITOS',
                description: 'DESCRIPCION'
            })
                .from('NIVEL')
                .where(whereFilter);
        }
        return data;
    }

    static async getRelationshipAutophrasesLetter(data, filters){
        data.relationshipAutophrasesLetter = {nomenclators: [], nomenclatorGrouping: [], nomenclatureGrouping: []};
        if(filters.nomenclators) {
            data.relationshipAutophrasesLetter.nomenclators = await NomenclatorService.fetchIfExist(
                {tableName: 'RELACION_AGRUPACIONES_AUTOFRASES'},
                'ID_NOMENCLADOR',
                {FECHA_BAJA: null}
            );
        }
        if(filters.nomenclatorGrouping) {
            const { nomenclatorId } = filters;
            let whereFilter = {FECHA_BAJA: null};
            if (nomenclatorId) {
                whereFilter = {ID_NOMENCLADOR: nomenclatorId};
            }
            data.relationshipAutophrasesLetter.nomenclatorGrouping = await knex.select({
                nomenclatorId: 'ID_NOMENCLADOR',
                groupId: 'ID_AGRUPACION',
                description: 'DESCRIPCION'
            })
                .from('AGRUPACIONES_NOMENCLADOR')
                .where(whereFilter);
        }
        if(filters.nomenclatureGrouping) {
            const { nomenclatorId, groupId } = filters;
            let whereFilter = {FECHA_BAJA: null};
            if (nomenclatorId && groupId) {
                whereFilter = {ID_NOMENCLADOR: nomenclatorId, ID_AGRUPACION: groupId};
            }
            data.relationshipAutophrasesLetter.nomenclatureGrouping = await knex.select({
                nomenclatorId: 'ID_NOMENCLADOR',
                groupId: 'ID_AGRUPACION',
                nomenclatureGroupId: 'ID_NOMENCLATURA_AGRUPACION',
                description: 'DESCRIPCION',
                abbreviation: 'ABREVIATURA'
            })
                .from('AGRUPACIONES_NOMENCLATURA')
                .where(whereFilter)
                .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        }
        return data;
    }

    static async getMicroprocessesBySteps(data){
        const microprocesses = await knex.select({
            id: 'ID_MICROPROCESO',
            description: 'DESCRIPCION',
            nomenclatorId: 'ID_NOMENCLADOR',
            amountOfDigits: 'ID_CANTIDAD_DIGITOS',
            variableId: 'ID_VARIABLE',
            dictionaryTypologyId: 'ID_TIPOLOGIA_DE_DICCIONARIO'
        })
            .from('MICROPROCESOS')
            .whereExists(function() {
                this.select('*')
                    .from('MICROPROCESOS_PASOS')
                    .whereRaw('MICROPROCESOS.id_microproceso = MICROPROCESOS_PASOS.id_microproceso');
            })
            .orderBy([{column: 'ID_MICROPROCESO', order: 'asc'}]);
        data.microprocessesBySteps = microprocesses;
        return data;
    }

    static async getEntryFieldsNames(data){
        const entryFieldsNames = await knex.select({
            id: 'ID_NOMBRE_CAMPO_ENTRADA'
        })
            .from('DATOS_DE_ENTRADA_CAMPOS')
            .orderBy([{column: 'ID_NOMBRE_CAMPO_ENTRADA', order: 'asc'}]);
        data.entryFieldsNames = entryFieldsNames;
        return data;
    }
    static async getOriginalAuxiliariesFields(data){
        const originalAuxiliariesFields = await knex.select({
            id: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL'
        })
            .from('PROCESAMIENTOS_CAMPOS_AUXILIARES_ORIGINAL')
            .orderBy([{column: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL', order: 'asc'}]);
        data.originalAuxiliariesFields = originalAuxiliariesFields;
        return data;
    }
    static async getFinalAuxiliariesFields(data){
        const finalAuxiliariesFields = await knex.select({
            id: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL'
        })
            .from('PROCESAMIENTOS_CAMPOS_AUXILIARES_FINAL')
            .orderBy([{column: 'ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL', order: 'asc'}]);
        data.finalAuxiliariesFields = finalAuxiliariesFields;
        return data;
    }
    static async getDatatypes(data){
        const datatypes = await knex.select({
            id: 'ID_TIPO_DE_DATO',
            abbreviation: 'ABREVIATURA'
        })
            .from('TIPOS_DE_DATOS')
            .orderBy([{column: 'ABREVIATURA', order: 'asc'}]);
        data.datatypes = datatypes;
        return data;
    }
    static async getPointersStepTo(data, filter){
        let pointersStepTo = await knex.raw(`select mpp.id_puntero
            from microprocesos_pasos_puntero mpp
            minus
            select mp.voy_a
            from microprocesos_pasos mp
            where mp.id_microproceso = ?`, [filter.microprocessId]);
        pointersStepTo = map(pointersStepTo, value => ({ id: value.ID_PUNTERO }));
        data.pointersStepTo = pointersStepTo;
        return data;
    }
    static async getPointersStepIn(data, filter){
        let pointersStepIn = await knex.raw(`select mp.voy_a
        from microprocesos_pasos mp
        where mp.id_microproceso = ?
        minus
        select mp.estoy_en
        from microprocesos_pasos mp
        where mp.id_microproceso = ?`, [filter.microprocessId, filter.microprocessId]);
        pointersStepIn = map(pointersStepIn, value => ({ id: value.VOY_A }));
        data.pointersStepIn = pointersStepIn;
        return data;
    }
    static async getMicroprocesses(data){
        const microprocesses = await knex.select({
            id: 'ID_MICROPROCESO',
            description: 'DESCRIPCION',
            nomenclatorId: 'ID_NOMENCLADOR',
            amountOfDigits: 'ID_CANTIDAD_DIGITOS',
            variableId: 'ID_VARIABLE',
            dictionaryTypologyId: 'ID_TIPOLOGIA_DE_DICCIONARIO'
        })
            .from('MICROPROCESOS')
            .orderBy([{column: 'ID_MICROPROCESO', order: 'asc'}]);
        data.microprocesses = microprocesses;
        return data;
    }
    static async getLinguisticFieldProcesses(data){
        const linguisticFieldProcesses = await knex.select({
            id: 'ID_NOMBRE_CAMPO_LINGUISTICO',
            dataType: 'TIPO_DATO'
        })
            .from('PROCESOS_LINGUISTICOS_CAMPOS')
            .orderBy([{column: 'ID_NOMBRE_CAMPO_LINGUISTICO', order: 'asc'}]);
        data.linguisticFieldProcesses = linguisticFieldProcesses;
        return data;
    }
    static async getMicroprocessesLists(data, filter = null){
        const microprocessesLists = await knex.select({
            id: 'ID_LISTAS',
            description: 'DESCRIPCION'
        })
            .from('MICROPROCESOS_LISTAS_IF')
            .where(function() {
                if(filter && filter.variableId && filter.dictionaryTypologyId) {
                    this
                        .where('ID_VARIABLE', filter.variableId)
                        .andWhere('ID_TIPOLOGIA_DE_DICCIONARIO', filter.dictionaryTypologyId);
                }
            })
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}]);
        data.microprocessesLists = microprocessesLists;
        return data;
    }
    static async getVariablesByOperative(data, filter) {
        const staticalVariables = await knex.raw(`
            select ve.ID_VARIABLE, ve.NOMBRE, ve.ABREVIATURA
            from variables_estadisticas ve
            where exists (
                select rfp.*
                from relacion_fuente_preguntas rfp
                where rfp.id_variable = ve.id_variable
                and exists (
                    select eo.*
                    from estructura_operativo eo
                    where eo.id_operativo = ?
                    and rfp.id_fuente = eo.id_fuente
                    and rfp.id_pregunta = eo.id_pregunta
                )
            )
            order by upper(ve.NOMBRE) asc
        `, [filter.operativeId]);
        const variables = staticalVariables.map(staticalVariable => ({
            id: staticalVariable.ID_VARIABLE,
            name: staticalVariable.NOMBRE,
            abbreviation: staticalVariable.ABREVIATURA
        }));
        return data.variablesByOperative = variables;
    }
}

module.exports = StaticDataService;
