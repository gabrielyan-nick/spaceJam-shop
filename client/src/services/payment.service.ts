import { instance } from 'api/api.interceptor';
import { paymentUrl, statisticsUrl } from 'config/url';
import { IStatistics } from 'types/statistics.interface';

const PaymentService = {
  async createPayment(amount: number) {
    const { data } = await instance.post(paymentUrl(), { amount });

    return data;
  },
};

export default PaymentService;
