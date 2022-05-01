import {Injectable} from '@nestjs/common';

import {PrometheusClient} from './prometheus.client';

@Injectable()
export class MetricsService {
    constructor(private promClientService: PrometheusClient) {}

    public getMetrics(): Promise<string> {
        return this.promClientService.getMetrics();
    }
}
