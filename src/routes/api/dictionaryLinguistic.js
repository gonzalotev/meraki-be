const { DictionaryLinguisticController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DictionaryLinguisticController.fetch)
        .post(DictionaryLinguisticController.create);
    router.route('/:originalDescription/:dictionaryTypeId/:variableId')
        .put(DictionaryLinguisticController.update)
        .get(DictionaryLinguisticController.find)
        .delete(DictionaryLinguisticController.delete);
    return router;
};
