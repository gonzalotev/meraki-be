const {TicketController} = include('controllers');

module.exports = router => {
    router.route('/')
        .get(TicketController.fetch)
        .post(TicketController.create);
    router.route('/:id')
        .get(TicketController.find)
        .put(TicketController.update);
    return router;
};
