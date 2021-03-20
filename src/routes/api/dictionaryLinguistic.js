const { DictionaryLinguisticController } = include('controllers');

module.exports = router => {
    router.route('/').get(DictionaryLinguisticController.fetch);

    return router;
};
