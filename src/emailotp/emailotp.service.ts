import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendOtpDto, VerifyOtpDto } from './dto/emailotp.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as nodemailer from 'nodemailer';
@Injectable()
export class EmailotpService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}
  async sendOtp(sendOtpDto: SendOtpDto):Promise<{ success: boolean, message: string }> {
    try {
      const { email } = sendOtpDto;
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(email, otp);
      const query=`call emailotpsend(?,?)`;
      const params=[email,otp];
      await this.entityManager.query(query,params);
      this.sendEmail(email, otp);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message || 'Failed to send OTP');
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto):Promise<{ success: boolean, message: string }> {
    try {
      const { email, otp } = verifyOtpDto;
      const query=`call emailotpverify(?,?)`;
      const params=[email,otp];
      const res=await this.entityManager.query(query,params);
      if(res.length>0 && res[0][0].activeStatus==1){
        return { success: true, message: 'OTP verified successfully' };
      }else{
        return { success: false, message: 'OTP verification failed' };
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message || 'Failed to verify OTP');
    }
  }
  async sendEmail(email: string, otp: number) {
    try {

      const mail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP for verification',
        text: `Your OTP for verification is ${otp}`,
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      await transporter.sendMail(mail);
    } catch (error) {
      console.log(error);
    }
  }
}
