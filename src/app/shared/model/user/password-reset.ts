export class PasswordReset{
  constructor(
    public token: string | null,
    public email: string,
    public password: string,
    public confirmPassword: string
  ) {
  }
}
