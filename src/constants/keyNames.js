const relationTypesKeyNames = {
    id: 'ID_TIPO_RELACION',
    description: 'DESCRIPCION',
    observation: 'OBSERVACION',
    domain: 'DOMINIO',
    approved: 'SUPERVISADO',
    createdAt: 'FECHA_ALTA',
    userCreator: 'ID_USUARIO_ALTA',
    userDeleted: 'ID_USUARIO_BAJA',
    deletedAt: 'FECHA_BAJA'
};

const dictionaryTypesKeyNames = {
    id: 'ID_TIPOLOGIA_DE_DICCIONARIO',
    description: 'DESCRIPCION',
    isOriginAWord: 'SI_PALABRA_NO_FRASE_ORIGEN',
    haveDesnityDescription: 'SI_DESCRIPCION_DESTINO',
    isDestinyAWord: 'SI_PALABRA_NO_FRASE_DESTINO',
    haveRegex: 'EXPRESION_REGULAR',
    validation: 'VALIDACION',
    approved: 'SUPERVISADO',
    domain: 'DOMINIO',
    observation: 'OBSERVACION',
    createdAt: 'FECHA_ALTA',
    userCreator: 'ID_USUARIO_ALTA',
    userDeleted: 'ID_USUARIO_BAJA',
    deletedAt: 'FECHA_BAJA'
};

module.exports = {
    relationTypesKeyNames,
    dictionaryTypesKeyNames
};
