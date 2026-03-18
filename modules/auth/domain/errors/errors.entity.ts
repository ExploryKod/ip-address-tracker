import type { Email, UserId } from "@modules/auth/domain/entities/user.entity";

export class InvalidEmailError extends Error {
    constructor(email: string) {
      super(`Invalid email: ${email}`);
      this.name = 'InvalidEmailError';
    }
  }
  
  export class UserAlreadyActiveError extends Error {
    constructor(userId: UserId) {
      super(`User ${userId.value} is already active`);
      this.name = 'UserAlreadyActiveError';
    }
  }

export class UserAlreadyExistsError extends Error {
  constructor(email: Email) {
    super(`User already exists for email: ${email.value}`);
    this.name = 'UserAlreadyExistsError';
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid email or password");
    this.name = "InvalidCredentialsError";
  }
}

  