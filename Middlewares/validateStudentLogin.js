const joi = require('joi');

const toLowerCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toLowerCase();
  };
const studentLoginSchema = joi.object({
    studentEmail: joi.string().custom(toLowerCase).email().label('Email').required(),
    matNo: joi.string().max(13).custom(toLowerCase).label('Matriculation number').required()
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
  