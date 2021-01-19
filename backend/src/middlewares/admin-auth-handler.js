export default async (req, res, next) => {
  try {
    if (req.user.userType !== 'admin') {
      throw { status: 403, message: 'Only admins are authorized to carry out this action.' };
    }
    next();
  } catch (err) {
    next(err);
  }
};
