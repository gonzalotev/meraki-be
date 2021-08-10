const {MicroprocessesListsIfWordsController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(MicroprocessesListsIfWordsController.fetch)
        .post(MicroprocessesListsIfWordsController.create);
    router.route('/downloadCsv').get(MicroprocessesListsIfWordsController.downloadCsv);
    router.route('/:idLists/:idOrder')
        .get(MicroprocessesListsIfWordsController.find)
        .put(MicroprocessesListsIfWordsController.update)
        .delete(MicroprocessesListsIfWordsController.delete);                
    return router;
};