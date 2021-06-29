const {OperativeFonts} = include('models');
const { operativeFontsAttrib } = include('constants/staticData');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class OperativeFontService {
    static async fetchStaticOperativeFonts() {
        const operativeFonts = await OperativeFonts.findAll(operativeFontsAttrib);
        return operativeFonts.map(operativeFont => ({
            id: operativeFont.ID_FUENTE,
            initial: operativeFont.SIGLA,
            name: operativeFont.NOMBRE
        }));
    }
    static async getOperativeFontData(resources){
        const operativeFontsIds = compact(uniq(map(resources, resource => resource.operativeFontId)));
        if(isEmpty(operativeFontsIds)){
            return resources;
        }
        let operativeFonts = await OperativeFonts.findByValues('ID_FUENTE', operativeFontsIds);
        operativeFonts = map(operativeFonts, operativeFont => ({
            id: operativeFont.ID_FUENTE,
            initial: operativeFont.SIGLA,
            name: operativeFont.NOMBRE
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.operativeFont = find(
                operativeFonts,
                operativeFont => operativeFont.id === resource.operativeFontId
            );
            return resource;
        });
    }
}

module.exports = OperativeFontService;
