const {FieldMaterialController} = include('controllers');
const {roles} = include('enums');

const {validateUserState} = require('../middlewares');
const {validateUserRole} = require('../middlewares');

module.exports = router => {
    router.get('/', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR]), FieldMaterialController.getFieldMaterials);
    router.get('/state/:state', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR]), validateUserState, FieldMaterialController.getFieldMaterialsByUps);
    router.get('/state/:state/ups/:ups', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR]), validateUserState, FieldMaterialController.getFieldMaterialsByArea);
    router.get('/state/:state/ups/:ups/area/:area', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR]), validateUserState, FieldMaterialController.getFieldMaterialsByStateUpsArea);
    return router;
};
