class Logger {
    public info(message: string) {
    console.log(`[INFO]: ${message}`);
    }

    public error(message: string) {
        console.error(`[ERROR]: ${message}`);
    }

    public debug(message: string) {
        console.debug(`[DEBUG]: ${message}`);
    }
    }

    export { Logger };