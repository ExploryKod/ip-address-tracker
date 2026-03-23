import { createLocationModule } from "@modules/location/location.module";

export async function GET() {
  try {
    const WARNING_THRESHOLD = 500;
    const STOP_THRESHOLD = 200;

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

    const credits = result.credits ?? 0;

    if (credits <= STOP_THRESHOLD) {
      return Response.json(
        {
          error:
            "Sorry, Ipify api free credits are too low so we stopped the service",
          credits,
          status: "stopped",
        },
        { status: 503 }
      );
    }

    if (credits <= WARNING_THRESHOLD) {
      console.warn(`IPify account balance is ${credits} credits left`);
      return Response.json({
        ...result,
        status: "warning",
        message: "Half of Ipify credits used",
      });
    }

    return Response.json({ ...result, status: "ok" });
  } catch (error) {
    console.error("IPify account balance lookup failed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

