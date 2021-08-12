const { NomenclaturesController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NomenclaturesController.fetchStaticNomenclatures)
        .post(NomenclaturesController.create);
    router.route('/downloadCsv').get(NomenclaturesController.downloadCsv);
    router.route('/:nomenclatureId/:nomenclatorId');
    //  .get(NomenclaturesController.find)
    //  .put(NomenclaturesController.update)
    //  .delete(NomenclaturesController.delete);
    return router;
};
