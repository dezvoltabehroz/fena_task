import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Sse,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignEntity } from './campaign.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable, interval, mergeMap } from 'rxjs';
import { Job } from 'bull';

interface MessageEvent {
    data: string | object | Job[];
}

@ApiTags('campaigns')
@Controller('campaigns')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'The campaign has been successfully created.', })
    async create(@Body() createCampaignEntity: CampaignEntity) {
        return await this.campaignService.create(createCampaignEntity);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get all campaigns',
    })
    async findAll() {
        return this.campaignService.findAll();
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Delete a campaign',
    })
    async remove(@Param('id') id: string) {
        await this.campaignService.remove(+id);
        return {
            message: `Job ${id} removed successfully!`,
        };
    }

    /**
     * Sync Jobs in Real Time
     */
    @Sse('jobs')
    sendJobsEvent(): Observable<MessageEvent> {
        return interval(1000).pipe(
            mergeMap(async () => {
                return {
                    data: await this.campaignService.findAll(),
                };
            }),
        );
    }
}
