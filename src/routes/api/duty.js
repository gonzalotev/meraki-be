const {DutyController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(DutyController.fetch);
    return router;
};
