/* eslint-disable require-atomic-updates */
const uuid = require('uuidv4').uuid;
const { getOffset, getPageSize } = include('util');
const assign = require('lodash/assign');
const forEach = require('lodash/forEach');
const head = require('lodash/head');
const includes = require('lodash/includes');
const isArray = require('lodash/isArray');
const forOwn = require('lodash/forOwn');
const isObject = require('lodash/isObject');
const map = require('lodash/map');
const toLower = require('lodash/toLower');
const isDate = require('lodash/isDate');
// The model that uses Knexjs to store and retrieve data from a
// database using the provided `knex` instance.
// Custom functionality can be composed on top of this set of models.
// The idea is that these are the most-used types of functions that most/all
// "models" will want to have. They can be overriden/modified/extended if
// needed by composing a new object out of the one returned by this function ;)

const ORDER_BY = [{ column: 'FECHA_ALTA', order: 'asc' }];

class ModelCreate {
    constructor({
        knex, name, tableName, selectableProps, timeout
    }) {
        this.knex = knex || {},
        this.name = name || 'name',
        this.tableName = tableName || 'tablename',
        this.selectableProps = selectableProps || [],
        this.timeout = timeout || 20000;
    }

    async startTransaction() {
        this.transaction = await this.knex.transaction();
        return true;
    }

    async commitTransaction() {
        await this.transaction.commit();
        this.transaction = null;
        return true;
    }

    async rollbackTransaction() {
        await this.transaction.rollback();
        this.transaction = null;
        return true;
    }

    jsonToString(props) {
        const objectToSave = {};
        //eslint-disable-next-line
        map(props, (value, index) => {
            if (includes(this.selectableProps, index)) {
                if (isObject(value) && !isDate(value)) {
                    assign(objectToSave, { [index]: JSON.stringify(value) });
                } else {
                    assign(objectToSave, { [index]: value });
                }
            }
        });
        return objectToSave;
    }

    async insertOne(props, transaction = this.transaction) {
        const objectToSave = this.jsonToString(props);
        objectToSave.FECHA_ALTA = new Date();
        if (transaction) {
            const objectCreated = await transaction(this.tableName)
                .insert(objectToSave)
                .returning(this.selectableProps)
                .timeout(this.timeout);
            return head(objectCreated);
        }
        const objectCreated = await this.knex.insert(objectToSave)
            .returning(this.selectableProps)
            .into(this.tableName)
            .timeout(this.timeout);

        return head(objectCreated);
    }

    insertMany(props) {
        if (isArray(props) && head(props) instanceof Object) {
            const inserts = map(props, prop => ({
                id: uuid(),
                ...this.jsonToString(prop),
                __v: 0,
                createdAt: new Date()
            }));
            if (this.transaction) {
                return this.transaction(this.tableName)
                    .insert(inserts)
                    .returning(this.selectableProps)
                    .timeout(this.timeout);
            }
            return this.knex.insert(inserts)
                .returning(this.selectableProps)
                .into(this.tableName)
                .timeout(this.timeout);
        }
        return Promise.reject('not a valid array of data');
    }

    find(filters = {}, columns = this.selectableProps, orderBy = ORDER_BY) {
        return this.knex.select(columns)
            .from(this.tableName)
            .where(filters)
            .orderBy(orderBy)
            .timeout(this.timeout);
    }

    findByPage(page, filters = {}, columns = this.selectableProps, orderBy = ORDER_BY) {
        return this.knex.select(columns)
            .from(this.tableName)
            .where(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy(orderBy)
            .timeout(this.timeout);
    }

    findByMatch(page, valueToSearch, columnsToSearch, filters={}, orderBy = ORDER_BY) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where(query => {
                forOwn(columnsToSearch, (column, index) => {
                    if (index === 0) {
                        query.where(column, 'like', `${valueToSearch}%`);
                    } else {
                        query.orWhere(column, 'like', `${valueToSearch}%`);
                    }
                });
            })
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy(orderBy)
            .timeout(this.timeout);
    }
    async findOne(filters = {}, columns = this.selectableProps, orderBy = ORDER_BY) {
        const results = await this.find(filters, columns, orderBy);
        if (!isArray(results)) {
            return results;
        }
        return head(results);
    }

