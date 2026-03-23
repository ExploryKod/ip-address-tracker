import { createLocationModule } from "@modules/location/location.module";

export async function GET() {
  try {
    const ipifyApiKey = process.env.IPIFY_API_KEY;
    if (!ipifyApiKey) {
      return Response.json(
        { error: "Server is missing IPIFY_API_KEY configuration" },
        { status: 500 }
      );
    }

    const location = createLocationModule({ ipifyApiKey });
    const getBalanceUseCase = location.getIPifyAccountBalance;

    if (!getBalanceUseCase) {
      return Response.json(
        { error: "Account balance service is not configured" },
        { status: 500 }
      );
    }

    const result = await getBalanceUseCase.execute();
    if (!result.success) {
      return Response.json(
        { error: "Unable to fetch IPify account balance" },
        { status: 502 }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("IPify account balance lookup failed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

