const linguisticDictionaryTableName = 'DICCIONARIO_LINGUISTICO';

const linguisticDictionaryAttrib = [
    'DESCRIPCION_ORIGINAL',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'ID_VARIABLE',
    'DESCRIPCION_DESTINO',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const dictionaryTypeTableName = 'TIPOS_DE_DICCIONARIO_LINGUISTICO';

const dictionaryTypeAttrib = [
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'DESCRIPCION',
    'SI_PALABRA_NO_FRASE_ORIGEN',
    'SI_DESCRIPCION_DESTINO',
    'SI_PALABRA_NO_FRASE_DESTINO',
    'EXPRESION_REGULAR',
    'VALIDACION',
    'SUPERVISADO',
    'DOMINIO',
    'OBSERVACION',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const operativesTableName = 'OPERATIVOS';

const operativesAttrib = [
    'ID_OPERATIVO',
    'ID_FUENTE',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'FECHA_LLEGADA_OPERATIVO',
    'TOTAL_REGISTROS_OPERATIVO',
    'CONTACTO_OPERATIVO',
    'MAIL_CONTACTO',
    'FECHA_INICIO_CODIFICACION',
    'FECHA_FIN_CODIFICACION',
    'FECHA_INICIO_ENTREGA',
    'FECHA_INICIO_BORRADO',
    'FECHA_FIN_BORRADO',
    'CALIDAD_TOTAL_OPERATIVO',
    'NIVEL_ERROR_OPERATIVO',
    'ID_USUARIO',
    'FECHA_ALTA'
];

const staticalVariableTableName = 'VARIABLES_ESTADISTICAS';

const staticalVariableAttrib = [
    'ID_VARIABLE',
    'NOMBRE',
    'ABREVIATURA',
    'DIGITOS',
    'SUPERVISADO',
    'DOMINIO',
    'OBSERVACION',
    'ID_PADRE',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const networkTypeTableName = 'TIPOS_DE_RED';

const networkTypeAttrib = [
    'ID_TIPO_RED',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const assignmentRolesTableName = 'ROLES_SICI';

const datesAttrib = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA'
};

const assignmentRolesAttrib = [
    'ID_USUARIO',
    'ID_ROL_USUARIO',
    'DESCRIPCION',
    'DOMINIO',
    'OBSERVACION',
    'FECHA_BAJA',
    'FECHA_ALTA'
];

const rolesTypeTableName = 'TIPOS_DE_ROLES';

const rolesTypeAttrib = [
    'ID_ROL_USUARIO',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA',
    'FECHA_ALTA'
];

const lotsTableName = 'LOTES';

const lotsAttrib = [
    'ID_OPERATIVO',
    'ID_LOTE',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'NOMBRE_ARCHIVO',
    'FORMATO_ARCHIVO',
    'CANTIDAD_DE_REGISTROS',
    'FECHA_CARGA_DATOS_LOTE',
    'FECHA_FIN_CARGA_DATOS_LOTE',
    'CALIDAD_LOTE_TOTAL',
    'NIVEL_ERROR_LOTE_TOTAL',
    'LOTE_RECHAZADO',
    'FECHA_LOTE_RECHAZADO',
    'LOTE_APROBADO',
    'FECHA_LOTE_APROBADO',
    'SE_RETROALIMENTA',
    'FECHA_INICIO_RETROALIMENTACION',
    'FECHA_FIN_RETROALIMENTACION',
    'LOTE_ENTREGADO_AREA',
    'FECHA_ENTREGA_AREA',
    'LOTE_ENTREGADO_A_DATA_LAKE',
    'FECHA_INICIO_A_DATA_LAKE',
    'FECHA_FIN_A_DATA_LAKE',
    'LOTE_DE_RESGUARDO_O_COPIA',
    'FECHA_BAJADA_LOTE_RESGUARDO_O_COPIA',
    'SE_BORRA_TODO_EL_LOTE',
    'FECHA_INICIO_BORRADO',
    'FECHA_FIN_BORRADO',
    'ID_USUARIO',
    'FECHA_ALTA'
];

const datesWithUserAttrib = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_FIN_BORRADO',
    userCreator: 'ID_USUARIO'
};

const variablesAttrib = [
    'ID_ROL_USUARIO',
    'ID_OPERATIVO',
    'ID_LOTE',
    'ID_VARIABLE',
    'OBSERVACION',
    'DOMINIO',
    'SI_NO'
];

const assignmentRoleNomenclatorsTableName = 'RELACION_ROLES_USUARIOS_NOMENCLADORES';

const assignmentRoleNomenclatorsAttrib = [
    'ID_USUARIO',
    'ID_ROL_USUARIO',
    'ID_NOMENCLADOR',
    'DOMINIO',
    'OBSERVACION',
    'SI_NO',
    'FECHA_ALTA',
    'FECHA_BAJA'
];

const assignmentRoleOperativeVariableTableName = 'RELACION_ROLES_OPERATIVOS_VARIABLES';

const assignmentRoleOperativeVariableAttrib = [
    'ID_USUARIO',
    'ID_ROL_USUARIO',
    'ID_OPERATIVO',
    'ID_LOTE',
    'ID_VARIABLE',
    'OBSERVACION',
    'DOMINIO',
    'SI_NO',
    'FECHA_ALTA',
    'FECHA_BAJA'
];

const nomenclatorsTableName = 'NOMENCLADORES';
const nomenclatorsAttrib = [
    'ID_NOMENCLADOR',
    'SIGLA',
    'DESCRIPCION_ABREVIADA',
    'DOMINIO',
    'OBSERVACION',
    'TOTAL_DE_DIGITOS',
    'CANTIDAD_NIVELES',
    'ID_TIPO',
    'ID_SUBTIPO',
    'FECHA_INICIO_IMPLEMENTACION',
    'FECHA_FIN_IMPLEMENTACION',
    'FECHA_INICIO_PUBLICACION',
    'FECHA_FIN_PUBLICACION',
    'FECHA_INICIO_OFICIAL',
    'FECHA_FIN_OFICIAL',
    'FECHA_INICIO_ACTUALIZACION',
    'FECHA_FIN_ACTUALIZACION',
    'CLASIFICADOR_OFICIAL',
    'CLASIFICADOR_NACIONAL',
    'CLASIFICADOR_INTERNACIONAL',
    'CLASIFICADOR_EXTERNO',
    'ID_TIPO_CLASIFICADOR',
    'COEFICIENTE',
    'EN_CONSTRUCCION',
    'PRUEBA_PILOTO',
    'USO_INTERNO',
    'HABILITADO',
    'IDIOMA_CASTELLANO',
    'FRACCIONADO_EN_PALABRAS',
    'IDIOMA_INGLES',
    'ID_USUARIO',
    'FECHA_ALTA'
];

const chatTypeTableName = 'TIPOS_DE_CHAT';
const chatTypeAttrib = [
    'ID_TIPO_CHAT',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const questionTypeTableName = 'TIPOS_DE_PREGUNTA';
const questionTypeAttrib = [
    'ID_ABIERTA_CERRADA',
    'DESCRIPCION'
];

const specialPhraseTypeTableName = 'TIPOS_DE_FRASES_ESPECIALES';
const specialPhraseTypeAttrib = [
    'ID_TIPO_FRASE_ESPECIAL',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const classifierTypeTableName = 'TIPOS_DE_CLASIFICADOR';
const classifierTypeAttrib = [
    'ID_TIPO_CLASIFICADOR',
    'ABREVIATURA',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const relationTypeTableName = 'TIPOS_DE_RELACION';
const relationTypeAttrib = [
    'ID_TIPO_RELACION',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const documentTypeTableName = 'TIPOS_DE_DOCUMENTOS';
const documentTypeAttrib = [
    'ID_TIPO_DOCUMENTO',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const newWordTableName = 'NUEVAS_FRASES';
const newWordAttrib = [
    'ID_OPERATIVO',
    'ID_VARIABLE',
    'NUEVAS_PALABRAS',
    'FRECUENCIAS',
    'ABC',
    'CORREGIDA',
    'FECHA_ALTA_PALABRA'
];

const nomenclatorSubtypeTableName = 'SUBTIPO_DE_NOMENCLADOR';
const nomenclatorSubtypeAttrib = [
    'ID_TIPO',
    'ID_SUBTIPO',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const editorTableName = 'EDITORES';
const editorAttrib = [
    'ID_EDITOR',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const typesSpecialPhrasesTableName = 'TIPOS_DE_FRASES_ESPECIALES';

const typesSpecialPhrasesAttrib = [
    'ID_TIPO_FRASE_ESPECIAL',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA',
    'FECHA_ALTA'
];

const nomenclatorTypesTableName = 'TIPOS_DE_NOMENCLADOR';
const nomenclatorTypesAttrib = [
    'ID_TIPO',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

const dictionaryLinguisticTableName = 'DICCIONARIO_LINGUISTICO';
const dictionaryLinguisticAttrib = [
    'DESCRIPCION_ORIGINAL',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'ID_VARIABLE',
    'DESCRIPCION_DESTINO',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];
const autoPhrasesTableName = 'AUTOFRASES';
const autoPhrasesAttrib = [
    'ID_AUTOFRASE',
    'ID_VARIABLE',
    'FRASE_FINAL',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'FRASE_RETROALIMENTADA_SI_NO',
    'FECHA_RETROALIMENTACION',
    'ID_DEPENDE_ID_AUTOFRASE',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];
const wordsDictionaryTableName = 'DICCIONARIO_DE_PALABRAS';
const wordsDictionaryAttrib = [
    'PALABRA',
    'TRUNCADO',
    'ACRONIMO',
    'VERBO',
    'SUSTANTIVO',
    'ADJETIVO',
    'ADVERBIO',
    'PRONOMBRE',
    'ARTICULO',
    'PREPOSICION',
    'PALABRA_DUDOSA',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'FUNCION_DE_HASH',
    'HASH',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_GENERO_NUMERO',
    'ID_NUMERO',
    'FRECUENCIA',
    'ABC',
    'FAMILIA'
];
const autoPhraseClosedQuestionTableName = 'AUTOFRASES_PREGUNTA_CERRADA';
const autoPhraseClosedQuestionAttrib = [
    'ID_AUTOFRASE',
    'ID_FUENTE',
    'ID_PREGUNTA',
    'ABREVIATURA',
    'OBSERVACION',
    'DOMINIO',
    'ID_NOMENCLADOR',
    'ID_NOMENCLATURA',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA'
];

const autoPhraseNomenclatureRelationTableName = 'RELACION_NOMENCLATURA_AUTOFRASE';
const autoPhraseNomenclatureRelationAttrib = [
    'ID_NOMENCLADOR',
    'ID_NOMENCLATURA',
    'ID_AUTOFRASE',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

module.exports = {
    linguisticDictionaryTableName,
    linguisticDictionaryAttrib,
    operativesAttrib,
    operativesTableName,
    staticalVariableAttrib,
    staticalVariableTableName,
    rolesTypeTableName,
    rolesTypeAttrib,
    assignmentRolesTableName,
    assignmentRolesAttrib,
    datesAttrib,
    datesWithUserAttrib,
    lotsAttrib,
    lotsTableName,
    variablesAttrib,
    assignmentRoleNomenclatorsTableName,
    assignmentRoleNomenclatorsAttrib,
    assignmentRoleOperativeVariableTableName,
    assignmentRoleOperativeVariableAttrib,
    nomenclatorsAttrib,
    nomenclatorsTableName,
    chatTypeAttrib,
    chatTypeTableName,
    specialPhraseTypeTableName,
    specialPhraseTypeAttrib,
    relationTypeTableName,
    relationTypeAttrib,
    documentTypeTableName,
    documentTypeAttrib,
    nomenclatorSubtypeTableName,
    nomenclatorSubtypeAttrib,
    editorTableName,
    editorAttrib,
    nomenclatorTypesTableName,
    nomenclatorTypesAttrib,
    typesSpecialPhrasesTableName,
    typesSpecialPhrasesAttrib,
    classifierTypeTableName,
    classifierTypeAttrib,
    questionTypeTableName,
    questionTypeAttrib,
    networkTypeTableName,
    networkTypeAttrib,
    dictionaryTypeTableName,
    dictionaryTypeAttrib,
    dictionaryLinguisticTableName,
    dictionaryLinguisticAttrib,
    autoPhrasesTableName,
    autoPhrasesAttrib,
    newWordAttrib,
    newWordTableName,
    wordsDictionaryTableName,
    wordsDictionaryAttrib,
    autoPhraseClosedQuestionTableName,
    autoPhraseClosedQuestionAttrib,
    autoPhraseNomenclatureRelationTableName,
    autoPhraseNomenclatureRelationAttrib

};
