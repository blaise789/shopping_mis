import logger from 'pino';
import dayjs from 'dayjs';

// Configure the logger
const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true // Colorize the output
        }
    },
    base: {
        pid: false // Disable the PID in the log output
    },
    timestamp: () => `,"time":"${dayjs().format()}"` // Use dayjs to format the timestamp
});

// Export the logger
export default log;
