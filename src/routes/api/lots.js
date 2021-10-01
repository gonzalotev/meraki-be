const {LotsController} = include('controllers');
const { LotsService, OperativeStructureService } = include('services');
const DBF = require('stream-dbf');
const knex = include('helpers/database');
const head = require('lodash/head');
const forEach = require('lodash/forEach');
const toUpper = require('lodash/toUpper');

module.exports = router => {
    router.route('/')
        .get(LotsController.fetch)
        .post(LotsController.validateFile, LotsController.create, LotsController.saveLotFile);
    router.route('/loadData').post(async function(req, res, next){
        let inserts = [];
        const batches = [];
        const {lot} = req.body;
        const foundLot = await LotsService.findOne({ ...lot });
        const operativeStructure = await OperativeStructureService.fetch({operative: lot.operativeId});
        const file = `${foundLot.fileName}.${foundLot.fileFormat}`;
        const parser = new DBF(`${abs_root_path('public')}/lots/${file}`);
        const stream = parser.stream;
        const transaction = await knex.transaction();
        stream.on('data', function(record) {
            const valueToInset = {
                ID_LOTE: lot.lotId,
                ID_OPERATIVO: lot.operativeId
            };
            forEach(
                operativeStructure,
                structure => valueToInset[toUpper(structure.entryFieldNameId)] = record[structure.originalName]
            );
            inserts.push(valueToInset);
            if(inserts.length === 1000) {
                batches.push(transaction('DATOS_ENTRADA').insert([...inserts]));
                inserts = [];
            }
        });
        stream.on('end', async function() {
            try{
                batches.push(transaction('DATOS_ENTRADA').insert([...inserts]));
                await Promise.all(batches);
                const { totalRecord } = head(await transaction('DATOS_ENTRADA').count('* as totalRecord').where({
                    ID_LOTE: lot.lotId,
                    ID_OPERATIVO: lot.operativeId
                }));
                if(foundLot.numberOfRecords === totalRecord) {
                    await transaction.commit();
                } else {
                    await transaction.rollback();
                }
                res.send({ file });
            } catch(error) {
                next(error);
            }
        });
    });
    router.route('/:id')
        .get(LotsController.fetchOne)
        .put(LotsController.validateFile, LotsController.update, LotsController.saveLotFile)
        .delete(LotsController.delete);
    return router;
};
