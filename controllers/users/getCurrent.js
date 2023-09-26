// 4 конролер пошук даних користувача за валідним токеном
const getCurrent = async (req, res) => {
    // взяти з рекв юз данні що в м/в аутенификатор
    const { email, subscription } = req.user;
  
    res.json({ email, subscription });
  };
  

  module.exports = getCurrent
