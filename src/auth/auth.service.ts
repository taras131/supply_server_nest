import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt.interface';
import type { Request, Response } from 'express';
import { CompanyService } from '../company/company.service';
import { v4 } from 'uuid';

interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async validate(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User does not exist: ${id}`);
    }
    return user;
  }

  private generationTokens(id: string) {
    const payload: JwtPayload = {
      id: id,
    };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });
    return { access_token, refresh_token };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refresh_token', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: false,
      sameSite: 'none',
    });
  }

  private auth(res: Response, id: string) {
    const { access_token, refresh_token } = this.generationTokens(id);
    this.setCookie(res, refresh_token, new Date(60 * 60 * 60 * 24 * 30));
    return { access_token };
  }

  async refresh(req: RequestWithCookies, res: Response) {
    const refresh_token = req.cookies['refresh_token'];
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found');
    }
    const payload =
      await this.jwtService.verifyAsync<JwtPayload>(refresh_token);
    if (payload && payload.id) {
      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return this.auth(res, user.id);
    }
  }

  async login(res: Response, dto: LoginDto) {
    const { email, password } = dto;
    const candidate = await this.userService.findByEmail(email);
    if (!candidate) {
      throw new NotFoundException('Пользователя с таким email не существует');
    }
    const isValidPassword = await bcrypt.compare(password, candidate.password);
    if (!isValidPassword) {
      throw new NotFoundException('Пользователя с таким паролеи не существует');
    }
    return this.auth(res, candidate.id);
  }

  async register(res: Response, dto: RegisterDto) {
    const existUser = await this.userService.findByEmail(dto.email);
    if (existUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }
    const hashedPass = await bcrypt.hash(dto.password, 4);
    if (dto.company_id.length < 4) {
      const { id } = await this.companyService.create({
        name: dto.company_name as string,
        owner_email: dto.email,
        logo_path: '',
        INN: '',
        city: '',
        kpp: '',
        legal_address: '',
        bik: '',
        correspondent_account: '',
        payment_account: '',
        bank: '',
        okogu: '',
        ogrn: '',
        okpo: '',
        okato: '',
      });
      dto.company_id = id;
    }
    if (!dto.id) dto.id = v4();
    const createdUser = await this.userService.create({
      ...dto,
      password: hashedPass,
    });
    return this.auth(res, createdUser.id);
  }

  async logout(res: Response) {
    this.setCookie(res, 'refresh_token', new Date(0));
  }
}
