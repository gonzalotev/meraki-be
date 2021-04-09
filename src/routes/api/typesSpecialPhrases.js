const { TypesSpecialPhrasesController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(TypesSpecialPhrasesController.fetch)
        .post(TypesSpecialPhrasesController.create);

    router.route('/:id')
        .put(TypesSpecialPhrasesController.update)
        .get(TypesSpecialPhrasesController.find)
        .delete(TypesSpecialPhrasesController.delete);

    return router;
};