    findAll(columns = this.selectableProps, orderBy = ORDER_BY) {
        return this.knex.select(columns)
            .from(this.tableName)
            .orderBy(orderBy)
            .timeout(this.timeout);
    }
    findByValues(field, ids, columns = this.selectableProps, orderBy = ORDER_BY) {
        return this.knex.select(columns)
            .from(this.tableName)
            .whereIn(field, ids)
            .orderBy(orderBy)
            .timeout(this.timeout);
    }
    async findById (id, columns = this.selectableProps, orderBy = ORDER_BY) {
        const foundObject = await this.knex.select(columns)
            .from(this.tableName)
            .where(id)
            .orderBy(orderBy)
            .timeout(this.timeout);
        return head(foundObject);
    }

    findByTerm(termValue, termKeys, filters, columns = this.selectableProps) {
        if (isArray(termKeys)) {
            const knexQuery = this.knex.select(columns).from(this.tableName).where(function () {
                forEach(termKeys, (tk, i) => {
                    if (i === 0) {
                        this.whereRaw(`LOWER(${tk}::varchar) like ?`, [`%${toLower(termValue)}%`]);
                    } else {
                        this.orWhereRaw(`LOWER(${tk}::varchar) like ?`, [`%${toLower(termValue)}%`]);
                    }
                });
            });

            if (filters) {
                return knexQuery.andWhere(filters);
            }
            return knexQuery;
        }
    }

    async updateOne(filters, props, transaction = this.transaction) {
        const objectToSave = this.jsonToString(props);
        if (transaction) {
            const modifiedObject = await transaction(this.tableName)
                .update(objectToSave)
                .from(this.tableName)
                .where(filters)
                .returning(this.selectableProps)
                .timeout(this.timeout);

            return head(modifiedObject);
        }
        const modifiedObject = await this.knex.update(objectToSave)
            .from(this.tableName)
            .where(filters)
            .returning(this.selectableProps)
            .timeout(this.timeout);

        return head(modifiedObject);
    }

    async updateMany(filters, props) {
        if (isArray(props) && Object instanceof head(props)) {
            const updates = await Promise.all(map(props, async prop => {
                delete prop.id;
                const object = await this.findOne(filters);
                if (object.__v !== undefined) {
                    prop.__v = object.__v;
                    prop.__v += 1;
                } else {
                    prop.__v = 0;
                }
                return this.jsonToString(prop);
            }));
            if (this.transaction) {
                return this.transaction(this.tableName)
                    .update(updates)
                    .from(this.tableName).where(filters)
                    .returning(this.selectableProps)
                    .timeout(this.timeout);
            }
            return this.knex
                .update(updates)
                .from(this.tableName)
                .where(filters)
                .returning(this.selectableProps).timeout(this.timeout);
        }
        return Promise.reject('not a valid array of data');
    }

    deleteOne(id, deletionData) {
        if (this.transaction) {
            return this.transaction(this.tableName)
                .update(deletionData)
                .where(id)
                .timeout(this.timeout);
        }
        return this.knex.update(deletionData)
            .from(this.tableName)
            .where(id)
            .timeout(this.timeout);
    }

    deleteMany(ids) {
        if (isArray(ids) && String instanceof head(ids)) {
            if (this.transaction) {
                return this.transaction(this.tableName)
                    .update({ deleted: true, deletedAt: new Date() })
                    .whereIn('id', ids)
                    .timeout(this.timeout);
            }
            return this.knex
                .update({ deleted: true, deletedAt: new Date() })
                .from(this.tableName)
                .whereIn('id', ids)
                .timeout(this.timeout);
        }
    }

    async countDocuments(filters = {}) {
        return head(await this.knex(this.tableName)
            .count('*')
            .where(filters)
            .timeout(this.timeout));
    }
    async countTotal (filters = {}, valueToSearch = '', columnsToSearch=[]) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where(query => {
                forOwn(columnsToSearch, (column, index) => {
                    if (index === 0) {
                        query.where(column, 'like', `${valueToSearch}%`);
                    } else {
                        query.orWhere(column, 'like', `${valueToSearch}%`);
                    }
                });
            })
            .andWhere(filters)
            .timeout(this.timeout));
    }

    async findAndUpdate(filters, props) {
        try {
            const user = await this.findOne(filters);
            if (user) {
                return this.updateOne(filters, props);
            }
            return this.insertOne(props);
        } catch (err) {
            // eslint-disable-next-line
            console.error(filters, props);
            return false;
        }
    }
}

module.exports = ModelCreate;
