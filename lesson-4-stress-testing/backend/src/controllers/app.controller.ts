import {Controller, Post, Body} from '@nestjs/common';

import {LogUserData} from '../usecases/log-user-data';

@Controller()
export class AppController {
    constructor(private readonly processDataUseCase: LogUserData) {}

    @Post('/log')
    getHello(@Body() body: any) {
        const {data} = body;
        return this.processDataUseCase.execute(data);
    }
}
