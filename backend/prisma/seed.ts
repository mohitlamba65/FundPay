import { prisma } from "../src/config/database.js";

// Helper function to calculate EMI: P * r * (1+r)^n / ((1+r)^n - 1)
function calculateMonthlyEMI(principal: number, annualRatePct: number, tenureMonths: number): number {
  if (annualRatePct === 0) {
    return Math.round(principal / tenureMonths);
  }
  const monthlyRate = annualRatePct / (12 * 100);
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

async function main() {
  console.log("🌱 Starting database seeding on Neon PostgreSQL...");

  // 1. Clean existing records in reverse dependency order
  console.log("Cleaning up previous data...");
  await prisma.eMIPlan.deleteMany({});
  await prisma.variant.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.mutualFund.deleteMany({});

  // 2. Seed Mutual Funds
  console.log("Seeding Mutual Funds...");
  const mutualFundsData = [
    {
      name: "HDFC Top 100 Large Cap Fund",
      fundHouse: "HDFC Mutual Fund",
      schemeName: "HDFC Top 100 Fund - Direct Plan - Growth",
      schemeCode: "118989",
      expectedReturnRate: 14.5,
    },
    {
      name: "ICICI Prudential Bluechip Equity Fund",
      fundHouse: "ICICI Prudential Mutual Fund",
      schemeName: "ICICI Prudential Bluechip Fund - Direct Plan - Growth",
      schemeCode: "120594",
      expectedReturnRate: 13.8,
    },
    {
      name: "Parag Parikh Flexi Cap Fund",
      fundHouse: "PPFAS Mutual Fund",
      schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
      schemeCode: "122639",
      expectedReturnRate: 16.0,
    },
    {
      name: "Nippon India Small Cap Wealth Fund",
      fundHouse: "Nippon India Mutual Fund",
      schemeName: "Nippon India Small Cap Fund - Direct Plan - Growth",
      schemeCode: "118778",
      expectedReturnRate: 18.2,
    },
  ];

  const createdFunds = [];
  for (const fund of mutualFundsData) {
    const created = await prisma.mutualFund.create({
      data: {
        name: fund.name,
        fundHouse: fund.fundHouse,
        schemeName: fund.schemeName,
        schemeCode: fund.schemeCode,
        expectedReturnRate: fund.expectedReturnRate,
      },
    });
    createdFunds.push(created);
  }
  console.log(`✅ Seeded ${createdFunds.length} mutual funds.`);

  // 3. Seed Products with Variants and EMI Plans
  const productsData = [
    {
      name: "Apple iPhone 16 Pro",
      slug: "iphone-16-pro",
      brand: "Apple",
      description:
        "Supercharged by the A18 Pro chip, featuring Grade 5 Titanium design, 48MP Fusion camera system with 5x Telephoto, Action Button, and industry-leading battery life.",
      variants: [
        {
          storage: "128 GB",
          color: "Natural Titanium",
          mrp: 119900,
          price: 112900,
          imageUrl:
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        },
        {
          storage: "256 GB",
          color: "Desert Titanium",
          mrp: 129900,
          price: 121900,
          imageUrl:
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
        },
        {
          storage: "512 GB",
          color: "Black Titanium",
          mrp: 149900,
          price: 139900,
          imageUrl:
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-s24-ultra",
      brand: "Samsung",
      description:
        "Galaxy AI is here. Titanium exterior frame, 200MP camera with Quad Telephoto system, integrated S Pen, anti-reflective Corning Gorilla Armor, and Snapdragon 8 Gen 3 for Galaxy.",
      variants: [
        {
          storage: "256 GB",
          color: "Titanium Gray",
          mrp: 134999,
          price: 124999,
          imageUrl:
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
        },
        {
          storage: "512 GB",
          color: "Titanium Black",
          mrp: 149999,
          price: 138999,
          imageUrl:
            "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
        },
        {
          storage: "1 TB",
          color: "Titanium Violet",
          mrp: 169999,
          price: 156999,
          imageUrl:
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    {
      name: "Google Pixel 9 Pro",
      slug: "google-pixel-9-pro",
      brand: "Google",
      description:
        "Engineered by Google with Gemini AI natively integrated. Elegant matte glass finish, triple rear pro-level camera system, all-day battery life, and the Google Tensor G4 processor.",
      variants: [
        {
          storage: "128 GB",
          color: "Porcelain",
          mrp: 109999,
          price: 99999,
          imageUrl:
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        },
        {
          storage: "256 GB",
          color: "Obsidian",
          mrp: 119999,
          price: 108999,
          imageUrl:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80",
        },
        {
          storage: "512 GB",
          color: "Hazel",
          mrp: 134999,
          price: 122999,
          imageUrl:
            "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
  ];

  // Plan configurations (tenure, interest rate, cashback, target fund index)
  const planConfigs = [
    {
      tenureMonths: 6,
      interestRate: 0.0,
      cashback: 1500,
      fundIndex: 0, // HDFC Top 100
    },
    {
      tenureMonths: 9,
      interestRate: 6.5,
      cashback: 2000,
      fundIndex: 1, // ICICI Bluechip
    },
    {
      tenureMonths: 12,
      interestRate: 9.5,
      cashback: 3000,
      fundIndex: 2, // Parag Parikh Flexi Cap
    },
    {
      tenureMonths: 18,
      interestRate: 11.0,
      cashback: 4000,
      fundIndex: 2, // Parag Parikh Flexi Cap
    },
    {
      tenureMonths: 24,
      interestRate: 12.5,
      cashback: 5000,
      fundIndex: 3, // Nippon India Small Cap
    },
  ];

  for (const prodData of productsData) {
    const product = await prisma.product.create({
      data: {
        name: prodData.name,
        slug: prodData.slug,
        brand: prodData.brand,
        description: prodData.description,
      },
    });

    console.log(`Created Product: ${product.name} (${product.slug})`);

    for (const vData of prodData.variants) {
      const variant = await prisma.variant.create({
        data: {
          productId: product.id,
          storage: vData.storage,
          color: vData.color,
          mrp: vData.mrp,
          price: vData.price,
          imageUrl: vData.imageUrl,
        },
      });

      console.log(`  └─ Variant: ${variant.storage} ${variant.color} - ₹${variant.price}`);

      // Create EMI plans for this variant
      for (const pConfig of planConfigs) {
        const targetFund = createdFunds[pConfig.fundIndex]!;
        const monthlyAmount = calculateMonthlyEMI(
          vData.price,
          pConfig.interestRate,
          pConfig.tenureMonths
        );

        await prisma.eMIPlan.create({
          data: {
            variantId: variant.id,
            mutualFundId: targetFund.id,
            tenureMonths: pConfig.tenureMonths,
            interestRate: pConfig.interestRate,
            monthlyAmount: monthlyAmount,
            cashback: pConfig.cashback,
          },
        });
      }
    }
  }

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
