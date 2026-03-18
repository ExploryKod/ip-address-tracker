import type { UserRepository } from "@modules/auth/domain/repositories/user.repository";
import type { PasswordHasher } from "@modules/auth/domain/services/password-hasher.service";
import { Email } from "@modules/auth/domain/entities/user.entity";
import { InvalidCredentialsError } from "@modules/auth/domain/errors/errors.entity";

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginUserOutput {
  userId: string;
  success: boolean;
}

export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    const email = Email.create(input.email);

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await user.verifyPassword(
      input.password,
      this.passwordHasher
    );
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

    return {
      userId: user.id.value,
      success: true,
    };
  }
}

