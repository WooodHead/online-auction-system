import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from 'src/users/entities/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {
    //? Setup JWT Options
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
    });
  }

  /**
   * The return value of this method will be assigned to req.user
   * @param payload :JwtPayload
   * @returns user instance
   */
  async validate(req: Request, { sub }: JwtPayload): Promise<UserDocument> {
    const user: UserDocument = await this.usersService.findById(sub);
    if (!user) throw new ForbiddenException('Access Denied ❌');

    return user;
  }
}
