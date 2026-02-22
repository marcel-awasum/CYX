import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { scoreRisk } from '@cyx/shared';
import { Roles, RbacGuard } from '../auth/rbac';

@Controller('risk')
@UseGuards(RbacGuard)
export class RiskController {
  @Post('score')
  @Roles('RiskOfficer', 'OpsAdmin')
  runScore(@Body() body: any) {
    return scoreRisk(body.input, body.weights);
  }
}
