const StatusController = require('./status');
const RoleController = require('./role');
const ProtocolController = require('./protocol');
const ResourceController = require('./resource');
const ourSpaceController = require('./ourSpace');
const AuthController = require('./auth');
const TimetableController = require('./timetable');
const DutyController = require('./duty');
const StaticDataController = require('./staticData');
const InscriptionController = require('./inscription');

module.exports = {
    RoleController,
    StatusController,
    ProtocolController,
    ResourceController,
    ourSpaceController,
    AuthController,
    TimetableController,
    DutyController,
    StaticDataController,
    InscriptionController
};
