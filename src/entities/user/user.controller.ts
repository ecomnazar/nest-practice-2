import {
  Controller,
  Get,
  Req,
  Res,
  Param,
  Post,
  Put,
  Delete,
  // UseInterceptors,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.userService.getAllUsers();
    res.send({ status: 'ok', data: users });
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const userData = await this.userService.getUser(id);
    res.send({ status: 'ok', data: userData });
  }

  @Post('/')
  //   @UseInterceptors(FileInterceptor(''))
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body);
    return res.send({ status: 'ok' });
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    await this.userService.updateUserData(id, body);
    res.send({ status: 'ok' });
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id);
    res.send({ status: 'ok' });
  }
}
