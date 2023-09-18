// приймає ф повертає ф обгортку
const wrapperCntrl = (contactsCntrl) => {
  const wrapperFunc = async (res, req, next) => {
    try {
      await contactsCntrl(res, req, next);
    } catch (error) {
      next(error);
    }
  };
  return wrapperFunc;
};

module.exports = wrapperCntrl;
