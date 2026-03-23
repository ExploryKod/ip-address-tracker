import type {
  GetLocationCoordinatesInput,
  GetLocationCoordinatesOutput,
} from "./get-location-coordinates.types";

export class GetLocationCoordinatesUseCase {
  async execute(
    input: GetLocationCoordinatesInput
  ): Promise<GetLocationCoordinatesOutput> {
    const lat = input.location?.location?.lat;
    const lng = input.location?.location?.lng;

    const valid =
      typeof lat === "number" &&
      Number.isFinite(lat) &&
      typeof lng === "number" &&
      Number.isFinite(lng) &&
      !(lat === 0 && lng === 0);

    return {
      success: valid,
      coordinates: valid ? { lat, lng } : null,
    };
  }
}

