import { Controller, Get, Post, Res, Query, Body, HttpStatus } from '@nestjs/common';
import { BusinessService } from '../../domain/business.service';

@Controller()
export class BusinessController {
  constructor(private readonly appService: BusinessService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  async createBusiness(@Res() res, @Body() body: any): Promise<any> {
    const result: any = await this.appService.createVaiable(body.key, body.values);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('get')
  async getBusiness(@Res() res, @Query('key') key): Promise<any> {
    const result: any = await this.appService.getBusiness(key);
    return res.status(HttpStatus.OK).json(result);
  }

}
