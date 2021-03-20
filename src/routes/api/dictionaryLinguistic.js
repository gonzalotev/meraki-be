const { DictionaryLinguisticController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DictionaryLinguisticController.fetch)
        .post(DictionaryLinguisticController.create)
        .put(DictionaryLinguisticController.update)
        .delete(DictionaryLinguisticController.delete);

    return router;
};
