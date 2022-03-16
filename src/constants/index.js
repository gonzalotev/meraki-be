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
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA'
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
const rolesTableName = 'ROLES_SICI';

const rolesAttrib = [
    'ID_USUARIO',
    'ID_ROL_USUARIO',
    'DESCRIPCION',
    'DOMINIO',
    'OBSERVACION',
    'FECHA_BAJA',
    'FECHA_ALTA',
    'NOMBRE_USUARIO'
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
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_ALTA',
    'ID_USUARIO_BAJA'
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
    'FECHA_BAJA',
    'NOMBRE_USUARIO',
    'CLASIFICADOR'
];

const relationshipAutophrasesQuestionClosedsTableName = 'AUTOFRASES_PREGUNTA_CERRADA';

const relationshipAutophrasesQuestionClosedsAttrib = [
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
    'FECHA_ALTA'
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
    'FECHA_BAJA',
    'NOMBRE_USUARIO',
    'VARIABLE',
    'OPERATIVO',
    'LOTE'
];

const nomenclatorsTableName = 'NOMENCLADORES';
const nomenclatorsAttrib = [
    'ID_NOMENCLADOR',
    'SIGLA',
    'DESCRIPCION_ABREVIADA',
    'DESCRIPCION_COMPLETA',
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
    'ID_TIPO_ORGANIZACION',
    'TIENE_COEFICIENTE',
    'EN_CONSTRUCCION',
    'PRUEBA_PILOTO',
    'USO_INTERNO',
    'HABILITADO',
    'IDIOMA_CASTELLANO',
    'FRACCIONADO_EN_PALABRAS',
    'IDIOMA_INGLES',
    'FECHA_ALTA',
    'ID_USUARIO_ALTA'
];

const ticketTypeTableName = 'TIPOS_DE_CHAT';
const ticketTypeAttrib = [
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

const nomenclatorsGroupingsTableName = 'AGRUPACIONES_NOMENCLADOR';
const nomenclatorsGroupingsAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'DESCRIPCION',
    'DOMINIO',
    'TOTAL_DE_DIGITOS',
    'CANTIDAD_DE_NIVELES',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'OBSERVACION'
];

const nomenclaturesGroupingsTableName = 'AGRUPACIONES_NOMENCLATURA';
const nomenclaturesGroupingsAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'ID_NOMENCLATURA_AGRUPACION',
    'ABREVIATURA',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_PADRE_NOMENCLADOR',
    'ID_PADRE_AGRUPACION',
    'ID_PADRE_NOMENCLATURA_AGRUPACION',
    'FRACCIONADO_DE_PALABRAS',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const specialPhraseTypeTableName = 'TIPOS_DE_FRASES_ESPECIALES';
const specialPhraseTypeAttrib = [
    'ID_TIPO_FRASE_ESPECIAL',
    'DESCRIPCION',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const organizationTypeTableName = 'TIPOS_DE_ORGANIZACION';
const organizationTypeAttrib = [
    'ID_TIPO_ORGANIZACION',
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

const newWordTableName = 'NUEVAS_PALABRAS';
const newWordAttrib = [
    'ID_OPERATIVO',
    'ID_VARIABLE',
    'NUEVAS_PALABRAS',
    'FRECUENCIAS',
    'ABC',
    'CORREGIDA',
    'FECHA_ALTA'
];

const newPhraseTableName = 'NUEVAS_FRASES';
const newPhraseAttrib = [
    'ID_OPERATIVO',
    'ID_VARIABLE',
    'NUEVAS_PALABRAS',
    'ID_FRASE',
    'NUEVAS_FRASES',
    'FRECUENCIAS',
    'ABC',
    'CORREGIDA',
    'FECHA_ALTA'
];

const wordCorrectorTableName = 'CORRECTOR_DE_PALABRAS';
const wordCorrectorAttrib = [
    'INCORRECTA',
    'CORRECTA',
    'DESTINO_PALABRA_FRASE_SI_NO',
    'OBSERVACION',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FRECUENCIA'
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
    'FRASE_ORIGINAL',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'FRASE_RETROALIMENTADA_SI_NO',
    'FECHA_RETROALIMENTACION',
    'ID_DEPENDE_ID_AUTOFRASE',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FRASE_ESPECIAL_O_GENERAL',
    'ORDEN',
    'ID_NOMENCLADOR',
    'CANTIDAD_DE_NOMENCLATURAS',
    'CANTIDAD_DE_AGRUPACIONES'
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
    'FAMILIA',
    'INTERJECCION',
    'CONJUNCION',
    'NOMBRE',
    'APELLIDO',
    'MARCA',
    'RAZON_SOCIAL',
    'PRODUCTO',
    'OTRAS_CATEGORIAS'
];

const relationshipQuestionClosedNomenclaturesTableName = 'RELACION_NOMENCLATURAS_PREGUNTAS_CERRADAS';
const relationshipQuestionClosedNomenclaturesAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'ID_PREGUNTA_CERRADA',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'SUPERVISADO'
];

const relationshipQuestionClosedLetterTableName = 'RELACION_AGRUPACIONES_PREGUNTAS_CERRADAS';
const relationshipQuestionClosedLetterAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'ID_NOMENCLATURA_AGRUPACION',
    'ID_PREGUNTA_CERRADA',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'SUPERVISADO'
];

