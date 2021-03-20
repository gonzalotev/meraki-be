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

const operativesTableName = 'OPERATIVOS';

const operativesAttrib = [
    `${operativesTableName}.ID_OPERATIVO`,
    `${operativesTableName}.ID_FUENTE`,
    `${operativesTableName}.DESCRIPCION`,
    `${operativesTableName}.OBSERVACION`,
    `${operativesTableName}.DOMINIO`,
    `${operativesTableName}.FECHA_LLEGADA_OPERATIVO`,
    `${operativesTableName}.TOTAL_REGISTROS_OPERATIVO`,
    `${operativesTableName}.CONTACTO_OPERATIVO`,
    `${operativesTableName}.MAIL_CONTACTO`,
    `${operativesTableName}.FECHA_INICIO_CODIFICACION`,
    `${operativesTableName}.FECHA_FIN_CODIFICACION`,
    `${operativesTableName}.FECHA_INICIO_ENTREGA`,
    `${operativesTableName}.FECHA_INICIO_BORRADO`,
    `${operativesTableName}.FECHA_FIN_BORRADO`,
    `${operativesTableName}.CALIDAD_TOTAL_OPERATIVO`,
    `${operativesTableName}.NIVEL_ERROR_OPERATIVO`,
    `${operativesTableName}.ID_USUARIO`,
    `${operativesTableName}.FECHA_ALTA`
];

const staticalVariableTableName = 'VARIABLES_ESTADISTICAS';

const staticalVariableAttrib = [
    `${staticalVariableTableName}.ID_VARIABLE`,
    `${staticalVariableTableName}.NOMBRE`,
    `${staticalVariableTableName}.ABREVIATURA`,
    `${staticalVariableTableName}.DIGITOS`,
    `${staticalVariableTableName}.SUPERVISADO`,
    `${staticalVariableTableName}.DOMINIO`,
    `${staticalVariableTableName}.OBSERVACION`,
    `${staticalVariableTableName}.ID_PADRE`,
    `${staticalVariableTableName}.ID_USUARIO`,
    `${staticalVariableTableName}.FECHA_ALTA`
];

const roleTypeTableName = 'TIPOS_DE_ROLES';

const roleTypeAttrib = [
    `${roleTypeTableName}.ID_ROL_USUARIO`,
    `${roleTypeTableName}.DESCRIPCION`,
    `${roleTypeTableName}.OBSERVACION`,
    `${roleTypeTableName}.DOMINIO`
];

const variableOperatingRoleTableName = 'RELACION_ROLES_OPERATIVOS_VARIABLES';

const variableOperatingRoleAttrib = [
    `${variableOperatingRoleTableName}.ID_USUARIO`,
    `${variableOperatingRoleTableName}.ID_ROL_USUARIO`,
    `${variableOperatingRoleTableName}.ID_OPERATIVO`,
    `${variableOperatingRoleTableName}.ID_LOTE`,
    `${variableOperatingRoleTableName}.ID_VARIABLE`,
    `${variableOperatingRoleTableName}.OBSERVACION`,
    `${variableOperatingRoleTableName}.DOMINIO`,
    `${variableOperatingRoleTableName}.SI_NO`,
    `${variableOperatingRoleTableName}.FECHA_ALTA`,
    `${variableOperatingRoleTableName}.FECHA_BAJA`
];

const rolesTableName = 'ROLES_SICI';

module.export = {
    dictionaryLinguisticTableName,
    dictionaryLinguisticAttrib,
    operativesAttrib,
    operativesTableName,
    staticalVariableAttrib,
    staticalVariableTableName,
    roleTypeTableName,
    roleTypeAttrib,
    variableOperatingRoleTableName,
    variableOperatingRoleAttrib,
    rolesTableName
};
