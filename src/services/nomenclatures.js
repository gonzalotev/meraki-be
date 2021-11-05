const {Nomenclatures} = include('models');
const { nomenclaturesAttrib } = include('constants/staticData');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class NomenclatureService {
    static async fetchStaticNomenclatures() {
        const nomenclatures = await Nomenclatures.findAll(nomenclaturesAttrib);
        return nomenclatures.map(nomenclature => ({
            id: nomenclature.ID_NOMENCLATURA,
            shortDescription: nomenclature.ABREVIATURA,
            description: nomenclature.DESCRIPCION
        }));
    }
    static async getNomenclatureData(resources, key='nomenclatureId', foreign='nomenclature'){
        const nomenclaturesIds = compact(uniq(map(resources, resource => resource[key])));
        if(isEmpty(nomenclaturesIds)){
            return resources;
        }
        let nomenclatures = await Nomenclatures.findByValues('ID_NOMENCLATURA', nomenclaturesIds);
        nomenclatures = map(nomenclatures, nomenclature => ({
            id: nomenclature.ID_NOMENCLATURA,
            shortDescription: nomenclature.ABREVIATURA,
            description: nomenclature.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData[foreign] = find(
                nomenclatures,
                nomenclature => nomenclature.id === resource[key]
            );
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = Nomenclatures.knex.select(columns)
                .from(Nomenclatures.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
            });
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_NOMENCLATURA',
                modified: 'NOMENCLATURA ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'AUTOMATICO_SI_NO',
                modified: 'AUTOMÁTICO SI/NO'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = NomenclatureService;
