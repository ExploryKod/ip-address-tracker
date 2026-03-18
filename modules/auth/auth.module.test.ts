import { InMemoryUserRepository } from "@modules/auth/infra/repositories/in-memory/in-memory-user.repository";
import { FakeEmailService } from "@modules/auth/infra/services/fake-email.service";
import { FakePasswordHasher } from "@modules/auth/infra/services/fake-password-hasher";
import { RegisterUserUseCase } from "@modules/auth/use-cases/commands/register-user.usecase";
// modules/auth/auth.module.test.ts
export function createTestAuthModule() {
    // Test doubles
    const userRepo = new InMemoryUserRepository();
    const emailService = new FakeEmailService();
    const passwordHasher = new FakePasswordHasher();
  
    // Use cases with test doubles
    const registerUserUseCase = new RegisterUserUseCase(
      userRepo,
      emailService,
      passwordHasher
    );
  
    return {
      registerUser: registerUserUseCase,
      // Test helpers
      testHelpers: {
        userRepo, // Expose for assertions
        emailService,
      },
    };
  }