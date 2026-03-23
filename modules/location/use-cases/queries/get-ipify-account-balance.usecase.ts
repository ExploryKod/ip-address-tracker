import type { IIPifyAccountBalanceAPI } from "@modules/location/core/ports/ipify-account-balance.api.interface";
import type { GetIPifyAccountBalanceOutput } from "./get-ipify-account-balance.types";

export class GetIPifyAccountBalanceUseCase {
  constructor(private readonly ipifyAccountApi: IIPifyAccountBalanceAPI) {}

  async execute(): Promise<GetIPifyAccountBalanceOutput> {
    const balance = await this.ipifyAccountApi.findAccountBalance();
    return {
      success: Boolean(balance),
      credits: balance?.credits ?? null,
    };
  }
}

