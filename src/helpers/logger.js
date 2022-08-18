const winston = require('winston');

const {
    createLogger,
    format: {
        combine,
        timestamp,
        printf,
        colorize,
        align
    },
    transports: {Console}
} = winston;

const myCustomLevels = {
    levels: {
        error: 0,
        info: 2,
        debug: 1
    },
    colors: {
        error: 'red',
        info: 'green',
        debug: 'yellow'
    }
};

const customFormat = printf(info =>
    `[${info.level} ${new Date(info.timestamp).toLocaleString()}] ${info.message}`
);

winston.addColors(myCustomLevels.colors);

const format = combine(
    timestamp(),
    align(),
    colorize({ all: true }),
    customFormat
);

const logger = createLogger({
    format,
    levels: myCustomLevels.levels,
    transports: new Console({
        level: 'info',
        colorize: true
    })
});

module.exports = logger;
