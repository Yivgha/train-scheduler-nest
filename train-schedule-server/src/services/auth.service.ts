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

  private async validateUserAndPassword(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private generateToken(user: {
    id: number;
    email: string;
    role: string;
    name: string;
  }) {
    return this.jwtService.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      { secret: process.env.JWT_SECRET, expiresIn: '24h' },
    );
  }

  async loginUser(loginDto: LoginDto) {
    const user = await this.validateUserAndPassword(
      loginDto.email,
      loginDto.password,
    );
    const token = this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
    return { token, user };
  }

  async loginAdmin(loginDto: LoginDto): Promise<string> {
    const user = await this.validateUserAndPassword(
      loginDto.email,
      loginDto.password,
    );

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Admin access only');
    }

    return this.generateToken(user);
  }
}
