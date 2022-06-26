class BaseController {
  constructor(opts) {
    this.scope = opts.scope;
    this.service = null;

    const baseServiceName = `${this.constructor.name.toLowerCase()}Service`;

    if (this.scope.hasRegistration(`${baseServiceName}`)) {
      this.service = this.scope.resolve(`${baseServiceName}`);
    }
  }
}

module.exports = BaseController;
