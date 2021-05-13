const { RolesService, DictionaryTypeService, StaticalVariableService } = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {roles, dictionaryTypes, variables} = req.query;
            if(roles) {
                await RolesService.shortFetch(data);
            }
            if (dictionaryTypes) {
                await DictionaryTypeService.shortFetch(data);
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
