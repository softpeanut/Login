import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from 'src/user/dto/login.dto';
import { ForbiddenException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne({ userId: loginUserDto.userId });

        if (!user) {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`등록되지 않은 사용자입니다.`],
                error: 'Forbidden'
            })
        }

        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

        if (isMatch) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: [`사용자 정보가 일치하지 않습니다.`],
                error: 'Forbidden'
            })
        }
    }

    async login(user: any) {
        const payload = { userId: user.userId, userName: user.userName, seq: user.seq, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
