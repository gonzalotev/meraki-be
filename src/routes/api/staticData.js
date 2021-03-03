const {StaticController} = include('controllers');

module.exports = router => {

    router.get('/', StaticController.getStaticData);

    return router;
};
