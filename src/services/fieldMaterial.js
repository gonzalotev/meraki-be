const {FieldMaterial} = include('models');

class FieldMaterialService {
    static getFieldMaterials(filters) {
        return FieldMaterial.getFieldMaterials(filters);
    }

    static getFieldMaterialsByUps(state) {
        return FieldMaterial.getFieldMaterialsByUps(state);
    }

    static getFieldMaterialsByArea(state, ups) {
        return FieldMaterial.getFieldMaterialsByArea(state, ups);
    }

    static getFieldMaterialsByStateUpsArea(state, ups, area) {
        return FieldMaterial.getFieldMaterialsByStateUpsArea(state, ups, area);
    }
}

module.exports = FieldMaterialService;
