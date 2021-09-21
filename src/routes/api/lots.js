const {LotsController} = include('controllers');
const { LotsService } = include('services');
const DBF = require('stream-dbf');
const knex = include('helpers/database');
const head = require('lodash/head');

module.exports = router => {
    router.route('/')
        .get(LotsController.fetch)
        .post(LotsController.create);
    router.route('/loadData').post(async function(req, res){
        const {lot} = req.body;
        const foundLot = await LotsService.findOne({ ...lot });
        const file = `${foundLot.fileName}.${foundLot.fileFormat}`;
        const parser = new DBF(`${abs_root_path('public')}/lots/${file}`);
        const stream = parser.stream;
        let count = 0;
        let inserts = [];
        const batches = [];
        const transaction = await knex.transaction();
        const { totalbefore } = head(await transaction('PRUEBA').count('* as totalbefore'));
        stream.on('data', function(record) {
            console.log(record);
            count++;
            inserts.push({
                ID: count, LOTID: lot.lotId, OPERATIVEID: lot.operativeId
            });
            if(inserts.length === 1000) {
                //batches.push(transaction.batchInsert('PRUEBA', [...inserts], 100).returning('ID'));
                batches.push(transaction('PRUEBA').insert([...inserts]));
                inserts = [];
            }
            res.write('adsdd');
            /*if(count < 5) {
                inserts.push({
                    ID: count, LOTID: lot.lotId, OPERATIVEID: lot.operativeId
                });
            } else if (count === 5) {
                //batches.push(transaction.batchInsert('PRUEBA', [...inserts], 100));
                batches.push(transaction('PRUEBA').insert([...inserts]))
                inserts = [];
            }*/
        });
        stream.on('end', async function() {
            batches.push(transaction('PRUEBA').insert([...inserts]));
            console.log('finish :)');
            await Promise.all(batches);
            console.log('finish Promise');
            const { total } = head(await transaction('PRUEBA').count('* as total'));
            console.log('finish total');
            if(foundLot.numberOfRecords === total) {
                console.log('es igual');
                await transaction.commit();
            } else {
                console.log('nop es igual');
                await transaction.rollback();
            }
            console.log('finish commit');
            console.log({
                count,
                total,
                totalEsperado: foundLot.numberOfRecords,
                totalbefore
            });
            /* res.send({
                file,
                count,
                total,
                totalEsperado: foundLot.numberOfRecords,
                totalbefore,
                foundLot
            });*/
        });
    });
    router.route('/:id')
        .get(LotsController.fetchOne)
        .put(LotsController.update)
        .delete(LotsController.delete);
    return router;
};
