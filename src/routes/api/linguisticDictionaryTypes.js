const {LinguisticDictionaryTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(LinguisticDictionaryTypeController.fetch)
        .post(LinguisticDictionaryTypeController.create);
    router.route('/:id')
        .get(LinguisticDictionaryTypeController.find)
        .put(LinguisticDictionaryTypeController.update)
        .delete(LinguisticDictionaryTypeController.delete);
    return router;
};
