import {Controller, Post, Body} from '@nestjs/common';

import {ProcessData} from '../usecases/process-data';

@Controller()
export class AppController {
    constructor(private readonly processDataUseCase: ProcessData) {}

    @Post('/process')
    getHello(@Body() body: any) {
        const {data} = body;
        return this.processDataUseCase.execute(data);
    }
}
