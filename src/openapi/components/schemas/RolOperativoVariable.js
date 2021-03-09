module.exports = {
    type: 'object',
    properties: {
        ID_ROL_USUARIO: {
            type: 'string',
            nullable: false
        },
        ID_OPERATIVO: {
            type: 'string',
            nullable: false
        },
        ID_VARIABLE: {
            type: 'string',
            nullable: false
        },
        ID_LOTE: {
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
        SI_NO: {
            type: 'integer',
            nullable: true
        },
        ID_USUARIO: {
            type: 'integer',
            nullable: false
        }
    }
};
