const User = require('../models/user');

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(res.locals.user, {
      attributes: ['isAdmin'],
      raw: true,
      nest: true,
    });

    if (!user.isAdmin) {
      return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
    }
    next();
  } catch (err) {
    console.error(err);
    return;
  }
};
