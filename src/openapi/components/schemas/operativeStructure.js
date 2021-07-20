module.exports = {
    type: 'object',
    properties: {
        operativeId: {
            type: 'integer',
            nullable: false
        },
        structureId: {
            type: 'integer',
            nullable: false
        },
        originalName: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        entryFieldNameId: {
            type: 'string',
            maxLength: 30,
            nullable: false
        },
        originalAuxiliaryFieldId: {
            type: 'string',
            maxLength: 30,
            nullable: true
        },
        finalAuxiliaryFieldId: {
            type: 'string',
            maxLength: 30,
            nullable: false
        },
        variableDescription: {
            type: 'string',
            maxLength: 100,
            nullable: true
        },
        shouldDisplayAuxiliary: {type: 'boolean'},
        isPartOfTheId: {
            type: 'boolean',
            nullable: false
        },
        datatypeId: {
            type: 'string',
            maxLength: 1,
            nullable: false
        },
        dataSize: {
            type: 'integer',
            nullable: false
        },
        hasDecimals: {type: 'boolean'},
        decimals: { type: 'integer'},
        initialPosition: {
            type: 'integer',
            nullable: false
        },
        finalPosition: {
            type: 'integer',
            nullable: false
        },
        shouldDataBeConverted: {type: 'boolean'},
        observation: {
            type: 'string',
            maxLength: 120,
            nullable: true
        },
        domain: {
            type: 'string',
            maxLength: 300,
            nullable: true
        },
        sourceId: {
            type: 'number',
            nullable: true
        },
        questionId: {
            type: 'number',
            nullable: true
        },
        userCreator: {
            type: 'string',
            maxLength: 50
        },
        createdAt: {
            type: 'string',
            format: 'date',
            nullable: true
        },
        userDeleted: {
            type: 'string',
            maxLength: 50,
            nullable: true
        },
        deletedAt: {
            type: 'string',
            format: 'date',
            nullable: true
        }
    }
};
