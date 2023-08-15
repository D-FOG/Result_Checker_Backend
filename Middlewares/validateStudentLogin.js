const joi = require('joi');

const toUpperCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toUpperCase();
  };
const studentLoginSchema = joi.object({
    secretValue: joi.string().label('Secret Key').required(),
    matNo: joi.string().max(13).custom(toUpperCase).label('Matriculation number').required()
  })
  
  
  const validateStudentLogin = (req, res, next) => {
      const { error, value } = studentLoginSchema.validate(req.body)
      if (error){
          console.log(error)
          res.send(error)
      } else{
          req.val = value
          next()
      }
  }

module.exports = validateStudentLogin
  