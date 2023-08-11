const joi = require('joi');

const capitalizeFirstLetter = (value) => {
    // Ensure the value is a string
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
  
    // Convert the whole string to lowercase and then capitalize the first letter
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const toLowerCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toLowerCase();
  };

  const toUpperCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toUpperCase();
  };

  const getStudentSchema = joi.object({
    matNo: joi.string().max(13).custom(toLowerCase).label('Matriculation number').required()
})

const studentSchema = joi.object({
    firstName:joi.string().custom(capitalizeFirstLetter).label('First name').required(),
    lastName: joi.string().custom(capitalizeFirstLetter).label('Last name').required(),
    middleName: joi.string().custom(capitalizeFirstLetter).label('Middle name').required(),
    studentEmail: joi.string().custom(toLowerCase).email().label('Email').required(),
    enrollmentYear: joi.number().required(),
    matNo: joi.string().max(13).custom(toLowerCase).label('Matriculation number').required()
})

const updateStudentSchema = joi.object({
  firstName:joi.string().custom(capitalizeFirstLetter).label('First name').required(),
  lastName: joi.string().custom(capitalizeFirstLetter).label('Last name').required(),
  middleName: joi.string().custom(capitalizeFirstLetter).label('Middle Name').required(),
  studentEmail: joi.string().custom(toLowerCase).email().label('Email').required(),
  enrollmentYear: joi.number().required(),
  matNo: joi.string().max(13).custom(toLowerCase).label('Matriculation number').required()
})


const validateStudent = (req, res, next) => {
    const { error, value } = studentSchema.validate(req.body)
    const err = error
    if (err){
      const errorValue = error.details.map(detail => detail.message).join(', ')
      console.log(error)
      res.status(400).json({errorValue})
      } else{
          req.val = value
          next()
      }
}

const validateStudentUpdate = (req, res, next) => {
  const { error, value } = updateStudentSchema.validate(req.body)
  const err = error
  if (err){
    const errorValue = error.details.map(detail => detail.message).join(', ')
    console.log(error)
    res.status(400).json({errorValue})
  } else{
      req.val = value
      next()
  }
}

const validateGetStudent = (req, res, next) => {
  const { error, value } = getStudentSchema.validate(req.body)
  if (error){
      const errorValue = error.details.map(detail => detail.message).join(', ')
      console.log(error)
      res.status(400).json({errorValue})
  } else{
      req.val = value
      next()
  }
}

//error.details.map(detail => detail.message).join(', ')

module.exports = {
  validateStudent,
  validateStudentUpdate,
  validateGetStudent
}