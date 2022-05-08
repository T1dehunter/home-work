import {Controller, Post, Get, Param} from '@nestjs/common';

import {FillUserData} from '../usecases/fill-user-data';
import {GetUserData} from '../usecases/get-user-data';

@Controller()
export class AppController {
    constructor(private readonly fillUserDataUseCase: FillUserData, private readonly getDataUseCase: GetUserData) {}

    @Post('/fill-user-data')
    fillUserData() {
        return this.fillUserDataUseCase.execute();
    }

    @Get('/get-user-data/:userID')
    getUserData(@Param() params) {
        const {userID} = params;
        return this.getDataUseCase.execute();
    }
}
