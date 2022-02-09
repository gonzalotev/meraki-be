const {UniqueWordsAndPhrasesController} = include('controllers');

module.exports = router => {
    router.route('/getLotsVariables').get(UniqueWordsAndPhrasesController.getLotsVariables);
    router.route('/runProcess/:operativeId/:lotId/:variableId').post(UniqueWordsAndPhrasesController.runProcess);
    return router;
};
