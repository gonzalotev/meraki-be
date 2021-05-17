const { RolesService, NewWordService, DictionaryTypeService, StaticalVariableService } = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {roles, dictionaryTypes, variables, words} = req.query;
            if(roles) {
                await RolesService.shortFetch(data);
            }
            if (dictionaryTypes) {
                await DictionaryTypeService.shortFetch(data);
            }
            if (words) {
                await NewWordService.shortFetch(data);
            }
            if(variables){
                await StaticalVariableService.shortFetch(data);
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
