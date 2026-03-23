import { z } from "zod";

export const FindLocationQuerySchema = z.object({
  ip: z.string().min(1, "IP is required"),
});

export type FindLocationQuery = z.infer<typeof FindLocationQuerySchema>;

