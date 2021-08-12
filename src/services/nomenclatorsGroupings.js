const {NomenclatorsGroupings} = include('models');
const { nomenclatorsGroupingsAttrib } = include('constants/staticData');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');

class NomenclatorsGroupingService {
    static async fetchStaticNomenclatorsGroupings() {
        const nomenclatorsGroupings = await NomenclatorsGroupings.findAll(nomenclatorsGroupingsAttrib);
        return nomenclatorsGroupings.map(nomenclatorsGrouping => ({
            nomenclatorId: nomenclatorsGrouping.ID_NOMENCLADOR,
            groupId: nomenclatorsGrouping.ID_AGRUPACION,
            description: nomenclatorsGrouping.DESCRIPCION
        }));
    }
    static async getNomenclatorsGroupingsData(resources){
        const nomenclatorsIds = uniq(map(resources, resource => resource.groupId));
        let nomenclators = await NomenclatorsGroupings.findByValues('ID_AGRUPACION', nomenclatorsIds);
        nomenclators = map(nomenclators, nomenclator => ({
            nomenclatorId: nomenclator.ID_NOMENCLADOR,
            groupId: nomenclator.ID_AGRUPACION,
            description: nomenclator.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.nomenclatorGrouping = find(
                nomenclators, nomenclatorGrouping => nomenclatorGrouping.groupId === resource.groupId);
            return resource;
        });
    }
}

module.exports = NomenclatorsGroupingService;
