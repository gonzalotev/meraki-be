const isNil = require('lodash/isNil');
const omitBy = require('lodash/omitBy');

const tableNameByState = 'fieldmaterialsbystate';
const tableNameByUps = 'fieldmaterialsbyups';
const tableNameByArea = 'fieldmaterialsbyarea';
const tableNameByStateUpsArea = 'addresses';

class FieldMaterial {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    getFieldMaterials({state}) {
        return this.knex.select(
            'fieldMaterials.state',
            'fieldMaterials.stateName as name',
            'fieldMaterials.ups',
            'fieldMaterials.areas',
            'fieldMaterials.dwellings',
            'fieldMaterials.id'
        )
            .from(`${tableNameByState} as fieldMaterials`)
            .where(omitBy({state}, isNil));
    }

    getFieldMaterialsByUps(state) {
        return this.knex.select('*').from(tableNameByUps).where({state});
    }

    getFieldMaterialsByArea(state, ups) {
        return this.knex.select('*').from(tableNameByArea).where({
            state,
            ups
        });
    }

    getFieldMaterialsByStateUpsArea(state, ups, area) {
        return this.knex.select(
            'id',
            'fraction',
            'side',
            'block',
            'locality',
            'listNumber',
            'street',
            'department',
            'cadastralNumber',
            'floor',
            'house',
            'room',
            'dwellingTypeCode',
            'sector',
            'entrance',
            'building',
            'description'
        ).from(tableNameByStateUpsArea).where({
            state,
            ups,
            area
        });
    }
}

module.exports = knex => new FieldMaterial(knex, 'FieldMaterial');
