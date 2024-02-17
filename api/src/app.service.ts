import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

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
      totalRecipients,
      totalEmailsSent: totalEmailsSent._sum.emailsSent,
      totalUnsubscribes,
    };
  }

  async getUnsubscribesLogsLast30Days() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const unsubscribeLogs = await this.prisma.unsubscribeLog.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
          lte: now,
        },
      },
      _count: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return unsubscribeLogs.map((log) => ({
      date: log.createdAt,
      count: log._count.createdAt,
    }));
  }
}
