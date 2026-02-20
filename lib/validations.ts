import { z } from 'zod';

// Registration form validation schema
export const registrationSchema = z.object({
  name: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร').max(100, 'ชื่อยาวเกินไป'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  phone: z.string()
    .min(9, 'เบอร์โทรศัพท์ไม่ถูกต้อง')
    .max(15, 'เบอร์โทรศัพท์ไม่ถูกต้อง')
    .regex(/^[0-9+-\s()]+$/, 'เบอร์โทรศัพท์ไม่ถูกต้อง'),
  organization: z.string().min(2, 'ชื่อองค์กรต้องมีอย่างน้อย 2 ตัวอักษร').max(200, 'ชื่อองค์กรยาวเกินไป'),
  seminarId: z.string(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// Check registration schema
export const checkRegistrationSchema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
});

// Admin password schema
export const adminPasswordSchema = z.object({
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
});
