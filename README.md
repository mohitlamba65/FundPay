# FundPay

FundPay is a fintech-powered e-commerce platform that enables customers to purchase flagship smartphones with **₹0 down payment** and **0% effective interest** by pledging their mutual fund portfolios as collateral instead of liquidating their investments.

---

## Tech Stack Used

### Frontend
- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Vanilla CSS + Tailwind CSS (Curated 1Fi-inspired design system: lavender/purple `#6D28D9` accents, editorial typography, sleek micro-interactions)
- **UI Components & Icons**: Radix UI Primitives, Lucide Icons, Class Variance Authority (`cva`), `tailwind-merge`
- **HTTP Client**: Axios with custom interceptors and cold-start handling

### Backend
- **Runtime & Framework**: Node.js, Express.js (v5), TypeScript (`tsx` for dev watch)
- **Database & ORM**: PostgreSQL (hosted on Neon), Prisma ORM (v7.10.0) with `@prisma/adapter-pg`
- **Validation**: Zod schema validation middleware
- **Security & Headers**: CORS middleware configured with dynamic domain matching
- **Configuration**: Dotenv with typed environment schema parsing

---

## Database Entity Relationship Diagram (ERD)

![FundPay Database Entity Relationship Diagram](docs/erd.png)

```mermaid
erDiagram
    product ||--o{ variant : "has"
    variant ||--o{ EMI_plan : "offers"
    mutual_fund ||--o{ EMI_plan : "backs"

    product {
        cuid id PK
        varchar slug
        varchar name
        varchar brand
        text description
        datetime created_at
        boolean is_active
        datetime updated_at
    }

    variant {
        cuid id PK
        cuid product_id FK
        varchar storage
        char color
        decimal mrp
        decimal price
        varchar imageUrl
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    EMI_plan {
        cuid id PK
        cuid variant_id FK
        cuid mutual_fund_id FK
        int tenure_months
        decimal cashback
        decimal interest_rate
        decimal monthly_amount
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    mutual_fund {
        cuid id PK
        varchar name
        varchar fund_house
        varchar scheme_name
        char scheme_code
        decimal expected_return_rate
        datetime created_at
        datetime updated_at
    }
```

---

## Schema Used

The database is modeled using Prisma ORM with PostgreSQL. Below is the complete schema definition:

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id          String    @id @default(cuid())
  slug        String    @unique
  name        String
  brand       String
  description String?   @db.Text
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  variants    Variant[]

  @@map("products")
}

model Variant {
  id        String   @id @default(cuid())
  productId String   @map("product_id")
  storage   String
  color     String
  mrp       Decimal  @db.Decimal(12, 2)
  price     Decimal  @db.Decimal(12, 2)
  imageUrl  String   @map("image_url")
  isActive  Boolean  @default(true) @map("is_active")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  product   Product   @relation(fields: [productId], references: [id], onDelete: Cascade)
  emiPlans  EMIPlan[]

  @@map("variants")
}

model MutualFund {
  id                 String   @id @default(cuid())
  name               String
  fundHouse          String   @map("fund_house")
  schemeName         String   @map("scheme_name")
  schemeCode         String   @map("scheme_code")
  expectedReturnRate Decimal  @map("expected_return_rate") @db.Decimal(5, 2)
  createdAt          DateTime @default(now()) @map("created_at")
  updatedAt          DateTime @updatedAt @map("updated_at")

  emiPlans           EMIPlan[]

  @@map("mutual_funds")
}

model EMIPlan {
  id            String     @id @default(cuid())
  variantId     String     @map("variant_id")
  mutualFundId  String     @map("mutual_fund_id")
  tenureMonths  Int        @map("tenure_months")
  cashback      Decimal?   @db.Decimal(10, 2)
  interestRate  Decimal    @map("interest_rate") @db.Decimal(5, 2)
  monthlyAmount Decimal    @map("monthly_amount") @db.Decimal(12, 2)
  isActive      Boolean    @default(true) @map("is_active")
  createdAt     DateTime   @default(now()) @map("created_at")
  updatedAt     DateTime   @updatedAt @map("updated_at")

  variant       Variant    @relation(fields: [variantId], references: [id], onDelete: Cascade)
  mutualFund    MutualFund @relation(fields: [mutualFundId], references: [id], onDelete: Restrict)

  @@map("emi_plans")
}
```

---

## Setup and Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: Managed instance (e.g. Neon, Supabase) or local database

---

### 1. Environment Variables

#### Backend (`backend/.env`)
Create `backend/.env` based on `backend/.env.example`:

```env
# Server Port & Environment
PORT=5000
NODE_ENV=development
API_PREFIX=/api

