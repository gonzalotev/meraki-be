const ModelCreate = include('helpers/modelCreate');
const {editorAttrib, editorTableName} = include('constants');
const name = 'editor';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class Editor extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: editorAttrib,
            tableName: editorTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('DESCRIPCION', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('DESCRIPCION', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new Editor({ knex });
