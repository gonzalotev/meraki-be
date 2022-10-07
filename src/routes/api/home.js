const {HomeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(HomeController.fetch)
        .post(HomeController.create);
    router.route('/:id')
        .get(HomeController.find)
        .put(HomeController.update)
        .delete(HomeController.delete);
    return router;
};
