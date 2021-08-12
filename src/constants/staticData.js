const nomenclatorsAttrib = [
    'ID_NOMENCLADOR',
    'SIGLA',
    'DESCRIPCION_ABREVIADA',
    'DESCRIPCION_COMPLETA'
];
const nomenclatorsGroupingsAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'DESCRIPCION'
];

const nomenclaturesGroupingsAttrib = [
    'ID_NOMENCLADOR',
    'ID_AGRUPACION',
    'ID_NOMENCLATURA_AGRUPACION',
    'ABREVIATURA',
    'DESCRIPCION'
];
const lotsAttrib = [
    'ID_OPERATIVO',
    'ID_LOTE',
    'DESCRIPCION'
];
const staticalVariableAttrib = [
    'ID_VARIABLE',
    'NOMBRE',
    'ABREVIATURA'
];

module.exports = {
    nomenclatorsAttrib,
    lotsAttrib,
    staticalVariableAttrib,
    nomenclatorsGroupingsAttrib,
    nomenclaturesGroupingsAttrib
};
