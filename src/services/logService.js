// import Raven from 'raven-js';

function init (){
    // Raven.config('https://8df0f1da28d2479f9c73a660dd98079d@o526134.ingest.sentry.io/5641290', {
    // release: '1-0-0',
    // environment: 'development-test'
    // }).install();
}

function log(error){
    console.log(error);
    // Raven.captureException(error);
}

const logger = {
    init,
    log,
};

export default logger;