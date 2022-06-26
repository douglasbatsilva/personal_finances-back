const baseMapper = require("../../common/baseMapper");

class FinanceMapper extends baseMapper {
  constructor(opts) {
    super(opts, "finances");
  }
}

module.exports = FinanceMapper;
