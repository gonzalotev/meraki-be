const linguisticDictionaryHeaders = [
    'DESCRIPCION_ORIGINAL',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'ID_VARIABLE',
    'DESCRIPCION_DESTINO',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO'
];
const wordCorrectorHeaders = [
    'INCORRECTA',
    'CORRECTA',
    'DESTINO_PALABRA_FRASE_SI_NO',
    'OBSERVACION',
    'SUPERVISADO',
    'FRECUENCIA'
];

const sourceQuestionsRelationsHeaders = [
    'ID_FUENTE',
    'ID_PREGUNTA',
    'CODIGO_PREGUNTA',
    'ID_VARIABLE',
    'ID_NOMENCLADOR',
    'ID_ABIERTA_CERRADA',
    'ES_OBLIGATORIA_SI_NO',
    'SE_CODIFICA_SI_NO',
    'ES_AUXILIAR_SI_NO',
    'PASAR_A_PROCESAMIENTO_SI_NO',
    'NECESITA_AUXILIARES_SI_NO',
    'AUTOFRASE_LEER_SI_NO',
    'OBSERVACION',
    'DOMINIO'
];

module.exports = {
    linguisticDictionaryHeaders,
    wordCorrectorHeaders,
    sourceQuestionsRelationsHeaders
};
