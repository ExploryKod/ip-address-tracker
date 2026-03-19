import { createLocationModule } from "@modules/location/location.module";
import { FindLocationQuerySchema } from "./schemas";

export async function GET(request: Request) {
  try {
    const ipifyApiKey = process.env.IPIFY_API_KEY;
    if (!ipifyApiKey) {
      return Response.json(
        { error: "Server is missing IPIFY_API_KEY configuration" },
        { status: 500 }
      );
    }

    const location = createLocationModule({ ipifyApiKey });
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get("ip");
    const findLocationByIPUseCase = location.findLocationByIP;
    const getUserLocationUseCase = location.getUserLocation;

    if (!findLocationByIPUseCase || !getUserLocationUseCase) {
      return Response.json(
        { error: "Location services are not configured" },
        { status: 500 }
      );
    }

    if (ip) {
      const parsed = FindLocationQuerySchema.safeParse({ ip });
      if (!parsed.success) {
        const messages = parsed.error.issues
          .map((issue: { message: string }) => issue.message)
          .join(", ");
        return Response.json({ error: messages }, { status: 400 });
      }

      const result = await findLocationByIPUseCase.execute(parsed.data);
      if (!result.success) {
        return Response.json(
          { error: "Location not found for the provided IP" },
          { status: 404 }
        );
      }

      return Response.json(result);
    }

    const result = await getUserLocationUseCase.execute();
    if (!result.success) {
      return Response.json(
        { error: "Unable to resolve location for current user" },
        { status: 404 }
      );
    }

    return Response.json(result);
  } catch (error) {
    console.error("Location lookup failed:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

