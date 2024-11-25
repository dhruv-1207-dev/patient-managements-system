import * as l10n from 'jm-ez-l10n';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { Model } from '../../model';
import { IsPasswordMatchesRequirementsConstraint } from './adminValidator';

export class AuthModel extends Model {
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

export class ForgotPasswordModel extends Model {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  constructor(body: any) {
    super();
    const { email } = body;

    this.email = email;
  }
}

export class PasswordModel extends Model {
  @IsNotEmpty()
  public oldPassword: string;

  @Validate(IsPasswordMatchesRequirementsConstraint, {
    message: l10n.t('ERR_REQUIRED_PASSWORD'),
  })
  @IsNotEmpty()
  public newPassword: string;

  constructor(body: any) {
    super();
    const { oldPassword, newPassword } = body;

    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}

export class ResetPasswordModel {
  @IsNotEmpty()
  public resetToken: number;

  @Validate(IsPasswordMatchesRequirementsConstraint, {
    message: l10n.t('ERR_REQUIRED_PASSWORD'),
  })
  @IsNotEmpty()
  public newPassword: string;

  constructor(body: any) {
    this.resetToken = body.resetToken;
    this.newPassword = body.newPassword;
  }
}
