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

const assignmentRolesTableName = 'ROLES_SICI';

const datesAttrib = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA'
};

const assignmentRolesAttrib = {
    userId: 'ID_USUARIO',
    roleId: 'ID_ROL_USUARIO',
    description: 'DESCRIPCION',
    domain: 'DOMINIO',
    observation: 'OBSERVACION'
};

const rolesTableName = 'TIPOS_DE_ROLES';

const rolesAttrib = [
    'ID_ROL_USUARIO',
    'DESCRIPCION',
    'OBSERVACION',
    'DOMINIO',
    'ID_USUARIO_ALTA',
    'ID_USUARIO_BAJA',
    'FECHA_BAJA',
    'FECHA_ALTA'
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

const lotsTableName = 'LOTES';

const lotsAttrib = {
    operativeId: 'ID_OPERATIVO',
    lotId: 'ID_LOTE',
    description: 'DESCRIPCION'
};
const datesWithUserAttrib = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_FIN_BORRADO',
    userCreator: 'ID_USUARIO'
};

const variablesAttrib = {
    roleId: 'ID_ROL_USUARIO',
    operativeId: 'ID_OPERATIVO',
    lotId: 'ID_LOTE',
    variableId: 'ID_VARIABLE',
    observation: 'OBSERVACION',
    domain: 'DOMINIO',
    isSupervised: 'SI_NO'
};

const nomenclatorsAttrib = {
    roleId: 'ID_ROL_USUARIO',
    nomenclatorId: 'ID_NOMENCLADOR',
    domain: 'DOMINIO',
    observation: 'OBSERVACION',
    isSupervised: 'SI_NO'
};

module.exports = {
    dictionaryLinguisticTableName,
    dictionaryLinguisticAttrib,
    operativesAttrib,
    operativesTableName,
    staticalVariableAttrib,
    staticalVariableTableName,
    rolesTableName,
    rolesAttrib,
    variableOperatingRoleTableName,
    variableOperatingRoleAttrib,
    assignmentRolesTableName,
    assignmentRolesAttrib,
    datesAttrib,
    datesWithUserAttrib,
    lotsAttrib,
    lotsTableName,
    variablesAttrib,
    nomenclatorsAttrib
};
