const {RelationshipAutophrasesNomenclatureController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipAutophrasesNomenclatureController.fetch)
        .post(RelationshipAutophrasesNomenclatureController.create);
    router.route('/:id')
        .get(RelationshipAutophrasesNomenclatureController.find)
        .put(RelationshipAutophrasesNomenclatureController.update)
        .delete(RelationshipAutophrasesNomenclatureController.delete);
    return router;
};
