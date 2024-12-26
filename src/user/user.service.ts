import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async getProfile(userId: string) {
    const profile = await this.getById(userId)

    const { password, ...rest } = profile
    const {id,createdAt,updatedAt,email,name, ...currencies} = rest

    return {
      user: rest,
      currencies: [
        {
          currency: 'usdt',
          amount: currencies.usdt
        },
        {
          currency: 'btc',
          amount: currencies.btc
        },
        {
          currency: 'eth',
          amount: currencies.eth
        },
        {
          currency: 'matic',
          amount: currencies.matic
        }
      ]
    }
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
      totalInUsdt: 0,
      usdt: 0,
      btc: 0,
      eth: 0,
      matic: 0,
    }

    return this.prisma.user.create({
      data: user
    })
  }
  
  async update(id: string, dto: UserDto) {
    const user = await this.getById(id)

    const currencyRates = {
        btc: 96424.10,
        eth: 3352.74,
        matic: 0.48,
    }


    let totalInUsdtIncrement = 0

    const updatedData = {
        ...dto,
        usdt: dto.usdt ? user.usdt + dto.usdt : user.usdt,
        btc: dto.btc ? user.btc + dto.btc : user.btc,
        eth: dto.eth ? user.eth + dto.eth : user.eth,
        matic: dto.matic ? user.matic + dto.matic : user.matic
    };

    if (dto.usdt) totalInUsdtIncrement += dto.usdt
    if (dto.btc) totalInUsdtIncrement += dto.btc * currencyRates.btc
    if (dto.eth) totalInUsdtIncrement += dto.eth * currencyRates.eth
    if (dto.matic) totalInUsdtIncrement += dto.matic * currencyRates.matic

    const data = {
        ...updatedData,
        totalInUsdt: user.totalInUsdt + totalInUsdtIncrement
    }

    return this.prisma.user.update({
        where: {
            id
        },
        data,
        select: {
            name: true,
            email: true,
            totalInUsdt: true,
            usdt: true,
            btc: true,
            eth: true,
            matic: true
        },
    })
  }
}
