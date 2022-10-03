const {DutyController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DutyController.fetch)
        .post(DutyController.create);
    router.route('/:id')
        .get(DutyController.find)
        .put(DutyController.update)
        .delete(DutyController.delete);
    return router;
};
