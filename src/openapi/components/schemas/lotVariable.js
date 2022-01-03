module.exports = {
    type: 'object',
    properties: {
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
        description: {
            type: 'string',
            maxLength: 120,
            nullable: false
        },
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
        standardizationStartDate: {
            type: 'string',
            nullable: true
        },
        standardizationEndDate: {
            type: 'string',
            nullable: true
        },
        correctorStartDate: {
            type: 'string',
            nullable: true
        },
        correctorEndDate: {
            type: 'string',
            nullable: true
        },
        totalStandardizationRecords: {
            type: 'number',
            nullable: true
        },
        totalCorrectorRecords: {
            type: 'number',
            nullable: true
        },
        standardizationTotalTime: {
            type: 'string',
            nullable: true
        },
        linguisticStartDate: {
            type: 'string',
            nullable: true
        },
        linguisticEndDate: {
            type: 'string',
            nullable: true
        },
        uniquePhrasesStartDate: {
            type: 'string',
            nullable: true
        },
        uniquePhrasesEndDate: {
            type: 'string',
            nullable: true
        },
        automaticCodingStartDate: {
            type: 'string',
            nullable: true
        },
        automaticCodingEndDate: {
            type: 'string',
            nullable: true
        },
        manualCodingStartDate: {
            type: 'string',
            nullable: true
        },
        manualCodingEndDate: {
            type: 'string',
            nullable: true
        },
        automaticSupervisionStartDate: {
            type: 'string',
            nullable: true
        },
        automaticSupervisionEndDate: {
            type: 'string',
            nullable: true
        },
        manualSupervisionStartDate: {
            type: 'string',
            nullable: true
        },
        manualSupervisionEndDate: {
            type: 'string',
            nullable: true
        },
        totalAutomaticRecords: {
            type: 'number',
            nullable: true
        },
        totalManualRecords: {
            type: 'number',
            nullable: true
        },
        automaticCodingQuality: {
            type: 'number',
            nullable: true
        },
        manualCodingQuality: {
            type: 'number',
            nullable: true
        },
        rejectedLotVariable: {
            type: 'boolean',
            nullable: true
        },
        linguisticRecordsProcessed: {
            type: 'number',
            nullable: true
        },
        nullLinguisticRecords: {
            type: 'number',
            nullable: true
        },
        uniquePhrasesRecords: {
            type: 'number',
            nullable: true
        },
        uniqueWordsRecords: {
            type: 'number',
            nullable: true
        },
        shouldBeEncode: {
            type: 'boolean',
            nullable: true
        },
        userId: {
            type: 'string',
            maxLength: 50,
            nullable: false
        },
        createdAt: {
            type: 'string',
            nullable: true
        }
    }
};
