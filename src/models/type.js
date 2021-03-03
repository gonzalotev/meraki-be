const areaTable = 'areas';
const upsTable = 'ups';
const segmentTable = 'segments';
const fileTable = 'files';
const statusesTable = 'statuses';
const assignmentTypeTable = 'assignments_types';
const situationsTable = 'situations';

class Type {
    constructor(knex, name) {
        this.knex = knex;
        this.name = name;
    }

    getAreas(state, ups) {
        return this.knex.select('area').from(areaTable).where({
            state,
            ups
        });
    }

    getUps(state) {
        return this.knex.select('ups').from(upsTable).where({state});
    }

    getSegments(state, ups, area) {
        return this.knex.select('segment').from(segmentTable).where({
            state,
            ups,
            area
        });
    }

    getFiles() {
        return this.knex.select('description', 'link', 'id').from(fileTable);
    }

    getStatuses() {
        return this.knex.select('id', 'label').from(statusesTable).orderBy([{
            column: 'id',
            order: 'asc'
        }]);
    }

    getAssignmentsTypes() {
        return this.knex.select('id', 'label').from(assignmentTypeTable);
    }

    getSituations(status) {
        return this.knex.select('id', 'label', 'status').from(situationsTable).where({status}).orderBy([{
            column: 'id',
            order: 'asc'
        }]);
    }
}

module.exports = knex => new Type(knex, 'Type');
