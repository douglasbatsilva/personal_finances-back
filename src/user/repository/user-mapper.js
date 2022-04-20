const baseMapper = require("../../common/baseMapper");

class UserMapper extends baseMapper {
  constructor() {
    super("users");
  }
}

module.exports = new UserMapper();
