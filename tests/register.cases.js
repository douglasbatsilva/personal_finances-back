function makeId(num) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < num; i += 1)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const validUser = {
  email: `${makeId(10)}@testmonolit.com`,
  userName: `${makeId(8)}`,
  password: "123123",
  rePassword: "123123",
};

const nonExistentUser = {
  user: `${makeId(10)}@testmonolit.com`,
  password: "123123",
};

module.exports = {
  nonExistentUser,
  validUser,
};
