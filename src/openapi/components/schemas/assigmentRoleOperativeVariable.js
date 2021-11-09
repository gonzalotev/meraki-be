module.exports = {
    type: 'object',
    properties: {
        roleId: {
            type: 'string',
            nullable: false
        },
        userId: {
            type: 'string',
            nullable: false
        },
        operativeId: {
            type: 'number',
            nullable: false
        },
        lotId: {
            type: 'number',
            nullable: false
        },
        variableId: {
            type: 'string',
            nullable: false
        },
        domain: {
            type: 'string',
            maxLength: 300
        },
        observation: {
            type: 'string',
            maxLength: 120
        },
        yesNo: {type: 'boolean'},
        userName: {type: 'string'},
        createdAt: {
            type: 'string',
            nullable: true
        },
        deletedAt: {
            type: 'string',
            nullable: true
        },
        operative: {type: 'string'},
        lot: {type: 'string'},
        variable: {type: 'string'}
    }
};
