import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('main')
  @Auth()
  getMainStat(@CurrentUser('id') userId: string) {
    return this.statisticsService.getMainStat(userId);
  }
}
