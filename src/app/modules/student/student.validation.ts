import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-zA-Z]*$/, "capitalize format")
    .required()
    .messages({
      "string.empty": "Firstname is required",
      "string.max": "FirstName can not be more than 20 characters",
      "string.pattern.name": "{#label} is not in capitalize format",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/, "alpha")
    .required()
    .messages({
      "string.empty": "Lastname is required",
      "string.pattern.name": "{#label} is not valid",
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's contact number is required",
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local guardian's contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local guardian's address is required",
  }),
  relation: Joi.string().required().messages({
    "string.empty": "Relation with local guardian is required",
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Student ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Student Name is required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": "The gender field must be male or female",
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.string().required().messages({
    "string.empty": "Date of birth is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency contact number is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "{#label} is not a valid email",
    "string.empty": "Email is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only":
        "Blood group must be one of the following: A+, A-, B+, B-, AB+, AB-, O+, O-",
    }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").required().messages({
    "any.only": "Student status can either be active or blocked",
    "string.empty": "Student status is required",
  }),
});

export default studentValidationSchema;
