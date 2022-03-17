const ModelCreate = include('helpers/modelCreate');
const {ticketTypeAttrib, ticketTypeTableName} = include('constants');
const name = 'ticketType';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class TicketType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: ticketTypeAttrib,
            tableName: ticketTypeTableName
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

module.exports = knex => new TicketType({ knex });
