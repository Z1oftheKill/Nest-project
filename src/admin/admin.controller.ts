import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('admin')
export class AdminController {
  @Get()
  index(@Req() request: Request): string {
    return 'Admin page';
  }
}
