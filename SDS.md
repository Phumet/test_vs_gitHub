# Software Design Specification (SDS)
## GitHub Copilot Seminar Registration System

**Version:** 1.0  
**Date:** February 20, 2026  
**Project:** GitHub Copilot Workshop Registration Platform

---

## 📋 Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [System Architecture](#3-system-architecture)
4. [Database Design](#4-database-design)
5. [Component Design](#5-component-design)
6. [API Design](#6-api-design)
7. [Sequence Diagrams](#7-sequence-diagrams)
8. [Deployment Architecture](#8-deployment-architecture)
9. [Security Design](#9-security-design)

---

## 1. Introduction

### 1.1 Purpose
This document describes the software design for the GitHub Copilot Seminar Registration System, a web-based platform for managing seminar registrations with capacity management, email notifications, and administrative dashboard.

### 1.2 Scope
The system provides:
- Public registration interface
- Real-time capacity tracking
- Email confirmation system
- Registration status checking
- Administrative dashboard with analytics and data export

### 1.3 Technology Stack
- **Frontend:** Next.js 14 (React 18, TypeScript)
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Email:** Resend
- **Hosting:** Vercel
- **Design Pattern:** Atomic Design

---

## 2. System Overview

### 2.1 System Context Diagram

```mermaid
C4Context
    title System Context - GitHub Copilot Registration System
    
    Person(user, "Public User", "Attendee who wants to register")
    Person(admin, "Administrator", "Staff managing registrations")
    
    System(regSystem, "Registration System", "Manages seminar registrations")
    
    System_Ext(email, "Resend Email Service", "Sends confirmation emails")
    System_Ext(db, "Supabase PostgreSQL", "Stores registration data")
    
    Rel(user, regSystem, "Registers for seminar", "HTTPS")
    Rel(admin, regSystem, "Manages registrations", "HTTPS")
    Rel(regSystem, email, "Sends emails", "API")
    Rel(regSystem, db, "Reads/Writes data", "SQL")
```

### 2.2 High-Level Features

```mermaid
mindmap
  root((Registration System))
    Public Interface
      Registration Form
      Status Check
      Success Page
    Admin Interface
      Dashboard
      Statistics
      Search & Filter
      CSV Export
    Backend Services
      Registration API
      Validation
      Capacity Management
      Email Service
    Data Layer
      PostgreSQL Database
      Prisma ORM
```

---

## 3. System Architecture

### 3.1 Overall Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
    end
    
    subgraph "Vercel Edge Network"
        CDN[CDN & Edge Functions]
    end
    
    subgraph "Application Layer - Next.js 14"
        SSR[Server-Side Rendering]
        SSG[Static Site Generation]
        API[API Routes]
        MW[Middleware]
    end
    
    subgraph "Business Logic Layer"
        REG[Registration Service]
        VAL[Validation Service]
        CAP[Capacity Manager]
        EMAIL[Email Service]
    end
    
    subgraph "Data Layer"
        PRISMA[Prisma ORM]
        DB[(PostgreSQL<br/>Supabase)]
    end
    
    subgraph "External Services"
        RESEND[Resend Email API]
    end
    
    Browser --> CDN
    CDN --> SSR
    CDN --> SSG
    CDN --> API
    API --> MW
    MW --> REG
    REG --> VAL
    REG --> CAP
    REG --> EMAIL
    REG --> PRISMA
    PRISMA --> DB
    EMAIL --> RESEND
    
    style Browser fill:#e3f2fd
    style DB fill:#fff9c4
    style RESEND fill:#e0f2f1
```

### 3.2 Atomic Design Architecture

```mermaid
graph LR
    subgraph "Atoms"
        A1[Button]
        A2[Input]
        A3[Label]
        A4[Text]
        A5[Spinner]
        A6[Icon]
    end
    
    subgraph "Molecules"
        M1[FormField]
        M2[AlertBox]
        M3[ProgressBar]
    end
    
    subgraph "Organisms"
        O1[RegistrationForm]
        O2[CapacityIndicator]
    end
    
    subgraph "Templates"
        T1[RegistrationTemplate]
    end
    
    subgraph "Pages"
        P1[HomePage]
        P2[SuccessPage]
        P3[CheckPage]
        P4[AdminPage]
    end
    
    A1 --> M1
    A2 --> M1
    A3 --> M1
    M1 --> O1
    M2 --> O1
    A4 --> M3
    M3 --> O2
    O1 --> T1
    O2 --> T1
    T1 --> P1
    
    style A1 fill:#ffebee
    style M1 fill:#e1f5fe
    style O1 fill:#f3e5f5
    style T1 fill:#e8f5e9
    style P1 fill:#fff3e0
```

---

## 4. Database Design

### 4.1 Entity Relationship Diagram

```mermaid
erDiagram
    SEMINAR ||--o{ REGISTRATION : has
    
    SEMINAR {
        string id PK
        string title
        text description
        datetime date
        string startTime
        string endTime
        string venue
        int capacity
        int registeredCount
        string status
        datetime createdAt
        datetime updatedAt
    }
    
    REGISTRATION {
        string id PK
        string seminarId FK
        string name
        string email
        string phone
        string organization
        string status
        datetime registrationDate
    }
```

### 4.2 Database Schema Details

```mermaid
classDiagram
    class Seminar {
        +String id
        +String title
        +String description
        +DateTime date
        +String startTime
        +String endTime
        +String venue
        +Int capacity
        +Int registeredCount
        +String status
        +DateTime createdAt
        +DateTime updatedAt
        +Registration[] registrations
    }
    
    class Registration {
        +String id
        +String seminarId
        +String name
        +String email
        +String phone
        +String organization
        +String status
        +DateTime registrationDate
        +Seminar seminar
    }
    
    Seminar "1" --> "*" Registration : has
```

### 4.3 Indexes and Constraints

```mermaid
graph TD
    subgraph "Seminar Table"
        S1[Primary Key: id]
        S2[Index: status]
        S3[Index: date]
    end
    
    subgraph "Registration Table"
        R1[Primary Key: id]
        R2[Foreign Key: seminarId]
        R3[Unique: seminarId + email]
        R4[Index: email]
        R5[Index: registrationDate]
    end
    
    R2 -.->|references| S1
```

---

## 5. Component Design

### 5.1 Component Hierarchy

```mermaid
graph TD
    ROOT[App Root]
    
    ROOT --> LAYOUT[Layout]
    ROOT --> PAGES[Pages]
    
    PAGES --> HOME[/ Home]
    PAGES --> SUCCESS[/success]
    PAGES --> CHECK[/check]
    PAGES --> ADMIN[/admin]
    
    HOME --> REG_TEMP[RegistrationTemplate]
    REG_TEMP --> REG_FORM[RegistrationForm]
    REG_TEMP --> CAP_IND[CapacityIndicator]
    
    REG_FORM --> FORM_FIELD1[FormField: Name]
    REG_FORM --> FORM_FIELD2[FormField: Email]
    REG_FORM --> FORM_FIELD3[FormField: Phone]
    REG_FORM --> FORM_FIELD4[FormField: Organization]
    REG_FORM --> BUTTON[Button: Submit]
    
    FORM_FIELD1 --> LABEL[Label]
    FORM_FIELD1 --> INPUT[Input]
    FORM_FIELD1 --> ALERT[AlertBox]
    
    CAP_IND --> PROGRESS[ProgressBar]
    CAP_IND --> TEXT[Text]
    
    style ROOT fill:#fff3e0
    style PAGES fill:#e8f5e9
    style REG_FORM fill:#e1f5fe
    style FORM_FIELD1 fill:#f3e5f5
    style LABEL fill:#ffebee
```

### 5.2 Component Communication

```mermaid
sequenceDiagram
    participant User
    participant Page
    participant Form
    participant API
    participant DB
    
    User->>Page: Visit /
    Page->>DB: Fetch seminar data
    DB-->>Page: Return seminar
    Page->>Form: Render with data
    Form-->>User: Show form
    
    User->>Form: Fill & submit
    Form->>Form: Validate (Zod)
    Form->>API: POST /api/register
    API->>DB: Check capacity
    API->>DB: Create registration
    API->>API: Send email
    API-->>Form: Return success
    Form->>Page: Redirect to /success
```

---

## 6. API Design

### 6.1 API Architecture

```mermaid
graph LR
    subgraph "API Routes"
        R1[POST /api/register]
        R2[GET /api/check]
        R3[POST /api/admin/auth]
        R4[GET /api/admin/registrations]
    end
    
    subgraph "Middleware"
        M1[Validation]
        M2[Error Handling]
        M3[Authentication]
    end
    
    subgraph "Services"
        S1[Registration Service]
        S2[Email Service]
        S3[Auth Service]
    end
    
    subgraph "Database"
        DB[(Prisma + PostgreSQL)]
    end
    
    R1 --> M1
    R1 --> M2
    R2 --> M1
    R3 --> M3
    R4 --> M3
    
    M1 --> S1
    M3 --> S3
    S1 --> DB
    S1 --> S2
    S3 --> DB
    
    style R1 fill:#e3f2fd
    style M1 fill:#f3e5f5
    style S1 fill:#e8f5e9
    style DB fill:#fff9c4
```

### 6.2 API Endpoints Specification

```mermaid
graph TD
    subgraph "Public APIs"
        POST1["POST /api/register
        Body: name, email, phone, org, seminarId
        Response: registrationId
        Status: 201 Created"]
        
        GET1["GET /api/check?email=xxx
        Query: email
        Response: registration details
        Status: 200 OK"]
    end
    
    subgraph "Admin APIs"
        POST2["POST /api/admin/auth
        Body: password
        Response: token
        Status: 200 OK"]
        
        GET2["GET /api/admin/registrations
        Headers: Cookie (auth)
        Response: registrations[]
        Status: 200 OK"]
    end
    
    style POST1 fill:#c8e6c9
    style GET1 fill:#bbdefb
    style POST2 fill:#ffecb3
    style GET2 fill:#ffccbc
```

---

## 7. Sequence Diagrams

### 7.1 Registration Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Registration Form
    participant API as API Route
    participant Val as Validator
    participant DB as Database
    participant Email as Email Service
    
    User->>UI: Enter registration details
    User->>UI: Click "ลงทะเบียน"
    
    UI->>UI: Validate form (react-hook-form + Zod)
    
    alt Validation fails
        UI-->>User: Show error messages
    else Validation success
        UI->>API: POST /api/register
        
        API->>Val: Validate input (Zod)
        Val-->>API: Valid
        
        API->>DB: Check seminar exists
        DB-->>API: Seminar found
        
        API->>DB: Check capacity
        
        alt Capacity full
            DB-->>API: Full
            API-->>UI: 400 - Capacity full
            UI-->>User: Show error
        else Capacity available
            API->>DB: Check duplicate email
            
            alt Email exists
                DB-->>API: Exists
                API-->>UI: 400 - Already registered
                UI-->>User: Show error
            else New registration
                API->>DB: Create registration
                API->>DB: Increment counter
                DB-->>API: Registration created
                
                API->>Email: Send confirmation
                Email-->>API: Sent (async)
                
                API-->>UI: 201 - Success + ID
                UI->>UI: Redirect to /success?id=xxx
                UI-->>User: Show success page
            end
        end
    end
```

### 7.2 Check Status Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Check Page
    participant API as API Route
    participant DB as Database
    
    User->>UI: Visit /check
    UI-->>User: Show search form
    
    User->>UI: Enter email
    User->>UI: Click "ค้นหา"
    
    UI->>API: GET /api/check?email=xxx
    API->>API: Validate email format
    
    alt Invalid email
        API-->>UI: 400 - Invalid input
        UI-->>User: Show error
    else Valid email
        API->>DB: Find by email (lowercase)
        
        alt Not found
            DB-->>API: Null
            API-->>UI: 404 - Not found
            UI-->>User: "ไม่พบข้อมูล"
        else Found
            DB-->>API: Registration data
            API-->>UI: 200 - Registration details
            UI-->>User: Show registration info
        end
    end
```

### 7.3 Admin Authentication Flow

```mermaid
sequenceDiagram
    actor Admin
    participant UI as Admin Layout
    participant API as Auth API
    participant Cookie as Browser Cookie
    participant Dashboard as Admin Page
    
    Admin->>UI: Visit /admin
    UI->>Cookie: Check auth cookie
    
    alt No cookie
        UI-->>Admin: Show password prompt
        Admin->>UI: Enter password
        UI->>API: POST /api/admin/auth
        API->>API: Compare with ADMIN_PASSWORD
        
        alt Incorrect password
            API-->>UI: 401 - Unauthorized
            UI-->>Admin: "รหัสผ่านไม่ถูกต้อง"
        else Correct password
            API->>Cookie: Set auth=true (httpOnly)
            API-->>UI: 200 - Success
            UI->>Dashboard: Render dashboard
            Dashboard-->>Admin: Show data
        end
    else Has cookie
        UI->>Dashboard: Render dashboard
        Dashboard-->>Admin: Show data
    end
```

### 7.4 Admin Data Export Flow

```mermaid
sequenceDiagram
    actor Admin
    participant UI as Admin Dashboard
    participant API as Admin API
    participant DB as Database
    participant CSV as Papa Parse
    
    Admin->>UI: Click "Export CSV"
    UI->>API: GET /api/admin/registrations
    API->>DB: SELECT * FROM registrations
    DB-->>API: All registrations
    API-->>UI: JSON data
    UI->>CSV: Process data
    CSV->>CSV: Convert to CSV
    CSV-->>UI: CSV blob
    UI->>UI: Create download link
    UI-->>Admin: Download file
```

---

## 8. Deployment Architecture

### 8.1 Deployment Diagram

```mermaid
graph TB
    subgraph "Client"
        Browser[Web Browser]
    end
    
    subgraph "Vercel Platform"
        subgraph "Edge Network - Global CDN"
            Edge1[Edge - Singapore]
            Edge2[Edge - Tokyo]
            Edge3[Edge - Sydney]
        end
        
        subgraph "Next.js Serverless Functions"
            Func1[Page Renders]
            Func2[API Routes]
        end
        
        subgraph "Static Assets"
            Static[/_next/static/]
        end
    end
    
    subgraph "Supabase - Singapore"
        PG[(PostgreSQL Database)]
        Pool[Connection Pooling]
    end
    
    subgraph "Resend"
        EmailAPI[Email API]
    end
    
    Browser -->|HTTPS| Edge1
    Browser -->|HTTPS| Edge2
    Edge1 --> Func1
    Edge1 --> Func2
    Edge2 --> Static
    
    Func2 --> Pool
    Pool --> PG
    Func2 --> EmailAPI
    
    style Browser fill:#e3f2fd
    style Edge1 fill:#c8e6c9
    style Func2 fill:#fff9c4
    style PG fill:#ffccbc
    style EmailAPI fill:#e0f2f1
```

### 8.2 Infrastructure Components

```mermaid
graph LR
    subgraph "DNS"
        DNS[Vercel DNS]
    end
    
    subgraph "CDN & Edge"
        CDN[Global CDN]
        SSL[SSL/TLS Certificates]
    end
    
    subgraph "Compute"
        Serverless[Serverless Functions]
        Build[Build System]
    end
    
    subgraph "Storage"
        Static[Static Files]
        Cache[Edge Cache]
    end
    
    subgraph "Database"
        DB[(PostgreSQL)]
        Backup[(Automated Backups)]
    end
    
    subgraph "Monitoring"
        Analytics[Web Analytics]
        Logs[Function Logs]
    end
    
    DNS --> CDN
    CDN --> SSL
    SSL --> Serverless
    Serverless --> Static
    Serverless --> Cache
    Serverless --> DB
    DB --> Backup
    Serverless --> Logs
    CDN --> Analytics
```

---

## 9. Security Design

### 9.1 Security Architecture

```mermaid
graph TD
    subgraph "Client Side Security"
        HTTPS[HTTPS Only]
        CSP[Content Security Policy]
        CORS[CORS Configuration]
    end
    
    subgraph "Application Security"
        Input[Input Validation - Zod]
        XSS[XSS Prevention]
        CSRF[CSRF Protection]
        RateLimit[Rate Limiting]
    end
    
    subgraph "Authentication"
        AdminAuth[Password Authentication]
        Cookie[HTTPOnly Cookies]
        Session[Session Management]
    end
    
    subgraph "Database Security"
        Prepared[Prepared Statements]
        Encryption[Data Encryption at Rest]
        Pooling[Connection Pooling]
    end
    
    subgraph "API Security"
        Validation[Schema Validation]
        Sanitization[Input Sanitization]
        ErrorHandle[Error Handling]
    end
    
    HTTPS --> Input
    CSP --> XSS
    Input --> Validation
    AdminAuth --> Cookie
    Cookie --> Session
    Validation --> Prepared
    Prepared --> Encryption
    
    style HTTPS fill:#c8e6c9
    style Input fill:#bbdefb
    style AdminAuth fill:#ffecb3
    style Prepared fill:#ffccbc
```

### 9.2 Data Flow Security

```mermaid
sequenceDiagram
    participant Client
    participant Vercel Edge
    participant Next.js
    participant Validation
    participant Prisma
    participant Database
    
    Note over Client,Database: All communication encrypted with TLS 1.3
    
    Client->>Vercel Edge: HTTPS Request
    Vercel Edge->>Vercel Edge: SSL Termination
    Vercel Edge->>Next.js: Forward request
    
    Next.js->>Validation: Validate input (Zod)
    
    alt Invalid Input
        Validation-->>Client: 400 Bad Request
    else Valid Input
        Validation->>Next.js: Validated data
        Next.js->>Prisma: Query with prepared statement
        Prisma->>Database: Parameterized query
        Database-->>Prisma: Encrypted data
        Prisma-->>Next.js: ORM objects
        Next.js->>Next.js: Sanitize output
        Next.js-->>Client: JSON response
    end
```

---

## 10. Performance Design

### 10.1 Caching Strategy

```mermaid
graph TD
    subgraph "Client Cache"
        Browser[Browser Cache]
        LocalStorage[LocalStorage]
    end
    
    subgraph "Edge Cache"
        CDN[CDN Cache]
        Static[Static Assets Cache]
    end
    
    subgraph "Application Cache"
        ISR[Incremental Static Regeneration]
        SWR[Stale While Revalidate]
    end
    
    subgraph "Database Cache"
        Query[Query Cache]
        Connection[Connection Pool]
    end
    
    Browser --> CDN
    CDN --> Static
    Static --> ISR
    ISR --> Query
    SWR --> Connection
    
    style Browser fill:#e3f2fd
    style CDN fill:#c8e6c9
    style ISR fill:#fff9c4
    style Query fill:#ffccbc
```

### 10.2 Performance Optimization

```mermaid
mindmap
  root((Performance))
    Frontend
      Code Splitting
      Lazy Loading
      Image Optimization
      CSS Minification
    Backend
      API Response Caching
      Database Indexing
      Connection Pooling
      Async Email Sending
    Network
      CDN Distribution
      Edge Functions
      HTTP/2
      Compression
    Database
      Indexed Queries
      Optimized Schema
      Query Optimization
      Read Replicas
```

---

## 11. Error Handling

### 11.1 Error Flow

```mermaid
graph TD
    Error[Error Occurs]
    
    Error --> Type{Error Type}
    
    Type -->|Validation| Val[Zod Validation Error]
    Type -->|Database| DB[Prisma Error]
    Type -->|Network| Net[Network Error]
    Type -->|Business Logic| Logic[Business Logic Error]
    
    Val --> Format[Format Error Message]
    DB --> Format
    Net --> Format
    Logic --> Format
    
    Format --> Log[Log to Console/Vercel]
    Log --> Response[Return Error Response]
    
    Response --> Client[Display to User]
    
    Client --> UserFriendly{User Friendly?}
    UserFriendly -->|Yes| Show[Show Error Message]
    UserFriendly -->|No| Generic[Show Generic Message]
    
    style Error fill:#ffebee
    style Format fill:#fff9c4
    style Show fill:#e8f5e9
```

---

## 12. Testing Strategy

### 12.1 Testing Pyramid

```mermaid
graph TD
    subgraph "Testing Layers"
        E2E[End-to-End Tests]
        Integration[Integration Tests]
        Unit[Unit Tests]
    end
    
    subgraph "Test Coverage"
        API[API Route Tests]
        Component[Component Tests]
        Service[Service Tests]
        Validation[Validation Tests]
    end
    
    Unit --> Component
    Unit --> Service
    Unit --> Validation
    Integration --> API
    E2E --> Full[Full User Flow]
    
    style E2E fill:#ffebee
    style Integration fill:#fff9c4
    style Unit fill:#e8f5e9
```

---

## 13. Monitoring & Observability

### 13.1 Monitoring Architecture

```mermaid
graph LR
    subgraph "Application"
        App[Next.js App]
    end
    
    subgraph "Vercel Analytics"
        WebVitals[Web Vitals]
        Logs[Function Logs]
        Errors[Error Tracking]
    end
    
    subgraph "Database Monitoring"
        DBMetrics[Query Performance]
        ConnPool[Connection Pool Status]
    end
    
    subgraph "Alerts"
        Slack[Slack Notifications]
        Email[Email Alerts]
    end
    
    App --> WebVitals
    App --> Logs
    App --> Errors
    App --> DBMetrics
    DBMetrics --> ConnPool
    
    Errors --> Slack
    Errors --> Email
    
    style App fill:#e3f2fd
    style WebVitals fill:#c8e6c9
    style Errors fill:#ffebee
```

---

## 14. Future Enhancements

### 14.1 Roadmap

```mermaid
timeline
    title Development Roadmap
    section Phase 1 (Current)
        Basic registration system
        Admin dashboard
        Email notifications
    section Phase 2 (Next 3 months)
        QR code generation
        Mobile app
        OAuth login
    section Phase 3 (Next 6 months)
        Multi-language support
        Payment integration
        Advanced analytics
    section Phase 4 (Next 12 months)
        AI-powered recommendations
        Virtual event support
        Integration APIs
```

---

## Appendix

### A. Technology Versions
- Next.js: 14.2.35
- React: 18.3.0
- Prisma: 5.22.0
- TypeScript: 5.x
- Tailwind CSS: 3.4.0

### B. Environment Configuration
- Node.js: 22.14.0
- npm: 11.5.2
- Database: PostgreSQL 15+

### C. References
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Vercel Documentation](https://vercel.com/docs)

---

**Document Version:** 1.0  
**Last Updated:** February 20, 2026  
**Maintained By:** Development Team
