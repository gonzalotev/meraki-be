const {lots: lotsModel} = include('models');
const { lotsAttrib } = include('constants/staticData');

class LotsService {
    static async fetchStaticLots() {
        const lots = await lotsModel.findAll(lotsAttrib);
        return lots.map(lot => ({
            id: lot.ID_LOTE,
            operativeId: lot.ID_OPERATIVO,
            description: lot.DESCRIPCION
        }));
    }
}

module.exports = LotsService;
