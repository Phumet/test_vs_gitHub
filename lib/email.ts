import { Resend } from 'resend';
import { config } from './config';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendConfirmationEmailParams {
  to: string;
  name: string;
  registrationId: string;
  seminarTitle: string;
  seminarDate: string;
  seminarVenue: string;
  seminarTime: string;
}

export async function sendConfirmationEmail({
  to,
  name,
  registrationId,
  seminarTitle,
  seminarDate,
  seminarVenue,
  seminarTime,
}: SendConfirmationEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [to],
      subject: `✅ ยืนยันการลงทะเบียน: ${seminarTitle}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ยืนยันการลงทะเบียน</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0366D6 0%, #28A745 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎯 GitHub Copilot Seminar</h1>
  </div>
  
  <div style="background: white; padding: 30px; border: 1px solid #e1e4e8; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #28A745; margin-top: 0;">✅ ลงทะเบียนสำเร็จ!</h2>
    
    <p>สวัสดีคุณ <strong>${name}</strong>,</p>
    
    <p>ขอบคุณที่ลงทะเบียนเข้าร่วมสัมมนา GitHub Copilot ของเรา! เราได้รับข้อมูลของคุณเรียบร้อยแล้ว</p>
    
    <div style="background: #f6f8fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <h3 style="margin-top: 0; color: #0366D6;">📋 รายละเอียดการสัมมนา</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0;"><strong>หัวข้อ:</strong></td>
          <td style="padding: 8px 0;">${seminarTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>วันที่:</strong></td>
          <td style="padding: 8px 0;">${new Date(seminarDate).toLocaleDateString('th-TH', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>เวลา:</strong></td>
          <td style="padding: 8px 0;">${seminarTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>สถานที่:</strong></td>
          <td style="padding: 8px 0;">${seminarVenue}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>รหัสลงทะเบียน:</strong></td>
          <td style="padding: 8px 0;"><code style="background: #fff; padding: 4px 8px; border-radius: 4px; border: 1px solid #e1e4e8;">${registrationId}</code></td>
        </tr>
      </table>
    </div>
    
    <div style="background: #fff3cd; border-left: 4px solid #FFC107; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>💡 หมายเหตุ:</strong> กรุณาเก็บรหัสลงทะเบียนไว้สำหรับการเช็คอินในวันงาน</p>
    </div>
    
    <p>หากมีคำถามหรือต้องการความช่วยเหลือ กรุณาติดต่อเราได้ตลอดเวลา</p>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="${config.app.url}/check" style="background: #0366D6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">ตรวจสอบสถานะการลงทะเบียน</a>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #6a737d; font-size: 14px;">
    <p>© 2026 GitHub Copilot Seminar. All rights reserved.</p>
    <p>Built with ❤️ using GitHub Copilot</p>
  </div>
</body>
</html>
      `,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      return { success: false, error };
    }

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Exception sending email:', error);
    return { success: false, error };
  }
}
