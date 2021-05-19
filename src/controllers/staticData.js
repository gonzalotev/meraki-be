const {
    RolesService,
    DictionaryTypeService,
    StaticalVariableService,
    StaticDataService,
    OperativesService
} = include('services');

class StaticDataController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {
                roles,
                dictionaryTypes,
                variables,
                genders,
                operatives
            } = req.query;
            if(roles) {
                await RolesService.shortFetch(data);
            }
            if (dictionaryTypes) {
                await DictionaryTypeService.shortFetch(data);
            }
            if(variables){
                await StaticalVariableService.shortFetch(data);
            }
            if(genders){
                await StaticDataService.getGenders(data);
            }
            if(operatives){
                await OperativesService.shortFetch(data);
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = StaticDataController;
