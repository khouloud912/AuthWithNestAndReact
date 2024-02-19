import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authenticationService: AuthService
      ) {}

      @Post('register')
      async register(@Body() registrationData: CreateUserDto) {
        return this.authenticationService.register(registrationData);
      }

      @HttpCode(HttpStatus.OK)
      @Post('login')
      login(@Body() signInDto: CreateUserDto ) {
        return this.authenticationService.login(signInDto.fullName, signInDto.password);
      }
    
      @UseGuards(AuthGuard)
      @Get('profile')
      getProfile(@Request() req) {
        return req.user;
      }

}
