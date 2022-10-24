const {DisciplineController} = include('controllers');

module.exports = router => {
    router.route('/')
        .post(DisciplineController.create);
    return router;
};
