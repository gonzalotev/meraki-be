module.exports = {
    type: 'object',
    properties: {
        NOMBRE: {
            type: 'string',
            nullable: false
        },
        ABREVIATURA: {
            type: 'string',
            nullable: false
        },
        ID_VARIABLE: {
            type: 'string',
            nullable: false
        },
        DIGITOS: {
            type: 'integer',
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
        ID_USUARIO: {
            type: 'integer',
            nullable: false
        },
        ID_PADRE: {
            type: 'string',
            nullable: false
        }
    }
};
