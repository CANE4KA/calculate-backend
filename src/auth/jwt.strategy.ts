import { Injectable } from "@nestjs/common";
import { ConfigService  } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "src/user/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configureService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configureService.get('JWT_SECRET')
    })
  }

  async validate({id}: {id: string}) {
    return this.userService.getById(id)
  }
}