import { Inject, Controller, Get, Post, Delete, Res, Put, Query, Body,Param } from '@nestjs/common';
import {
  BadRequestException, ConflictException, ForbiddenException, HttpException,
  HttpStatus, InternalServerErrorException, NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { IBusinessService } from '../../domain/incomming/business-service.interface';
import { Business } from '../../domain/model/business/business';
import { PaginatedResult } from '../../../domain/model/paginated-result';
import { AppErrorHandler } from '../error/app-error-handler';
import { BusinessDTO } from '../dto/business.dto';

@Controller()
export class BusinessController {
  constructor(
    @Inject('IBusinessService')
    private readonly businessService: IBusinessService<Business>
  ) { }


  @Get()
  getHello(): string {
    return this.businessService.getHello();
  }

// Get Products /product/all
  // http://localhost:3001/api/webshop/v1/catalog/Business/all?page=1&limit=2&orderBy=name&isAsc=true
  @Get('all')
  async getAll(@Res() res) {
    try {
      const list: Business[] = await this.businessService.getAll();
      return res.status(HttpStatus.OK).json(list);
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    };
  };

  // GET single Business: /product/5c9d46100e2e5c44c444b2d1
  @Get('/id/:BusinessID')
  async getById(@Res() res, @Param('BusinessID') BusinessID) {
    let Business: any;
    try {
      Business = await this.businessService.getById(BusinessID);
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    }
    if (!Business) throw new NotFoundException('Business does not exist!');
    return res.status(HttpStatus.OK).json(Business);
  };

  @Get('/key/:key')
  async getByKey(@Res() res, @Param('key') key) {
    let Business: any;
    try {
      Business = await this.businessService.getByQuery({key: key});
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    }
    if (!Business) throw new NotFoundException('Business does not exist!');
    return res.status(HttpStatus.OK).json(Business);
  };

  // Add Business: /Business/create
  @Post('create')
  async createBusiness(@Res() res, @Body() createBusinessDTO: any) {
    let newCat: Business;
    try {
      newCat = await this.businessService.create(createBusinessDTO);
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    }
    if (!newCat) throw new NotFoundException('Business does not exist or canot delete Business!');
    return res.status(HttpStatus.OK).json({
      message: 'Business Created Successfully',
      Business: newCat
    })
  };

  // Delete Business: /delete?id=5c9d45e705ea4843c8d0e8f7
  @Delete('delete')
  async deleteBusiness(@Res() res, @Query('id') id) {
    if (!id) throw new BadRequestException('Param id not specified!');
    let BusinessDeleted: boolean;;
    try {
      BusinessDeleted = await this.businessService.delete(id);
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    }
    if (!BusinessDeleted) throw new NotFoundException('Business does not exist or canot delete Business!');
    return res.status(HttpStatus.OK).json({
      message: 'Business Deleted Successfully',
      deleted: BusinessDeleted
    })
  };

  // Update Business: /update?id=5c9d45e705ea4843c8d0e8f7
  @Put('update')
  async updateBusiness(@Res() res, @Body() BusinessDTO: BusinessDTO, @Query('id') id) {
    if (!id) throw new BadRequestException('Param id not specified!');
    /*
    let Business: Business;
    try {
      Business = new Business(BusinessDTO);
    } catch (error) {
      throw new BadRequestException('Business data malformed: ' + error.message);
    }
    */
    let updatedBusiness: any;
    try {
      updatedBusiness = await this.businessService.updateById(id, BusinessDTO);
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    };
    if (!updatedBusiness) throw new NotFoundException('Problem in creation. Business does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Business Updated Successfully',
      updated: updatedBusiness
    })
  };

  // Example: http://localhost:3001/api/webshop/v1/categories/search?page=1&limit=100&orderBy=name&isAsc=true
  @Get('search')
  async search(@Res() res, @Query('page') pageParam, @Query('limit') limitParam, @Query('orderBy') orderBy, @Query('isAsc') isAsc) {
    if (!pageParam || !limitParam || !orderBy || !isAsc) {
      throw new BadRequestException("some parameter is missing: page, limit, orderBy or isAsc");
    }
    try {
      const page: number = parseInt(pageParam);
      const limit: number = parseInt(limitParam);
      const orderByField: string = orderBy.toString();
      const isAscending: boolean = (isAsc === 'true') ? true : false;
      const data: PaginatedResult<any> = await this.businessService.search({}, page, limit, orderByField, isAscending);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw AppErrorHandler.createHttpException(error);
    }
  };


}
