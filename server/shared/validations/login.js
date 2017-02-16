import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {}; 
  
  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is requried';
  }
  
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is requried';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}