import validator from 'validator'
import { EmailValidator } from '@/validation/protocols/email-validator.protocol'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
