# Atomic Design Structure

โครงสร้าง frontend ของโปรเจกต์นี้ใช้ **Atomic Design Pattern** เพื่อการจัดการ components ที่มีประสิทธิภาพและง่ายต่อการบำรุงรักษา

## 📁 Directory Structure

```
components/
├── atoms/              # ระดับพื้นฐานที่สุด - UI elements ที่เล็กที่สุด
│   ├── button.tsx      # ปุ่มพื้นฐาน
│   ├── input.tsx       # Input field พื้นฐาน
│   ├── label.tsx       # Label พื้นฐาน
│   ├── text.tsx        # Text/Typography component
│   ├── spinner.tsx     # Loading spinner
│   ├── icon.tsx        # Icon wrapper
│   └── index.ts        # Exports ทั้งหมด
│
├── molecules/          # การรวม atoms เข้าด้วยกัน
│   ├── form-field.tsx      # Label + Input + Error message
│   ├── alert-box.tsx       # Alert/Warning/Error box
│   ├── progress-bar.tsx    # Progress indicator
│   └── index.ts
│
├── organisms/          # Component ที่ซับซ้อน รวม molecules + atoms
│   ├── registration-form.tsx      # Form สำหรับลงทะเบียน
│   ├── capacity-indicator.tsx     # แสดงจำนวนที่นั่งคงเหลือ
│   └── index.ts
│
├── templates/          # Page layouts
│   ├── registration-template.tsx  # Template สำหรับหน้าลงทะเบียน
│   └── index.ts
│
└── index.ts           # Central export ทั้งหมด
```

## 🔷 Atomic Design Levels

### 1. Atoms (ส่วนประกอบพื้นฐาน)

องค์ประกอบที่เล็กที่สุด ไม่สามารถแบ่งย่อยได้อีก เช่น:

**Button** - ปุ่มพื้นฐานพร้อม variants
```tsx
import { Button } from "@/components/atoms";

<Button variant="default" size="lg">คลิก</Button>
```

**Input** - Input field พื้นฐาน
```tsx
import { Input } from "@/components/atoms";

<Input type="email" placeholder="email@example.com" />
```

**Text** - Typography component พร้อม variants
```tsx
import { Text } from "@/components/atoms";

<Text variant="muted" size="sm">ข้อความ</Text>
```

**Spinner** - Loading indicator
```tsx
import { Spinner } from "@/components/atoms";

<Spinner size="md" />
```

### 2. Molecules (ส่วนประกอบระดับกลาง)

การรวม atoms หลายตัวเข้าด้วยกันเพื่อทำงานเฉพาะอย่าง:

**FormField** - รวม Label, Input และ Error message
```tsx
import { FormField } from "@/components/molecules";

<FormField
  label="อีเมล"
  type="email"
  placeholder="example@email.com"
  required
  error={errors.email?.message}
  {...register("email")}
/>
```

**AlertBox** - แสดงข้อความแจ้งเตือน
```tsx
import { AlertBox } from "@/components/molecules";

<AlertBox variant="danger">เกิดข้อผิดพลาด</AlertBox>
```

**ProgressBar** - แถบความคืบหน้า
```tsx
import { ProgressBar } from "@/components/molecules";

<ProgressBar value={75} max={100} variant="warning" />
```

### 3. Organisms (ส่วนประกอบที่ซับซ้อน)

Component ที่มีความซับซ้อนและรวม molecules + atoms หลายตัว:

**RegistrationForm** - Form สำหรับลงทะเบียนเข้าร่วมสัมมนา
```tsx
import { RegistrationForm } from "@/components/organisms";

<RegistrationForm 
  seminarId="demo-1" 
  isAvailable={true} 
/>
```

**CapacityIndicator** - แสดงจำนวนที่นั่งและสถานะ
```tsx
import { CapacityIndicator } from "@/components/organisms";

<CapacityIndicator 
  capacity={100} 
  registered={75} 
/>
```

### 4. Templates (โครงสร้างหน้า)

Layout ระดับหน้า ที่รวม organisms และ molecules หลายตัว:

**RegistrationTemplate** - Template สำหรับหน้าลงทะเบียน
```tsx
import { RegistrationTemplate } from "@/components/templates";

<RegistrationTemplate
  seminarId="demo-1"
  capacity={100}
  registered={75}
  title="ลงทะเบียนเข้าร่วมสัมมนา"
/>
```

### 5. Pages (อยู่ใน app/)

หน้าจริงที่ใช้ templates และมีข้อมูลจริง - อยู่ใน Next.js App Router (`app/`)

## 📦 การ Import

### แบบ Specific
```tsx
// Import จาก atoms
import { Button, Input, Label } from "@/components/atoms";

// Import จาก molecules
import { FormField, AlertBox } from "@/components/molecules";

// Import จาก organisms
import { RegistrationForm } from "@/components/organisms";
```

### แบบ Central
```tsx
// Import ทุกอย่างจาก components
import { 
  Button, 
  FormField, 
  RegistrationForm 
} from "@/components";
```

## 🎨 Design Principles

### 1. **Single Responsibility**
แต่ละ component ทำหน้าที่เดียวและทำดี

### 2. **Reusability**
Component ถูกออกแบบให้นำกลับมาใช้ได้หลายที่

### 3. **Composition**
สร้าง component ซับซ้อนจากการรวม component เล็กๆ

### 4. **Consistency**
ใช้ design system เดียวกันทั่วทั้งแอป

## 🔧 การพัฒนา Component ใหม่

### เมื่อสร้าง Atom ใหม่:
1. สร้างไฟล์ใน `components/atoms/`
2. ใช้ `React.forwardRef` สำหรับ ref support
3. รองรับ className สำหรับ custom styling
4. Export ใน `components/atoms/index.ts`

### เมื่อสร้าง Molecule ใหม่:
1. สร้างไฟล์ใน `components/molecules/`
2. ใช้ atoms ที่มีอยู่แล้ว
3. มี props ที่ชัดเจนและ type-safe
4. Export ใน `components/molecules/index.ts`

### เมื่อสร้าง Organism ใหม่:
1. สร้างไฟล์ใน `components/organisms/`
2. รวม molecules และ atoms
3. สามารถมี state และ logic ที่ซับซ้อนได้
4. Export ใน `components/organisms/index.ts`

## 🎯 ประโยชน์ของ Atomic Design

✅ **Maintainability** - แก้ไขง่าย เพราะแยกส่วนชัดเจน  
✅ **Scalability** - ขยายโปรเจกต์ได้ง่าย  
✅ **Consistency** - UI สม่ำเสมอทั่วทั้งแอป  
✅ **Reusability** - นำ component กลับมาใช้ซ้ำได้  
✅ **Testability** - ทดสอบแต่ละส่วนได้อิสระ  
✅ **Documentation** - เข้าใจโครงสร้างได้ง่าย  

## 📚 อ้างอิง

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Component-Driven Development](https://www.componentdriven.org/)
