const map = require('lodash/map');
const {Assignment} = include('models');

const ArqService = require('./arq');

class AssignmentService {
    static getAssignmentsByArea(filters, subCoordinator) {
        return Assignment.getAssignmentsByArea(filters, subCoordinator);
    }

    static getAssignmentsBySegment(filters, subCoordinator) {
        return Assignment.getAssignmentsBySegment(filters, subCoordinator);
    }

    static getAssignmentsByUps(filters, subCoordinator) {
        return Assignment.getAssignmentsByUps(filters, subCoordinator);
    }

    static getAssignmentsByAddress(filters, subCoordinator) {
        return Assignment.getAssignmentsByAddress(filters, subCoordinator);
    }

    static async getAddressesToReassign(filters, token, subCoordinator) {
        const {
            results, count, usersIds
        } = await Assignment.getAddressesToReassign(filters, subCoordinator);
        const users = await ArqService.fetchUsers(
            {ids: usersIds},
            token
        );
        return {
            results: results.map(result => ({
                ...result,
                user: users.find(user => user.id === result.user),
                role: users.some(user => user.id === result.user)
                    ? users.find(user => user.id === result.user).roles[0]
                    : undefined
            })),
            count
        };
    }

    static assignByArea(assignments) {
        return Promise.all(map(assignments,
            async assignment => await Assignment.assignByArea(assignment)));
    }

    static assignBySegment(assignments) {
        return Promise.all(map(assignments,
            async assignment => await Assignment.assignBySegment(assignment)));
    }

    static assignByAddress(assignments) {
        return Promise.all(map(assignments,
            async assignment => await Assignment.assignByAddress(assignment)));
    }

    static reassignByAddress(assignments) {
        return Promise.all(map(assignments,
            async assignment => await Assignment.reassignByAddress(assignment)));
    }

    static assignSubCoordinator(assignments) {
        return Promise.all(map(assignments,
            async assignment => await Assignment.assignSubCoordinator(assignment)));
    }
}

module.exports = AssignmentService;
