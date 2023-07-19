const AuthService = require('../services/auth');
const jwt = require('jsonwebtoken');
const authService = new AuthService();

exports.signup = async (req, res, next) => {
  const {
    name,
    nickname,
    phoneNumber,
    email,
    password,
    confirmPassword,
    isAdmin,
    location,
  } = req.body;

  // 이메일 유효성 검사 하는 부분 만들기
  if (!authService.verifyPassword(password, confirmPassword)) {
    return res.status(412).json({ message: '패스워드가 일치하지 않습니다.' });
  }

  if (await authService.checkEmailExist(email)) {
    return res.status(412).json({ message: '중복된 이메일입니다.' });
  }

  if (await authService.checkNicknameExist(nickname)) {
    return res.status(412).json({ message: '중복된 닉네임입니다.' });
  }

  const result = await authService.createUser({
    name,
    nickname,
    phoneNumber,
    email,
    password,
    isAdmin,
    location,
  });

  if (!result) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }

  return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authService.checkRegistered(email, password);
    if (!user) {
      return res
        .status(412)
        .json({ message: '닉네임 또는 패스워드를 확인해주세요' });
    }

    // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.cookie('Authorization', `Bearer ${token}`);
    return res.status(200).json({
      result: {
        message: '로그인이 완료 되었습니다.',
        token: token,
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: '로그인 도중 에러가 발생했습니다.' });
  }
};

exports.signout = async (req, res, next) => {
  res.clearCookie('Authorization');
  res.status(200).json({ message: '로그아웃이 정상적으로 되었습니다.' });
};
