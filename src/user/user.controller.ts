import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, Get } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

}
