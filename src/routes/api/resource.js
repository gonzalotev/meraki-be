const {ResourceController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(ResourceController.fetchResource);
    router.route('/image')
        .post(ResourceController.imageCreate);
    router.route('/image/:id')
        .put(ResourceController.imageUpdate)
        .delete(ResourceController.deleteImage);
    return router;
};
