const {Nomenclatures} = include('models');
const { nomenclaturesAttrib } = include('constants/staticData');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class NomenclatureService {
    static async fetchStaticNomenclatures() {
        const nomenclatures = await Nomenclatures.findAll(nomenclaturesAttrib);
        return nomenclatures.map(nomenclature => ({
            id: nomenclature.ID_NOMENCLATURA,
            shortDescription: nomenclature.ABREVIATURA,
            description: nomenclature.DESCRIPCION
        }));
    }
    static async getNomenclatureData(resources){
        const nomenclaturesIds = compact(uniq(map(resources, resource => resource.nomenclatureId)));
        if(isEmpty(nomenclaturesIds)){
            return resources;
        }
        let nomenclatures = await Nomenclatures.findByValues('ID_NOMENCLATURA', nomenclaturesIds);
        nomenclatures = map(nomenclatures, nomenclature => ({
            id: nomenclature.ID_NOMENCLATURA,
            shortDescription: nomenclature.ABREVIATURA,
            description: nomenclature.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.nomenclature = find(
                nomenclatures,
                nomenclature => nomenclature.id === resource.nomenclatureId
            );
            return resource;
        });
    }
}

module.exports = NomenclatureService;