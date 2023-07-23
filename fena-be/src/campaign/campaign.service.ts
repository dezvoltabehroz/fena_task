import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { CampaignEntity } from './campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignService {
    @InjectRepository(CampaignEntity)
    private readonly repository: Repository<CampaignEntity>;

    constructor(@InjectQueue('campaign') private readonly campaignQueue: Queue) { }

    async create(createCampaignDto: CampaignEntity) {
        const campaignObj: CampaignEntity = new CampaignEntity();
        campaignObj.name = createCampaignDto.name;
        campaignObj.quantity = createCampaignDto.quantity;

        const job = await this.repository.save(campaignObj);
        const jobQueue = await this.campaignQueue.add('campaign:emails', campaignObj);

        return {
            message: 'New campaign created successfully!',
            data: { job, jobQueue },
        };
    }

    async findAll() {
        // return this.repository.find({ order: { id: 'ASC' } });

        return (
            await this.campaignQueue.getJobs([
                'completed',
                'active',
                'waiting',
                'delayed',
                'failed',
                'paused',
            ])
        ).sort(
            (a: Job, b: Job) => parseInt(b.id as string) - parseInt(a.id as string),
        );
    }

    async remove(id: number) {
        this.repository.delete(id);
        return (await this.campaignQueue.getJob(id)).remove();
    }
}
