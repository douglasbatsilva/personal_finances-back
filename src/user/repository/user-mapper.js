
const baseMapper = require("../../common/baseMapper");

class UserMapper extends baseMapper{
  constructor(){
    super("users");
  }

  // async insert(body){
  //   return this.insert(body);
  // }

  // async find(body){
  //   return this.find(body);
  // }

  // async delete(body){
  //   return this.delete(body);
  // }
}

module.exports = new UserMapper();