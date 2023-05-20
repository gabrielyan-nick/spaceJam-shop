import { instance } from 'api/api.interceptor';
import { statisticsUrl } from 'config/url';
import { IStatistics } from 'types/statistics.interface';

const StatisticsService = {
  async getMain() {
    return instance.get<IStatistics[]>(statisticsUrl());
  },
};

export default StatisticsService;
