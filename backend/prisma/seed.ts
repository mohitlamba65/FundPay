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
      name: "Apple iPhone 17 Pro",
      slug: "iphone-17-pro",
      brand: "Apple",
      description:
        "Next-generation Apple iPhone 17 Pro supercharged by the A19 Pro Bionic chip, featuring aerospace-grade Titanium unibody, breakthrough 48MP Pro camera system with periscope telephoto, and all-day battery life.",
      colorImages: {
        "Deep Blue":
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488983/Apple_iPhone_17_Pro_Deep_Blue_256_GB_gw4k4a.jpg",
        "Cosmic Orange":
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488981/Apple_iPhone_17_Pro_Cosmic_Orange_256_GB_li7nll.jpg",
        Silver:
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488980/Apple_iPhone_17_Pro_Silver_256_GB_lq1qdn.jpg",
      },
      storageTiers: [
        { storage: "256 GB", mrp: 134900, price: 124900 },
        { storage: "512 GB", mrp: 154900, price: 142900 },
        { storage: "1 TB", mrp: 174900, price: 161900 },
      ],
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      slug: "samsung-s24-ultra",
      brand: "Samsung",
      description:
        "Galaxy AI is here. Titanium exterior frame, 200MP camera with Quad Telephoto system, integrated S Pen, anti-reflective Corning Gorilla Armor, and Snapdragon 8 Gen 3 for Galaxy.",
      colorImages: {
        "Titanium Gray":
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788489136/Samsung_Galaxy_S24_Ultra_5G_Titanium_Gray_256_GB_12_GB_RAM_ceqlvl.webp",
        "Titanium Violet":
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488979/Samsung_Galaxy_S24_Ultra_5G_Titanium_Violet_256_GB_12_GB_RAM_mpheq2.webp",
        "Titanium Yellow":
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788489135/Samsung_Galaxy_S24_Ultra_5G_Titanium_Yellow_256_GB_12_GB_RAM_auyodl.webp",
      },
      storageTiers: [
        { storage: "256 GB", mrp: 134999, price: 124999 },
        { storage: "512 GB", mrp: 149999, price: 138999 },
        { storage: "1 TB", mrp: 169999, price: 156999 },
      ],
    },
    {
      name: "Google Pixel 11 Pro",
      slug: "google-pixel-11-pro",
      brand: "Google",
      description:
        "Engineered by Google with next-generation Gemini Nano AI. Features an advanced triple pro-camera system, sculpted matte glass enclosure, and the custom Google Tensor G5 silicon.",
      colorImages: {
        Fog: "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488980/Google_Pixel_11_Pro_Fog_256_GB_12_GB_RAM_orvctq.webp",
        Obsidian:
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488978/Google_Pixel_11_Pro_Obsidian_256_GB_12_GB_RAM_gg0eyp.webp",
        Canyon:
          "https://res.cloudinary.com/dkhnq43nd/image/upload/v1788488978/Google_Pixel_11_Pro_Canyon_256_GB_12_GB_RAM_pp78h8.webp",
      },
      storageTiers: [
        { storage: "256 GB", mrp: 119999, price: 108999 },
        { storage: "512 GB", mrp: 134999, price: 122999 },
        { storage: "1 TB", mrp: 149999, price: 136999 },
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

    // Create combinations of storage tiers and color finishes
    for (const [colorName, imageUrl] of Object.entries(prodData.colorImages)) {
      for (const tier of prodData.storageTiers) {
        const variant = await prisma.variant.create({
          data: {
            productId: product.id,
            storage: tier.storage,
            color: colorName,
            mrp: tier.mrp,
            price: tier.price,
            imageUrl: imageUrl,
          },
        });

        console.log(`  └─ Variant: ${variant.storage} ${variant.color} - ₹${variant.price}`);

        // Create EMI plans for this variant
        for (const pConfig of planConfigs) {
          const targetFund = createdFunds[pConfig.fundIndex]!;
          const monthlyAmount = calculateMonthlyEMI(
            tier.price,
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
