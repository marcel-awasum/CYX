import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles, RbacGuard } from '../auth/rbac';

type KycStatus = 'Requested' | 'Submitted' | 'InReview' | 'Clarification' | 'Approved' | 'Rejected';
const kycCases: any[] = [];

@Controller('kyc')
@UseGuards(RbacGuard)
export class KycController {
  @Post('cases')
  @Roles('ComplianceOfficer', 'OpsAdmin')
  createCase(@Body() body: { organizationId: string; type: 'Bank' | 'Investor' }) {
    const k = { id: `kyc-${kycCases.length + 1}`, ...body, status: 'Requested' as KycStatus, audit: [{ at: new Date().toISOString(), action: 'CREATED' }] };
    kycCases.push(k);
    return k;
  }

  @Post('cases/:id/status')
  @Roles('ComplianceOfficer', 'OpsAdmin')
  updateStatus(@Param('id') id: string, @Body() body: { status: KycStatus; notes?: string }) {
    const k = kycCases.find((c) => c.id === id);
    if (!k) return { error: 'Not found' };
    k.status = body.status;
    k.audit.push({ at: new Date().toISOString(), action: `STATUS_${body.status}`, notes: body.notes });
    return k;
  }

  @Get('cases')
  @Roles('ComplianceOfficer', 'OpsAdmin', 'Auditor')
  listCases() {
    return kycCases;
  }
}
