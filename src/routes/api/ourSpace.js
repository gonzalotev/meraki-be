const {ourSpaceController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ourSpaceController.fetch)
        .post(ourSpaceController.create);
    router.route('/:idregist')
        .get(ourSpaceController.find)
        .put(ourSpaceController.update)
        .delete(ourSpaceController.delete);
    return router;
};
