import { describe, it, expect } from "@jest/globals";
import { GetUserIPUseCase } from "./get-user-ip.usecase";
import type { IIPAddressAPI } from "@modules/location/core/ports/ip-address.api.interface";

class FakeIPAddressApi implements IIPAddressAPI {
  constructor(private readonly ip: string | null) {}

  async getUserIP(): Promise<string | null> {
    return this.ip;
  }
}

describe("GetUserIPUseCase", () => {
  let useCase: GetUserIPUseCase;

  it("returns success true with the resolved IP", async () => {
    useCase = new GetUserIPUseCase(new FakeIPAddressApi("8.8.8.8"));

    const result = await useCase.execute();

    expect(result.success).toBe(true);
    expect(result.ip).toBe("8.8.8.8");
  });

  it("returns success false when IP cannot be resolved", async () => {
    useCase = new GetUserIPUseCase(new FakeIPAddressApi(null));

    const result = await useCase.execute();

    expect(result.success).toBe(false);
    expect(result.ip).toBeNull();
  });
});

