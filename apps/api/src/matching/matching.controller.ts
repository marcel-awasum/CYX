import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { matchAndAllocate } from '@cyx/shared';
import { Roles, RbacGuard } from '../auth/rbac';

@Controller('matching')
@UseGuards(RbacGuard)
export class MatchingController {
  @Post('allocate')
  @Roles('RelationshipManager', 'OpsAdmin')
  allocate(@Body() body: any) {
    return matchAndAllocate(body.request, body.mandates);
  }
}
