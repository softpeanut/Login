import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from "@nestjs/common";
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/user/dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'userId'
        });
    }

    async validate(userId: string, password: string): Promise<any> {
        let loginUserDto: LoginUserDto = {
            userId: userId,
            password: password,
        }

        const user = await this.authService.validateUser(loginUserDto);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}