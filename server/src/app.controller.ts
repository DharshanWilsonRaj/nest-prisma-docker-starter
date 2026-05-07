import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    return this.appService.getHealth();
  }

  @Get('backend-health')
  async getBackendHealth() {
    return this.appService.getBackendHealth();
  }

  @Get('users')
  async getAllUsers(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.appService.getAllUsers(Number(page), Number(limit));
  }

  @Get('users/search')
  async searchUsers(@Query('email') email: string = '', @Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    if (!email) {
      return this.appService.getAllUsers(Number(page), Number(limit));
    }
    return this.appService.searchUsersByEmail(email, Number(page), Number(limit));
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getUserById(id);
  }
}
