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

const assignmentStaticalVariableTableName = 'VARIABLES_ESTADISTICAS';

const assignmentStaticalVariableAttrib = [
    'ID_VARIABLE',
    'NOMBRE',
    'ABREVIATURA',
    'DIGITOS',
    'SUPERVISADO',
    'DOMINIO',
    'OBSERVACION',
    'ID_PADRE',
    'ID_USUARIO',
    'FECHA_ALTA'
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

const lotsTableName = 'LOTES';

const lotsAttrib = [
    'ID_OPERATIVO',
    'ID_LOTE',
    'DESCRIPCION'
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
    'SI_NO'
];

module.exports = {
    dictionaryLinguisticTableName,
    dictionaryLinguisticAttrib,
    operativesAttrib,
    operativesTableName,
    assignmentStaticalVariableAttrib,
    assignmentStaticalVariableTableName,
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
    assignmentRoleNomenclatorsTableName,
    assignmentRoleNomenclatorsAttrib
};
