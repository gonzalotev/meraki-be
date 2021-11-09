const Assigment = require('./assigment');
const DictionaryLinguistic = require('./dictionaryLinguistic');
const Error = require('./error');
const Files = require('./files');
const Lots = require('./lots');
const Nomenclators = require('./nomenclators');
const Operatives = require('./operatives');
const Profile = require('./profile');
const Roles = require('./roles');
const StatisticalVariable = require('./statisticalVariable');
const Success = require('./success');
const User = require('./user');
const ValidateToken = require('./validateToken');
const NomenclatorTypes = require('./nomenclatorTypes');
const RelationshipTypes = require('./relationshipTypes');
const AutoPhrase = require('./autoPhrase');
const AutoPhraseClosedQuestion = require('./autoPhraseClosedQuestion');
const AutoPhraseNomenclatureRelation = require('./autoPhraseNomenclatureRelation');
const MicroprocessesListsIfWords = require('./microprocessesListsIfWords');
const WordCorrector = require('./wordCorrector');
const SourceQuestionRelation = require('./sourceQuestionRelation');
const OperativeSources = require('./operativeSources');
const RelationshipAutophraseQuestionClosed = require('./relationshipAutophraseQuestionClosed');
const StepsEncodingProcesses = require('./stepsEncodingProcesses');
const OperativeStructure = require('./operativeStructure');
const MicroprocessDefinition = require('./microprocessDefinition');
const StepsLinguisticProcesses = require('./stepsLinguisticProcesses');
const Documents = require('./documents');
const MicroprocessesStepsOption = require('./microprocessesStepsOptions');
const MicroprocessStep = require('./microprocessStep');
const AssigmentRoleOperativeVariable = require('./assigmentRoleOperativeVariable');

module.exports = {
    ArrayString: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'string'}
    },
    ArrayNumber: {
        type: 'array',
        uniqueItems: true,
        items: {type: 'integer'}
    },
    ids: {
        type: 'array',
        uniqueItems: true,
        items: {
            type: 'string',
            format: 'uuid'
        }
    },
    ProfileUser: {
        allOf: [{$ref: '#/components/schemas/User'}],
        type: 'object',
        required: [
            'roles'
        ],
        properties: {
            role: {
                type: 'array',
                items: {type: 'string'}
            },
            attributes: {type: 'object'}
        }
    },
    Assigment,
    DictionaryLinguistic,
    Error,
    Files,
    Lots,
    Nomenclators,
    Operatives,
    Profile,
    Roles,
    StatisticalVariable,
    Success,
    User,
    ValidateToken,
    NomenclatorTypes,
    RelationshipTypes,
    AutoPhrase,
    AutoPhraseClosedQuestion,
    AutoPhraseNomenclatureRelation,
    WordCorrector,
    MicroprocessesListsIfWords,
    SourceQuestionRelation,
    OperativeSources,
    RelationshipAutophraseQuestionClosed,
    StepsEncodingProcesses,
    OperativeStructure,
    MicroprocessDefinition,
    StepsLinguisticProcesses,
    Documents,
    MicroprocessesStepsOption,
    MicroprocessStep,
    AssigmentRoleOperativeVariable
};
