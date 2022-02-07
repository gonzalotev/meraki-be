const knex = include('helpers/database');

class UniqueWordsAndPhrases {
    static async getLotsVariables() {
        return await Promise.resolve([{saludo: 'hola mundo'}]);
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

    static async getTotalAccumulatedUniqueWordsPhrasesTime(lotId) {
        /* eslint-disable */ 
        const result = await knex.raw(`
            SELECT 
                TO_CHAR(TRUNC(segundos/3600),'FM9900') || 'hs:' ||
                TO_CHAR(TRUNC(MOD(segundos,3600)/60),'FM00') || 'min:' ||
                TO_CHAR(MOD(segundos,60),'FM00') || 'seg' suma_total_palabras_frases_unicas
            FROM (
                select horas*3600+minutos*60+segundos segundos
                from (
                    select
                        COALESCE(SUM(REGEXP_SUBSTR(REGEXP_SUBSTR(tiempo_total_palabras_frases_unicas, '\\d+hs'), '\\d+')), 0) horas,
                        COALESCE(SUM(REGEXP_SUBSTR(REGEXP_SUBSTR(tiempo_total_palabras_frases_unicas, '\\d+min'), '\\d+')), 0) minutos,
                        COALESCE(SUM(REGEXP_SUBSTR(REGEXP_SUBSTR(tiempo_total_palabras_frases_unicas, '\\d+seg'), '\\d+')), 0) segundos
                    from lotes_variables
                    where id_lote=?
                )
            )
        `, [lotId]);
        const totalAccumulatedUniqueWordsPhrasesTime = head(result).SUMA_TOTAL_PALABRAS_FRASES_UNICAS;
        return totalAccumulatedUniqueWordsPhrasesTime;
    }
}

module.exports = UniqueWordsAndPhrases;
