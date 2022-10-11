const {TimetableController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(TimetableController.fetch);
    return router;
};
