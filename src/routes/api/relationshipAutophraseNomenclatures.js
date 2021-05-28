const {RelationshipAutophraseNomenclatureController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(RelationshipAutophraseNomenclatureController.fetch)
        .post(RelationshipAutophraseNomenclatureController.create);
    router.route('/:id')
        .get(RelationshipAutophraseNomenclatureController.find)
        .put(RelationshipAutophraseNomenclatureController.update)
        .delete(RelationshipAutophraseNomenclatureController.delete);
    return router;
};
