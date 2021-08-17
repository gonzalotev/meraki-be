const {NomenclaturesGroupings} = include('models');
const { nomenclaturesGroupingsAttrib } = include('constants/staticData');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');

class NomenclaturesGroupingService {
    static async fetchStaticNomenclaturesGroupings() {
        const nomenclaturesGroupings = await NomenclaturesGroupings.findAll(nomenclaturesGroupingsAttrib);
        return nomenclaturesGroupings.map(nomenclaturesGroupin => ({
            nomenclatorId: nomenclaturesGroupin.ID_NOMENCLADOR,
            groupId: nomenclaturesGroupin.ID_AGRUPACION,
            nomenclatureGroupId: nomenclaturesGroupin.ID_NOMENCLATURA_AGRUPACION,
            abbreviature: nomenclaturesGroupin.ABREVIATURA,
            description: nomenclaturesGroupin.DESCRIPCION
        }));
    }
    static async getNomenclaturesGroupingsData(resources){
        const nomenclatorsIds = uniq(map(resources, resource => resource.nomenclatureGroupId));
        let nomenclators = await NomenclaturesGroupings.findByValues('ID_NOMENCLATURA_AGRUPACION', nomenclatorsIds);
        nomenclators = map(nomenclators, nomenclator => ({
            nomenclatorId: nomenclator.ID_NOMENCLADOR,
            groupId: nomenclator.ID_AGRUPACION,
            nomenclatureGroupId: nomenclator.ID_NOMENCLATURA_AGRUPACION,
            abbreviature: nomenclator.ABREVIATURA,
            description: nomenclator.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.nomenclatureGrouping = find(
                nomenclators, nomenclatureGrouping =>
                    nomenclatureGrouping.nomenclatureGroupId === resource.nomenclatureGroupId);
            return resource;
        });
    }
}

module.exports = NomenclaturesGroupingService;
