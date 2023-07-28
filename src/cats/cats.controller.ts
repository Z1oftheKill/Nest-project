import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  Param,
  DefaultValuePipe,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/creat-cat.dto';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptionfilter/http-exception.filter';
import { JoiValidationPipe } from 'src/common/pipe/joivalidation.pipe';
import { createCatSchema } from './interfaces/cat.interface';
// import { RolesGuard } from 'src/common/guard/roles.guard';
// import { Roles } from 'src/common/decorator/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
@Controller('cats')
// @UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  // @Post('testguard')
  // // @Roles('admin')
  // async testguard() {
  //   console.log('testguard');
  // }
  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  //   return '新增成功' + this.catsService.findAll()?.length;
  // }

  @Post()
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return '新增成功' + this.catsService.findAll()?.length;
  }

  @Get('catch')
  @UseFilters(HttpExceptionFilter)
  async findAll() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.catsService.findAll();
  }

  @Get('find')
  findCat(@Query() query: any): string {
    console.log(query);
    return 'This action returns all cats';
  }
  @Get('pipe/:id')
  async pipe(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const res = this.catsService.findOne(id);
    console.log(res);

    console.log(id, typeof id);
    return `这是你的id:${id}`;
  }

  @Get('default')
  async findAll2(
    @Query('sata', new DefaultValuePipe(2), ParseIntPipe) sata: string,
  ) {
    // 参数默认值
    console.log(sata, typeof sata);
    return 'This is your string:' + sata;
  }
}
