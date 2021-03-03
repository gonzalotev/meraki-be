const {FieldMaterialService} = include('services');
const {roles} = include('enums');

class FieldMaterialController {
    static async getFieldMaterials(req, res, next) {
        try {
            let state = req.query.state;
            if (
                [
                    roles.COORDINATOR,
                    roles.SUB_COORDINATOR
                ].includes(req.user.roles[0])
                && parseInt(req.query.state) != parseInt(req.user.attributes.stateId)
            ) {
                if (!req.query.state) {
                    state = req.user.attributes.stateId;
                }
                if (req.query.state) {
                    return res.sendStatus(403);
                }
            }

            res.send(await FieldMaterialService.getFieldMaterials({
                ...req.query,
                state
            }));
        } catch (err) {
            next(err);
        }
    }

    static async getFieldMaterialsByUps(req, res, next) {
        try {
            res.send(await FieldMaterialService.getFieldMaterialsByUps(req.params.state));
        } catch (err) {
            next(err);
        }
    }

    static async getFieldMaterialsByArea(req, res, next) {
        try {
            res.send(await FieldMaterialService.getFieldMaterialsByArea(req.params.state, req.params.ups));
        } catch (err) {
            next(err);
        }
    }

    static async getFieldMaterialsByStateUpsArea(req, res, next) {
        try {
            res.send(await FieldMaterialService.getFieldMaterialsByStateUpsArea(req.params.state,
                req.params.ups,
                req.params.area));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = FieldMaterialController;
