class BaseController {
    constructor(opts) {
        this.context = opts.context;
        this.scope = opts.scope;
        this.validator = opts.validator;
        this.state = opts.state;
        this.service = null;

        const baseServiceName = `${this.constructor.name.toLowerCase()}Service`;

        if (this.scope.hasRegistration(`${baseServiceName}`)) {
            this.service = this.scope.resolve(`${baseServiceName}`);
        }
    }
}

module.exports = BaseController;