const relationshipAutoPhraseLetterTableName = 'RELACION_AGRUPACIONES_AUTOFRASES';
const relationshipAutoPhraseLetterAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'ID_NOMENCLATURA_AGRUPACION',
    'ID_AUTOFRASE',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'SUPERVISADO'
];

const relationshipAutoPhraseNomenclatureTableName = 'RELACION_NOMENCLATURA_AUTOFRASE';
const relationshipAutoPhraseNomenclatureAttrib = [
    'ID_NOMENCLADOR',
    'ID_NOMENCLATURA',
    'ID_AUTOFRASE',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'AUTOFRASE',
    'NOMENCLATURA',
    'ID_VARIABLE',
    'ABREVIATURA',
    'VARIABLE_ESTADISTICA'
];

const operativeSourcesTableName = 'FUENTES_OPERATIVO';
const operativeSourcesAttrib = [
    'ID_FUENTE',
    'NOMBRE',
    'SIGLA',
    'ID_TIPO_OPERATIVO',
    'ID_FRECUENCIA',
    'ID_SOPORTE',
    'FECHA_DESDE',
    'FECHA_HASTA',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const sourceQuestionsRelationsTableName = 'RELACION_FUENTE_PREGUNTAS';
const sourceQuestionsRelationsAttrib = [
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
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const nomenclaturesTableName = 'NOMENCLATURAS';
const nomenclaturesAttrib = [
    'ID_NOMENCLADOR',
    'ID_NOMENCLATURA',
    'ABREVIATURA',
    'ORIGINAL',
    'DESCRIPCION',
    'FRACCIONADO_DE_PALABRAS',
    'SUPERVISADO',
    'COEFICIENTE',
    'ID_PADRE_NOMENCLADOR',
    'ID_PADRE_NOMENCLATURA',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ACRONIMO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA'
];

const operativeFontsTableName = 'FUENTES_OPERATIVO';
const operativeFontsAttrib = [
    'ID_FUENTE',
    'NOMBRE',
    'SIGLA',
    'ID_TIPO_OPERATIVO',
    'ID_FRECUENCIA',
    'ID_SOPORTE',
    'FECHA_DESDE',
    'FECHA_HASTA',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA'
];

const questionsTableName = 'PREGUNTAS';
const questionsAttrib = [
    'ID_PREGUNTA',
    'PREGUNTA',
    'SUPERVISADO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const chatTableName = 'CHAT';
const chatAttrib = [
    'ID_CHAT',
    'TABLA_ORIGEN',
    'TEXTO_CHAT_ORIGEN',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_USUARIO_RESPONSABLE',
    'TEXTO_SOLUCION',
    'ID_USUARIO_SOLUCION',
    'ID_TIPO_CHAT',
    'FECHA_SOLUCION',
    'SOLUCIONADO_SI_NO',
    'USUARIO',
    'FECHA_BAJA_SOLUCIONADO',
    'ID_USUARIO_BAJA'
];

const encodingProcessesTableName = 'PROCESOS_DE_CODIFICACION';
const encodingProcessesAttrib = [
    'ID_PROCESO_CODIFICACION',
    'DESCRIPCION',
    'AUTOMATICO_SI_NO',
    'PORCENTAJE_PARA_AUDITAR',
    'NIVEL_DE_ERROR_ACEPTABLE',
    'DOMINIO',
    'OBSERVACION',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const stepsEncodingProcessesTableName = 'PASOS_PROCESOS_CODIFICACION';
const stepsEncodingProcessesAttrib = [
    'ID_FUENTE',
    'ID_PREGUNTA',
    'ORDEN',
    'ID_PROCESO_CODIFICACION',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const runEncodingProcessesTableName = 'LOTES_VARIABLES';
const runEncodingProcessesAttrib = [
    'ID_OPERATIVO',
    'ID_LOTE',
    'ID_VARIABLE',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'FECHA_INICIO_LINGUISTICO',
    'FECHA_FIN_LINGUISTICO',
    'FECHA_INICIO_FRASES_UNICAS',
    'FECHA_FIN_FRASES_UNICAS',
    'FECHA_INICIO_CODIFICACION_AUTOMATICA',
    'FECHA_FIN_CODIFICACION_AUTOMATICA',
    'FECHA_INICIO_CODIFICACION_MANUAL',
    'FECHA_FIN_CODIFICACION_MANUAL',
    'FECHA_INICIO_SUPERVISADO_AUTOMATICO',
    'FECHA_FIN_SUPERVISADO_AUTOMATICO',
    'FECHA_INICIO_SUPERVISADO_MANUAL',
    'FECHA_FIN_SUPERVISADO_MANUAL',
    'TOTAL_REGISTROS_AUTOMATICO',
    'TOTAL_REGISTROS_MANUAL',
    'CALIDAD_CODIFICACION_AUTOMATICA',
    'CALIDAD_CODIFICACION_MANUAL',
    'LOTE_VARIABLE_RECHAZADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'SE_CODIFICA_SI_NO'
];

const microprocessesListsIfWordsTableName = 'MICROPROCESOS_LISTAS_IF_PALABRAS';
const microprocessesListsIfWordsAttrib = [
    'ID_LISTAS',
    'ID_ORDEN',
    'PALABRA_O_FRASE',
    'ES_PALABRA_O_FRASE',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const operativeStructureTableName = 'ESTRUCTURA_OPERATIVO';
const operativeStructureAttrib = [
    'ID_OPERATIVO',
    'ID_ESTRUCTURA',
    'NOMBRE_ORIGINAL',
    'ID_NOMBRE_CAMPO_ENTRADA',
    'ID_PROCESAMIENTO_CAMPO_AUXILIAR_ORIGINAL',
    'ID_PROCESAMIENTO_CAMPO_AUXILIAR_FINAL',
    'DESCRIPCION_VARIABLE',
    'SE_MUESTRA_EN_PANTALLA_AUXILIAR',
    'ES_PARTE_DEL_ID',
    'ID_TIPO_DE_DATO',
    'TAMANIO_DATO',
    'TIENE_DECIMALES',
    'DECIMALES',
    'POSICION_INICIAL',
    'POSICION_FINAL',
    'HAY_CONVERSION_DATO',
    'OBSERVACION',
    'DOMINIO',
    'ID_FUENTE',
    'ID_PREGUNTA',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA'
];

const microprocessDefinitionTableName = 'MICROPROCESOS';
const microprocessDefinitionAttrib = [
    'ID_MICROPROCESO',
    'ID_VARIABLE',
    'ORDEN',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'ID_NOMENCLADOR',
    'ID_CANTIDAD_DIGITOS',
    'CARGADO_COMPLETO_SI_NO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA'
];

const stepsLinguisticProcessesTableName = 'PASOS_PROCESOS_LINGUISTICOS';
const stepsLinguisticProcessesAttrib = [
    'ID_FUENTE',
    'ID_PREGUNTA',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'ORDEN',
    'ID_NOMBRE_CAMPO_LINGUISTICO',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const linguisticFieldProcessesTableName = 'PROCESOS_LINGUISTICOS_CAMPOS';
const linguisticFieldProcessesAttrib = [
    'ID_NOMBRE_CAMPO_LINGUISTICO',
    'TIPO_DATO'
];

const microprocessesListIfTablename = 'MICROPROCESOS_LISTAS_IF';
const microprocessesListIfAttrib = [
    'ID_LISTAS',
    'ID_VARIABLE',
    'DESCRIPCION',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const microprocessesClosedQuestionIfTablename = 'MICROPROCESOS_PREGUNTA_CERRADA_IF';
const microprocessesClosedQuestionIfAttrib = [
    'ID_PREGUNTA_CERRADA',
    'ID_FUENTE',
    'ID_PREGUNTA',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_OPERADOR',
    'SIGNO_PLSQL',
    'ID_NOMENCLADOR',
    'ID_NOMENCLATURA',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'SIGNO_JS'
];

const microprocessesOptionTablename = 'MICROPROCESOS_OPCION';
const microprocessesOptionAttrib = [
    'ID_MICROPROCESO',
    'ID_FUENTE',
    'ID_PREGUNTA',
    'ORDEN',
    'ABREVIATURA',
    'OBSERVACION',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const documentsTableName = 'DOCUMENTOS';
const documentsAttrib = [
    'ID_DOCUMENTO',
    'ID_TIPO_DOCUMENTO',
    'TITULO',
    'AUTOR',
    'INSTITUCION',
    'AREA',
    'FECHA_DOCUMENTO',
    'ISBN',
    'ID_EDITOR',
    'UBICACION_ARCHIVO',
    'RESUMEN',
    'URL',
    'COMENTARIO',
    'CANTIDAD_VISITAS',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const microprocessesStepsOptionTableName = 'MICROPROCESOS_PASOS_OPCION';
const microprocessesStepsOptionAttrib = [
    'ID_MICROPROCESO',
    'ID_ORDEN',
    'ID_FUENTE',
    'ID_PREGUNTA',
    'ORDEN',
    'ABREVIATURA',
    'OBSERVACION',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const microprocessesWordsTableName = 'MICROPROCESOS_PALABRAS';
const microprocessesWordsAttrib = [
    'ID_MICROPROCESO',
    'ID_ORDEN',
    'PALABRA_O_FRASE',
    'ES_PALABRA_O_FRASE',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO'
];

const microprocessStepsTableName = 'MICROPROCESOS_PASOS';
const microprocessStepsAttrib = [
    'ID_MICROPROCESO',
    'ID_ORDEN',
    'ESTOY_EN',
    'ID_NOMENCLADOR_NO',
    'ID_NOMENCLATURA_NO',
    'ID_LISTAS',
    'ID_PREGUNTA_CERRADA',
    'ID_NOMENCLADOR_SI',
    'ID_NOMENCLATURA_SI',
    'VOY_A',
    'VOY_A_DESTINO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA'
];

const closedQuestionsTableName = 'PREGUNTAS_CERRADAS';
const closedQuestionsAttrib = [
    'ID_PREGUNTA_CERRADA',
    'ID_FUENTE',
    'ID_PREGUNTA',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_OPERADOR',
    'SIGNO_PLSQL',
    'SIGNO_JS',
    'ID_NOMENCLADOR',
    'ID_NOMENCLATURA',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'ID_NOMENCLADOR_A_CODIFICAR',
    'CANTIDAD_DE_NOMENCLATURAS',
    'CANTIDAD_DE_AGRUPACIONES'
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
    rolesTableName,
    rolesAttrib,
    variablesAttrib,
    assignmentRoleNomenclatorsTableName,
    assignmentRoleNomenclatorsAttrib,
    assignmentRoleOperativeVariableTableName,
    assignmentRoleOperativeVariableAttrib,
    nomenclatorsAttrib,
    nomenclatorsTableName,
    nomenclatorsGroupingsTableName,
    nomenclatorsGroupingsAttrib,
    nomenclaturesGroupingsTableName,
    nomenclaturesGroupingsAttrib,
    ticketTypeAttrib,
    ticketTypeTableName,
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
    organizationTypeTableName,
    organizationTypeAttrib,
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
    wordCorrectorTableName,
    wordCorrectorAttrib,
    newPhraseTableName,
    newPhraseAttrib,
    operativeSourcesTableName,
    operativeSourcesAttrib,
    relationshipAutoPhraseNomenclatureTableName,
    relationshipAutoPhraseNomenclatureAttrib,
    relationshipAutophrasesQuestionClosedsTableName,
    relationshipAutophrasesQuestionClosedsAttrib,
    relationshipAutoPhraseLetterTableName,
    relationshipAutoPhraseLetterAttrib,
    relationshipQuestionClosedNomenclaturesTableName,
    relationshipQuestionClosedNomenclaturesAttrib,
    relationshipQuestionClosedLetterTableName,
    relationshipQuestionClosedLetterAttrib,
    sourceQuestionsRelationsTableName,
    sourceQuestionsRelationsAttrib,
    nomenclaturesTableName,
    nomenclaturesAttrib,
    operativeFontsTableName,
    operativeFontsAttrib,
    microprocessesListsIfWordsTableName,
    microprocessesListsIfWordsAttrib,
    questionsAttrib,
    questionsTableName,
    chatTableName,
    chatAttrib,
    encodingProcessesAttrib,
    encodingProcessesTableName,
    stepsEncodingProcessesTableName,
    stepsEncodingProcessesAttrib,
    operativeStructureTableName,
    operativeStructureAttrib,
    microprocessDefinitionTableName,
    microprocessDefinitionAttrib,
    stepsLinguisticProcessesTableName,
    stepsLinguisticProcessesAttrib,
    runEncodingProcessesTableName,
    runEncodingProcessesAttrib,
    linguisticFieldProcessesTableName,
    linguisticFieldProcessesAttrib,
    microprocessesListIfTablename,
    microprocessesListIfAttrib,
    microprocessesOptionTablename,
    microprocessesOptionAttrib,
    documentsTableName,
    documentsAttrib,
    microprocessesStepsOptionTableName,
    microprocessesStepsOptionAttrib,
    microprocessesWordsTableName,
    microprocessesWordsAttrib,
    microprocessesClosedQuestionIfTablename,
    microprocessesClosedQuestionIfAttrib,
    microprocessStepsTableName,
    microprocessStepsAttrib,
    closedQuestionsTableName,
    closedQuestionsAttrib
};
