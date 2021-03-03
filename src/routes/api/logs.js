const {LogController} = include('controllers');

module.exports = router => {
    router.post('/', LogController.getLogs);
    return router;
};
