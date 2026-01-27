# MAKING JAS.COM FULLY DYNAMIC - SETUP GUIDE

## ✅ WHAT'S BEEN IMPLEMENTED

### 1. Database Schema (Prisma)
- Complete database models for all content types
- Relationships between entities
- PostgreSQL ready

### 2. API Routes Created
- `/api/industries` - Full CRUD
- `/api/services` - Full CRUD
- `/api/insights` - Full CRUD
- `/api/experts` - Full CRUD
- `/api/careers` - Full CRUD
- `/api/offices` - Full CRUD
- `/api/media` - Full CRUD
- `/api/leads` - Lead capture with CRM integration

### 3. Database Client
- Prisma client configured
- Connection pooling
- Type-safe queries

---

## 🚀 SETUP STEPS

### Step 1: Database Setup

**Option A: PostgreSQL (Recommended)**
```bash
# Install PostgreSQL locally or use cloud service (Supabase, Railway, Neon)

# Add to .env
DATABASE_URL="postgresql://user:password@localhost:5432/jascom"
```

**Option B: SQLite (Development)**
```bash
# Change in prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### Step 2: Initialize Database
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

### Step 3: Update Environment Variables
```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/jascom"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_KEY"
HUBSPOT_API_KEY="your_hubspot_key"
```

### Step 4: Replace Mock Data Service

**Current:** `lib/data.ts` uses static mock data
**New:** Use Prisma queries

Example:
```typescript
// OLD (Mock)
export class DataService {
  static async getIndustries() {
    return mockIndustries;
  }
}

// NEW (Dynamic)
export class DataService {
  static async getIndustries() {
    return await prisma.industry.findMany({
      include: { services: true, insights: true }
    });
  }
}
```

---

## 📝 SEED DATA SCRIPT

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create Industries
  await prisma.industry.createMany({
    data: [
      {
        name: 'Healthcare & Life Sciences',
        slug: 'healthcare-life-sciences',
        description: 'Transforming healthcare delivery',
        overview: 'We help healthcare organizations...',
        challenges: ['Digital transformation', 'Regulatory compliance'],
        trends: ['AI in diagnostics', 'Personalized medicine'],
        featured: true
      },
      // Add more...
    ]
  });

  // Create Services
  await prisma.service.createMany({
    data: [
      {
        name: 'Digital Transformation',
        slug: 'digital-transformation',
        description: 'End-to-end digital transformation',
        overview: 'We help organizations reimagine...',
        methodologies: ['Agile', 'Design thinking'],
        tools: ['Cloud platforms', 'AI/ML frameworks'],
        featured: true
      }
    ]
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

---

## 🔄 UPDATE DATA SERVICE

Replace `lib/data.ts` with:
```typescript
import { prisma } from './prisma';

export class DataService {
  static async getIndustries() {
    return await prisma.industry.findMany({
      include: { services: true, insights: true, experts: true }
    });
  }

  static async getServices() {
    return await prisma.service.findMany({
      include: { subServices: true, industries: true, insights: true }
    });
  }

  static async getInsights() {
    return await prisma.insight.findMany({
      include: { author: true, industries: true, services: true },
      orderBy: { publishedAt: 'desc' }
    });
  }

  static async getExperts() {
    return await prisma.expert.findMany({
      include: { industries: true, services: true, insights: true }
    });
  }

  static async getOffices() {
    return await prisma.office.findMany();
  }

  static async getCareers() {
    return await prisma.career.findMany({
      where: { expiresAt: { gte: new Date() } },
      orderBy: { publishedAt: 'desc' }
    });
  }

  static async search(query: string, filters?: any) {
    const results = await prisma.$transaction([
      prisma.industry.findMany({
        where: { name: { contains: query, mode: 'insensitive' } }
      }),
      prisma.service.findMany({
        where: { name: { contains: query, mode: 'insensitive' } }
      }),
      prisma.insight.findMany({
        where: { title: { contains: query, mode: 'insensitive' } }
      })
    ]);
    
    return [
      ...results[0].map(i => ({ ...i, type: 'industry', url: `/industries/${i.slug}` })),
      ...results[1].map(s => ({ ...s, type: 'service', url: `/services/${s.slug}` })),
      ...results[2].map(i => ({ ...i, type: 'insight', url: `/insights/${i.slug}` }))
    ];
  }
}
```

---

## 🎯 ADMIN PANEL - CONNECT TO API

Update admin pages to use fetch:
```typescript
// Load data
const loadIndustries = async () => {
  const response = await fetch('/api/industries');
  const data = await response.json();
  setIndustries(data);
};

// Create
const handleCreate = async (formData) => {
  await fetch('/api/industries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
};

// Update
const handleUpdate = async (id, formData) => {
  await fetch('/api/industries', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...formData })
  });
};

// Delete
const handleDelete = async (id) => {
  await fetch(`/api/industries?id=${id}`, { method: 'DELETE' });
};
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Database connected
- [ ] Prisma schema generated
- [ ] Tables created
- [ ] Seed data loaded
- [ ] API routes working
- [ ] Admin panel CRUD functional
- [ ] Frontend fetching from API
- [ ] Lead capture saving to DB
- [ ] CRM integration active

---

## 🚀 QUICK START COMMANDS

```bash
# 1. Install dependencies
npm install

# 2. Setup database
npx prisma generate
npx prisma db push

# 3. Seed data (optional)
npx prisma db seed

# 4. Start development server
npm run dev

# 5. Access admin panel
http://localhost:3000/admin
```

---

## 📊 RESULT

**BEFORE:** Static mock data in `lib/data.ts`
**AFTER:** Dynamic data from PostgreSQL database via Prisma

All content now:
- ✅ Stored in database
- ✅ Editable via admin panel
- ✅ Fetched via API routes
- ✅ Real-time updates
- ✅ Scalable & production-ready