# PostgreSQL Database Connection String
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Allowed CORS Origins (comma-separated for multiple origins)
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,https://your-app.vercel.app
CORS_CREDENTIALS=true
```

#### Frontend (`frontend/.env`)
Create `frontend/.env` based on `frontend/.env.example`:

```env
# API Base URL (Local server or Render deployment)
VITE_API_URL=http://localhost:5000/api
```

---

### 2. Backend Setup & Run

Navigate to the `backend` directory:

```bash
cd backend
```

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Push Schema to Database**:
   ```bash
   npx prisma db push
   ```

4. **Seed Database**:
   Populate products (iPhone 17 Pro, Samsung S24 Ultra, Google Pixel 11 Pro), variants, mutual funds, and EMI financing plans:
   ```bash
   npx prisma db seed
   ```

5. **Start Backend Dev Server**:
   ```bash
   npm run dev
   ```
   The backend API will run at `http://localhost:5000/api`.

6. **Production Build & Run**:
   ```bash
   npm run build
   npm start
   ```

---

### 3. Frontend Setup & Run

Navigate to the `frontend` directory:

```bash
cd frontend
```

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173` (or `http://localhost:5174`).

3. **Production Build & Preview**:
   ```bash
   npm run build
   npm run preview
   ```

---

## API Endpoints and Example Responses

| Method | Endpoint | Description | Request Parameters / Body | Example Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & database connection status | None | `{"status":"ok","timestamp":"2026-09-04T05:36:33.640Z","database":"connected"}` |
| `GET` | `/api/products` | Retrieve all active products with price range, variants, storage, and color options | None | <pre lang="json">{<br>  "success": true,<br>  "data": [<br>    {<br>      "id": "cmtmclou90004hwueyxvb4d7q",<br>      "slug": "iphone-17-pro",<br>      "name": "Apple iPhone 17 Pro",<br>      "brand": "Apple",<br>      "minPrice": 124900,<br>      "maxPrice": 161900,<br>      "variantCount": 9,<br>      "availableStorage": ["256 GB", "512 GB", "1 TB"],<br>      "availableColors": ["Silver", "Cosmic Orange", "Deep Blue"],<br>      "thumbnailUrl": "https://res.cloudinary.com/.../iPhone_17_Pro.jpg"<br>    }<br>  ]<br>}</pre> |
| `GET` | `/api/products/:slug` | Retrieve single product details, complete variants, backed EMI plans, and mutual fund return projections | **Params**:<br>`slug`: Product slug (e.g. `iphone-17-pro`) | <pre lang="json">{<br>  "success": true,<br>  "data": {<br>    "id": "cmtmclou90004hwueyxvb4d7q",<br>    "slug": "iphone-17-pro",<br>    "name": "Apple iPhone 17 Pro",<br>    "variants": [<br>      {<br>        "id": "cmtmcloxj0005hwue4s8uocbl",<br>        "storage": "256 GB",<br>        "color": "Deep Blue",<br>        "mrp": 134900,<br>        "price": 124900,<br>        "imageUrl": "https://res.cloudinary.com/.../blue.jpg",<br>        "emiPlans": [<br>          {<br>            "id": "cmtmclq19000ihwueyzq2fq3l",<br>            "tenureMonths": 12,<br>            "interestRate": 9.5,<br>            "monthlyAmount": 10955,<br>            "cashback": 3000,<br>            "totalEmiPaid": 131460,<br>            "mutualFund": {<br>              "name": "Parag Parikh Flexi Cap Fund",<br>              "expectedReturnRate": 16,<br>              "projectedMfValue": 143429,<br>              "estimatedMfGain": 11969<br>            },<br>            "netEffectiveCost": 116491<br>          }<br>        ]<br>      }<br>    ]<br>  }<br>}</pre> |
| `POST` | `/api/products/calculate-growth` | Calculate projected mutual fund wealth accumulation, total EMI paid, cashback, and net benefit | **Body (JSON)**:<br><pre lang="json">{<br>  "monthlyAmount": 10955,<br>  "tenureMonths": 12,<br>  "expectedReturnRate": 16,<br>  "interestRate": 9.5,<br>  "cashback": 3000<br>}</pre> | <pre lang="json">{<br>  "success": true,<br>  "data": {<br>    "monthlyAmount": 10955,<br>    "tenureMonths": 12,<br>    "totalInvested": 131460,<br>    "expectedReturnRate": 16,<br>    "interestRate": 9.5,<br>    "cashback": 3000,<br>    "projectedWealth": 143429,<br>    "estimatedReturns": 11969,<br>    "netEffectiveCost": 116491<br>  }<br>}</pre> |
