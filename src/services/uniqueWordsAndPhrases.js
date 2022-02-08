const knex = include('helpers/database');
const { dateTimeToString } = include('util');
const map = require('lodash/map');

class UniqueWordsAndPhrases {
    static async getLotsVariables() {
        const lotsVariables = await knex.select({
            operativeId: 'LOTES_VARIABLES.ID_OPERATIVO',
            operativeDescription: 'OPERATIVOS.DESCRIPCION',
            sourceId: 'FUENTES_OPERATIVO.ID_FUENTE',
            sourceInitials: 'FUENTES_OPERATIVO.SIGLA',
            lotId: 'LOTES_VARIABLES.ID_LOTE',
            lotDescription: 'LOTES.DESCRIPCION',
            variableId: 'LOTES_VARIABLES.ID_VARIABLE',
            variableName: 'VARIABLES_ESTADISTICAS.NOMBRE',
            linguisticEndDate: 'LOTES_VARIABLES.FECHA_FIN_LINGUISTICO',
            observation: 'LOTES_VARIABLES.OBSERVACION',
            uniquePhrasesRecords: 'LOTES_VARIABLES.REGISTROS_FRASES_UNICAS',
            uniqueWordsRecords: 'LOTES_VARIABLES.REGISTROS_PALABRAS_UNICAS',
            processTotalTime: 'LOTES_VARIABLES.TIEMPO_TOTAL_FRASES_UNICAS'
        })
            .from('LOTES_VARIABLES')
            .innerJoin('OPERATIVOS', 'LOTES_VARIABLES.ID_OPERATIVO', 'OPERATIVOS.ID_OPERATIVO')
            .innerJoin('FUENTES_OPERATIVO', 'FUENTES_OPERATIVO.ID_FUENTE', 'OPERATIVOS.ID_FUENTE')
            .innerJoin('LOTES', 'LOTES.ID_LOTE', 'LOTES_VARIABLES.ID_LOTE')
            .innerJoin('VARIABLES_ESTADISTICAS', 'VARIABLES_ESTADISTICAS.ID_VARIABLE', 'LOTES_VARIABLES.ID_VARIABLE');

        return map(lotsVariables, lotVariable => ({
            ...lotVariable,
            linguisticEndDate: dateTimeToString(lotVariable.linguisticEndDate)
        }));
    }

    static async runProcess({ operativeId, lotId, variableId }) {
        const transaction = await knex.transaction();

        await transaction.raw(
            `begin
                CORRER_PROCESOS_FRASES_PALABRAS_UNICAS(?, ?, ?);
            end;`,
            [operativeId, lotId, variableId]
        );

        await transaction.commit();
        return true;
    }
}

module.exports = UniqueWordsAndPhrases;
