import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { comparePasswords } from 'src/utils/password.helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginDto: LoginDto) {
    if (!loginDto.password || !loginDto.email) {
      throw new UnauthorizedException('Missing email or password');
    }

    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (user) {
      const payload = { id: user.id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h',
      });

      return token;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async loginAdmin(loginDto: LoginDto): Promise<string> {
    if (!loginDto.password || !loginDto.email) {
      throw new UnauthorizedException('Missing email or password');
    }

    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException(
        'Only admin can have access to this page',
      );
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h',
    });

    return token;
  }
}
