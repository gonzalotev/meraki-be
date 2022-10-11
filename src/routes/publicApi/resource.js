const {ResourceController} = include('controllers');

module.exports = router => {
    router.route('/:id')
        .get(ResourceController.fetchResource);
    return router;
};
