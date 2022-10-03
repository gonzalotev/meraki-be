const StatusController = require('./status');
const RoleController = require('./role');
const ProtocolController = require('./protocol');
const HomeController = require('./home');
const ourSpaceController = require('./ourSpace');
const AuthController = require('./auth');
const TimetableController = require('./timetable');
const DutyController = require('./duty');
const StaticDataController = require('./staticData');

module.exports = {
    RoleController,
    StatusController,
    ProtocolController,
    HomeController,
    ourSpaceController,
    AuthController,
    TimetableController,
    DutyController,
    StaticDataController
};
