const every = require('lodash/every');
const concat = require('lodash/concat');
const pkg = root_path('package.json');

/**
 * Creates the status object
 * @param {Array<{status}>} deps Required dependencies to work.
 * @param {Array<{status}>} optionalDeps Optional dependencies to work.
 * @returns {{name, status: string, deps}} Returns the status of this app.
 */
const generateStatus = (deps, optionalDeps = []) => ({
    deps: concat(deps, optionalDeps),
    name: pkg.name,
    status: every(deps, ({status: 'ok'}))
        ? every(optionalDeps, ({status: 'ok'})) ? 'ok' : 'degraded'
        : 'down'
});

class StatusService {
    static getStatus() {
        return generateStatus([StatusService.getDBStatus()]);
    }

    static getHealth() {
        return StatusService.getDBStatus();
    }

    static getDBStatus() {
        return {
            name: 'MySQL',
            status: process.env.database || 'down'
        };
    }
}

module.exports = StatusService;
