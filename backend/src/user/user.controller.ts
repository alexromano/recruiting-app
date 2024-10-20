import { Controller, Get, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUser() {
        return this.userService.getUser();
    }

    @Put()
    updateKeywords(@Body() body: { keywords: string[] }) {
        return this.userService.updateKeywords(body.keywords);
    }
}