import * as l10n from 'jm-ez-l10n';
import { IsEmail, IsEnum, IsNotEmpty, Validate } from 'class-validator';
import { Model } from '../../model';
import { IsPasswordMatchesRequirementsConstraint } from '../user/userValidator';

export enum UserRole {
  PATIENT = 'PATIENT',
}

export class SignInModel extends Model {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  constructor(body: any) {
    super();
    const { email, password } = body;

    this.email = email;
    this.password = password;
  }
}

export class SignUpModel extends Model {
  
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsEnum(UserRole, { message: 'Invalid Role' })
  @IsNotEmpty()
  public role: UserRole;

  constructor(body: any) {
    super();
    const { name, email, password, role } = body;

    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
