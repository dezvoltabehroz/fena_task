import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CampaignEntity } from '../../campaign/campaign.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: this.config.get<string>('MYSQL_HOST'),
            port: this.config.get<number>('MYSQL_PORT'),
            database: this.config.get<string>('MYSQL_DATABASE'),
            username: this.config.get<string>('MYSQL_USER'),
            password: this.config.get<string>('MYSQL_PASSWORD'),
            entities: [CampaignEntity],
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logger: 'file',
            synchronize: true, // never use TRUE in production!
        };
    }
}
