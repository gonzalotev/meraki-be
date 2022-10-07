const {HomeController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(HomeController.fetch);
    return router;
};
