import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe, Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { mapUserDtoToUser } from './mappers/mapUserDtoToUser';
import { IUserService } from './interfaces/user.service.interface';

@Controller('users')
export class UserController {
  constructor(@Inject(IUserService) private readonly userService: IUserService) {

  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const user = await this.userService.createUser(
        mapUserDtoToUser(createUserDto),
      );
      return new UserResponseDto(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    try {
      const user = await this.userService.getUserById(id);
      return new UserResponseDto(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // @Put(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() user: Partial<User>
  // ): Promise<UserResponseDto> {
  //   try {
  //     const updatedUser = await this.userService.updateUser(id, user);
  //     return new UserResponseDto(updatedUser);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Delete(':id')
  // async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   try {
  //     await this.userService.deleteUser(id);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
