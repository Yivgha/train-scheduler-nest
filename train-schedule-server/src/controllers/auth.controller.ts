import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginDto } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-login')
  async userLogin(@Body() loginDto: LoginDto, @Res() res) {
    const token = await this.authService.loginUser(loginDto);
    return res.status(200).json({ token });
  }

  @Post('admin-login')
  async adminLogin(@Body() loginDto: LoginDto, @Res() res) {
    const token = await this.authService.loginAdmin(loginDto);
    return res.status(200).json({ token });
  }
}
