const joi = require('joi');

  const toLowerCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toLowerCase();
  };

const adminLoginSchema = joi.object({
    password:joi.string().min(6).max(8).label('password'),
    email:joi.string().email().label('Email').custom(toLowerCase).required()
})
const validateAdminLogin = (req, res, next) => {
    const {error, value} = adminLoginSchema.validate(req.body)
    if (error) {
        res.status(400).send(error.details.map(detail => detail.message).join(', '));
    } else {
        req.val = value
        next()
    }
}

module.exports = validateAdminLogin