import { describe, it, expect } from "@jest/globals";
import type { IIPifyAccountBalanceAPI } from "@modules/location/core/ports/ipify-account-balance.api.interface";
import { GetIPifyAccountBalanceUseCase } from "./get-ipify-account-balance.usecase";

class FakeIPifyAccountBalanceApi implements IIPifyAccountBalanceAPI {
  constructor(private readonly credits: number | null) {}

  async findAccountBalance() {
    if (this.credits === null) return null;
    return { credits: this.credits };
  }
}

describe("GetIPifyAccountBalanceUseCase", () => {
  it("returns success true with credits when balance is available", async () => {
    const useCase = new GetIPifyAccountBalanceUseCase(
      new FakeIPifyAccountBalanceApi(930)
    );

    const result = await useCase.execute();

    expect(result.success).toBe(true);
    expect(result.credits).toBe(930);
  });

  it("returns success false when balance cannot be fetched", async () => {
    const useCase = new GetIPifyAccountBalanceUseCase(
      new FakeIPifyAccountBalanceApi(null)
    );

    const result = await useCase.execute();

    expect(result.success).toBe(false);
    expect(result.credits).toBeNull();
  });
});

