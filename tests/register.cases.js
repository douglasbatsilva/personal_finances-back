function makeId(num) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < num; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


const validUser = {
  email: `${makeId(10)}@testmonolit.com`,
  userName: `${makeId(8)}`,
  password: "123123",
  rePassword: "123123",
};

module.exports = {
  validUser,
};