const User = require("../Models/userModal");
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send(user);
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
const loadProfile = (req, res) => {
  try {
    res.render('profile');
  }
  catch (e) {
    console.log(e.message)
  }
}
exports.register = async (req, res) => {
  try {
    console.log(req.body)
    const newuser = new User(req.body);
    console.log(newuser)
    await newuser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.log(error)
    return res.status(400).json(error);
  }
};
