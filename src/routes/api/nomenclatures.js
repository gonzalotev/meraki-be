const {NomenclaturesController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(NomenclaturesController.fetch)
        .post(NomenclaturesController.create);
    router.route('/downloadCsv').get(NomenclaturesController.downloadCsv);
    router.route('/:nomenclatorId/:nomenclatureId')
        .get(NomenclaturesController.find)
        .put(NomenclaturesController.update)
        .delete(NomenclaturesController.delete);
    return router;
};
