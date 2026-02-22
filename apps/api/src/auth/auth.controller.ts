import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return {
      token: Buffer.from(body.email).toString('base64'),
      role: 'OpsAdmin',
      tenantId: 'org-cyx-admin'
    };
  }
}
