const ModelCreate = include('helpers/modelCreate');
const {chatTableName, chatAttrib} = include('constants');
const name = 'ticket';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class Ticket extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: chatAttrib,
            tableName: chatTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('ID_USUARIO_RESPONSABLE', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'ID_USUARIO_RESPONSABLE', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('ID_USUARIO_RESPONSABLE', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new Ticket({ knex });
