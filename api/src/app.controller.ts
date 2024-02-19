import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { StatisticsEntity } from './entities/statistics.entity';
import { UnsubscribesEntity } from './entities/unsubscribes.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('statistics')
  @ApiOperation({ summary: 'Get general stats' })
  @ApiOkResponse({ type: StatisticsEntity })
  getStatistics() {
    return this.appService.getStatistics();
  }

  @Get('unsubscribes')
  @ApiOperation({ summary: 'Get number of unsubscribes of the last 30 days' })
  @ApiOkResponse({ type: UnsubscribesEntity, isArray: true })
  getUnsubscribes() {
    return this.appService.getUnsubscribesLogsLast30Days();
  }
}
