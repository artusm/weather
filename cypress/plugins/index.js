const { startDevServer } = require('@cypress/vite-dev-server')

module.exports = (on, config) => {
    on('dev-server:start', (options) => startDevServer({ options }))
    on('task', {
        log(message) {
            console.log(message);

            return null;
        },
        table(message) {
            console.table(message);

            return null;
        },
    });
    return config
}