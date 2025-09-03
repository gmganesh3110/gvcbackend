import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailotpService } from './emailotp.service';
import { SendOtpDto, VerifyOtpDto } from './dto/emailotp.dto';

@Controller('emailotp')
export class EmailotpController {
  constructor(private readonly emailotpService: EmailotpService) {}

  @Post("sendotp") 
  sendOtp(@Body() sendOtpDto: SendOtpDto): Promise<{ success: boolean, message: string }> {
    return this.emailotpService.sendOtp(sendOtpDto);
  }
  @Post("verify-otp")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<{ success: boolean, message: string }> {
    return this.emailotpService.verifyOtp(verifyOtpDto);
  }
}
