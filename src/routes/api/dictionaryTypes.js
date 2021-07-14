const {DictionaryTypeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DictionaryTypeController.fetch)
        .post(DictionaryTypeController.create);
    router.route('/downloadCsv').get(DictionaryTypeController.downloadCsv);
    router.route('/:id')
        .get(DictionaryTypeController.find)
        .put(DictionaryTypeController.update)
        .delete(DictionaryTypeController.delete);
    return router;
};
