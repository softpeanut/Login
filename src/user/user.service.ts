import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createUserDto): Promise<any> {
        const isExist = await this.userRepository.findOne({ userId: createUserDto.userId });
        if (isExist) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`이미 등록된 사용자입니다.`],
                error: 'Forbidden'
            })
        }

        const { password, ...result } = await this.userRepository.save(createUserDto);
        return result;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            select: ["seq", "userId", "userName", "role"],
        });
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id, {
            select: ["seq", "userId", "userName", "role"],
        });
    }
}
