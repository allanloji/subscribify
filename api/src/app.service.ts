import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getStatistics() {
    const [totalRecipients, totalEmailsSent, totalUnsubscribes] =
      await this.prisma.$transaction([
        this.prisma.recipient.count({
          where: {
            newsletters: {
              some: {},
            },
          },
        }),
        this.prisma.emailLog.aggregate({
          _sum: {
            emailsSent: true,
          },
        }),
        this.prisma.unsubscribeLog.count(),
      ]);

    return {
      totalRecipients: totalRecipients || 0,
      totalEmailsSent: totalEmailsSent._sum.emailsSent || 0,
      totalUnsubscribes: totalUnsubscribes || 0,
    };
  }

  async getUnsubscribesLogsLast30Days() {
    const unsubscribeLogs: { date: Date; count: number }[] = await this.prisma
      .$queryRaw`
    SELECT DATE("createdAt") as date, COUNT(*) as count
    FROM "UnsubscribeLog"
    WHERE "createdAt" >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY DATE("createdAt")
    ORDER BY DATE("createdAt") ASC;
    `;

    const unsubscribeLogsAsNumbers = unsubscribeLogs.map((log) => ({
      date: log.date.toISOString().split('T')[0],
      count: Number(log.count),
    }));

    return unsubscribeLogsAsNumbers;
  }
}
