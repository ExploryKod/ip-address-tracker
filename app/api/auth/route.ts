import { createAuthModule } from '@modules/auth/auth.module';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const auth = createAuthModule({
    prisma,
    resendApiKey: process.env.RESEND_API_KEY!,
  });

  const body = await request.json();
  const result = await auth.registerUser.execute(body);

  return Response.json(result);
}