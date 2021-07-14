const { DictionaryLinguisticController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DictionaryLinguisticController.fetch)
        .post(DictionaryLinguisticController.create)
        .put(DictionaryLinguisticController.update);
    router.route('/downloadCsv').get(DictionaryLinguisticController.downloadCsv);
    router.route('/:originalDescription/:dictionaryTypeId/:variableId')
        .get(DictionaryLinguisticController.find)
        .delete(DictionaryLinguisticController.delete);
    return router;
};
