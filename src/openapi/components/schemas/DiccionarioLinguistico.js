module.exports = {
    type: 'object',
    properties : {
        DESCRIPCION_ORIGINAL: {
            type: 'string',
            nullable: false
        },
        ID_TIPOLOGIA_DE_DICCIONARIO: {
            type: 'string',
            nullable: false
        },
        ID_VARIABLE: {
            type: 'string',
            nullable: false
        },
        DESCRIPCION_DESTINO: {
            type: 'string',
            nullable: true
        },
        OBSERVACION: {
            type: 'string',
            nullable: true
        },
        DOMINIO: {
            type: 'string',
            nullable: true
        },
        SUPERVISADO: {
            type: 'integer',
            nullable: true
        },
        ID_USUARIO_ALTA: {
            type: 'integer',
            nullable: false
        }
    }
};
