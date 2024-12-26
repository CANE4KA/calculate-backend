import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    const {password, ...user} = await this.validateUser(dto)
    const token = this.issueToken(user.id)

    return {
      user, ...token
    }
  }

  async register(dto: AuthDto) {
    const isUser = await this.userService.getByEmail(dto.email)
    if(isUser) throw new BadRequestException('User already exists') 

    const {password, ...user} = await this.userService.create(dto)

    const token = this.issueToken(user.id)

    return {
      user, ...token
    }
  }

  private issueToken(userId: string) {
    const data = {id: userId}

    const accessToken = this.jwt.sign(data, {expiresIn: '30s'})
    
    return {accessToken}
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if(!user) throw new NotFoundException('User not found')

    const isValid = await verify(user.password, dto.password)

    if(!isValid) throw new UnauthorizedException('Invalid password')

    return user
  }
}

