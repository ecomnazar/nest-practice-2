import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Put,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUsers(@Req() req: Request, @Res() res: Response) {}

  @Get('/:id')
  async getUser(@Req() req: Request, @Res() res: Response) {}

  @Post('/')
  //   @UseInterceptors(FileInterceptor(''))
  async createUser(@Req() req: Request, @Res() res: Response) {
    await this.userService.createUser(req.body);
    return res.send({ status: 'ok' });
  }

  @Put('/:id')
  async updateUser(@Req() req: Request, @Res() res: Response) {}

  @Patch('/:id')
  async updateUserField(@Req() req: Request, @Res() res: Response) {}

  @Delete('/:id')
  async deleteUser(@Req() req: Request, @Res() res: Response) {}
}
