const {Nomenclators} = include('models');
const { nomenclatorsAttrib } = include('constants/staticData');

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
}

module.exports = NomenclatorService;
