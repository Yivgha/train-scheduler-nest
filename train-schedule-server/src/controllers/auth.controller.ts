import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginDto } from 'src/dto/login.dto';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('user-login')
  async userLogin(@Body() loginDto: LoginDto, @Res() res) {
    try {
      const token = await this.authService.loginUser(loginDto);
      const user = await this.userService.findByEmail(loginDto.email);
      return res.status(HttpStatus.OK).json({ token, user });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid login credentials' });
    }
  }

  @Post('admin-login')
  async adminLogin(@Body() loginDto: LoginDto, @Res() res) {
    try {
      const token = await this.authService.loginAdmin(loginDto);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid login credentials or unauthorized access' });
    }
  }
}
