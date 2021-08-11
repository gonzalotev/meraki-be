const db = require('../helpers/database');
const isNil = require('lodash/isNil');
const map = require('lodash/map');
const split = require('lodash/split');

/**
 * @function findAll
 * @description build and run a knex object using table and filters,
 *              paging and sorting passed in bodyQuery
 * @returns {
                        data: any[];
                        totalItems: Dict<string | number>[];
                        columns: any[];
                }
 */
module.exports.findAll = async (table, bodyQuery) => {
    const {filters, page, limit, orderBy, orderDirection = 'asc'} = bodyQuery;

    const query = db.select().table(table).where(filters);

    if (!isNil(orderBy)) {
        query.orderBy(orderBy, orderDirection);
    }

    if (!(isNil(limit) && isNil(page))){
        query.limit(limit).offset(limit * page);
    }

    const queryCounter = db.select().table(table).where(filters).count('*', { as: 'count' });

    const schemaTable = split(table, '.');

    const columnsQuery = db.select('COLUMN_NAME').table('SYS.ALL_TAB_COLUMNS').where('TABLE_NAME', schemaTable[1]).andWhere('OWNER', schemaTable[0]);

    const [data, totalItems, columns] = await Promise.all([
        query,
        queryCounter,
        columnsQuery
    ]);

    return {
        data,
        totalItems,
        columns: map(columns, column => column.COLUMN_NAME)
    };
};
