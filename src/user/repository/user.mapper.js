const baseMapper = require("../../common/baseMapper");

class UserMapper extends baseMapper {
  constructor(opts) {
    super(opts, "users");
  }
}

module.exports = UserMapper;
