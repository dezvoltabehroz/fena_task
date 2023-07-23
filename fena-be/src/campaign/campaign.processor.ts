import { OnQueueProgress, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('campaign')
export class CampaignProcessor {
    @Process('campaign:emails')
    async handleTranscode(job: Job) {
        let progress = 0;

        for (let i = 0; i < job.data.quantity; i++) {
            await this.sendEmail();

            progress += 1;

            await job.progress(progress);
        }

        return {};
    }

    /**
     * Fakes sending an email
     * @returns Promise
     */
    sendEmail() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            }, 1000);
        });
    }
}
