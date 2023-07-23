import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { CampaignEntity } from './campaign.entity';
import { BullModule } from '@nestjs/bull';
import { CampaignProcessor } from './campaign.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignEntity]),
    BullModule.registerQueue({
      name: 'campaign',
    }),
  ],
  providers: [CampaignService, CampaignProcessor],
  controllers: [CampaignController]
})
export class CampaignModule { }
