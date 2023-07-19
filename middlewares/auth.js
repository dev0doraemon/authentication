const jwt = require('jsonwebtoken');
const User = require('../models/user');

// exports.isAuthenticated = (req, res, next) => {
//   res.locals.user = null;
//   if (!req.cookies) {
//     return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//   }

//   const { Authorization } = req.cookies;
//   const [authType, authToken] = (Authorization ?? '').split(' ');

//   if (!authToken || authType !== 'Bearer') {
//     return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//   }

//   try {
//     const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
//     // const user = await User.findByPk(userId, {
//     //   attributes: ['id', 'nickname', 'isAdmin'],
//     //   raw: true,
//     //   nest: true,
//     // });

//     if (!user) {
//       // 401 respone
//       return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//     }

//     res.locals.user = userId;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//   }
// };

exports.inspectToken = (req, res, next) => {
  res.locals.user = null;
  if (!req.cookies) {
    // console.log('1');
    return next();
  }

  const { Authorization } = req.cookies;
  const [authType, authToken] = (Authorization ?? '').split(' ');

  if (!authToken || authType !== 'Bearer') {
    // console.log('2');
    return next();
  }

  try {
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

    res.locals.user = userId;
    return next();
  } catch (err) {
    console.log('JWT 관련 에러!!');
    console.error(err);
    return next();
  }
};

exports.isSignedIn = (req, res, next) => {
  console.log('isSignedIn()');
  if (res.locals.user) {
    return next();
  } else {
    return res
      .status(401)
      .json({ message: '로그인을 해야 이용할 수 있는 서비스입니다.' });
  }
};

exports.isNotSignedIn = (req, res, next) => {
  console.log('isNotSignedIn()');
  if (!res.locals.user) {
    return next();
  } else {
    return res.status(401).json({ message: '이미 로그인이 되어있습니다.' });
  }
};

exports.isSeller = async (req, res, next) => {
  const userId = res.locals.user;

  try {
    const user = await User.findByPk(userId, { attributes: ['isAdmin'] });

    if (!user) {
      return res.status(403).json({ message: '사용 권한이 없습니다.' });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '문제가 생겼습니다.' });
  }
};

// exports.isSignedIn = async (req, res, next) => {
//   res.locals.user = null;
//   if (!req.cookies) {
//     return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//   }

//   const { Authorization } = req.cookies;
//   const [authType, authToken] = (Authorization ?? '').split(' ');

//   if (!authToken || authType !== 'Bearer') {
//     return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//   }

//   try {
//     const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
//     // const user = await User.findByPk(userId, {
//     //   attributes: ['id', 'nickname', 'isAdmin'],
//     //   raw: true,
//     //   nest: true,
//     // });

//     if (!user) {
//       // 401 respone
//       return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//     }

//     res.locals.user = userId;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: '인증되지 않은 계정입니다.' });
//   }
// };

// exports.isNotSignedIn = async (req, res, next) => {
//   if (!req.headers.authorization) {
//     console.log(req.headers);
//     next();
//   } else {
//     console.log(req.headers.authorization);
//     return res.status(401).json({ message: '이미 로그인이 된 상태입니다.' });
//   }
// };

// const { isAuthenticated } = require('../utils/auth');

// exports.isLoggedIn = async (req, res, next) => {
//   try {
//     if (await isAuthenticated(req, res, next)) {
//       // console.log(`isLoggedIn : ${res.locals.user.nickname}`);
//       next();
//     } else {
//       // console.log(`isNotLoggedIn : ${res.locals.user.nickname}`);
//       return res.status(403).json({ message: '로그인이 필요합니다.' });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.isNotLoggedIn = async (req, res, next) => {
//   if (!(await isAuthenticated(req, res, next))) {
//     // console.log(`isNotLoggedIn : ${res.locals.user.nickname}`);
//     next();
//   } else {
//     // console.log(`isLoggedIn : ${res.locals.user.nickname}`);
//     return res.status(403).json({ message: '이미 로그인한 상태입니다.' });
//   }
// };

// exports.isAuthorized = async (req, res, next) => {
//   try {
//     if (await isAuthenticated(req, res, next) => {

//     })
//   } catch (err) {
//     console.error
//   }
// }
