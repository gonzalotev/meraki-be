const {Nomenclators} = include('models');
const { nomenclatorsAttrib } = include('constants/staticData');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class NomenclatorService {
    static async fetchStaticNomenclators() {
        const nomenclators = await Nomenclators.findAll(nomenclatorsAttrib);
        return nomenclators.map(nomenclator => ({
            id: nomenclator.ID_NOMENCLADOR,
            initial: nomenclator.SIGLA,
            shortDescription: nomenclator.DESCRIPCION_ABREVIADA,
            longDescription: nomenclator.DESCRIPCION_COMPLETA
        }));
    }
    static async getNomenclatorData(resources){
        const nomenclatorsIds = compact(uniq(map(resources, resource => resource.nomenclatorId)));
        if(isEmpty(nomenclatorsIds)){
            return resources;
        }
        let nomenclators = await Nomenclators.findByValues('ID_NOMENCLADOR', nomenclatorsIds);
        nomenclators = map(nomenclators, nomenclator => ({
            id: nomenclator.ID_NOMENCLADOR,
            description: nomenclator.DESCRIPCION_COMPLETA,
            initials: nomenclator.SIGLA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.nomenclator = find(
                nomenclators,
                nomenclator => nomenclator.id === resource.nomenclatorId
            );
            return resource;
        });
    }
}

module.exports = NomenclatorService;
