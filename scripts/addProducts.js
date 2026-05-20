const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addProducts() {
  try {
    console.log('🎈 Adding products...\n');

    // Product 1: Latex Balloon
    const product1 = await prisma.product.create({
      data: {
        title: 'Premium Latex Balloons',
        description: 'High-quality latex balloons perfect for birthdays, weddings, and celebrations. Available in multiple vibrant colors.',
        basePrice: 50,
        imageUrl: 'https://images.unsplash.com/photo-1599027528406-dcf96dc1cdff?w=500&h=500&fit=crop',
        sizes: ['5', '10', '12'],
        colors: ['Red', 'Blue', 'Gold', 'Pink', 'Silver', 'Green', 'Purple'],
        categories: ['Balloons', 'Party Supplies', 'Decorations'],
        details: 'Durable and long-lasting latex balloons. Can be filled with air or helium. Pack includes multiple sizes for variety.',
      },
    });

    console.log('✅ Product 1 Added:', product1.title);

    // Product 2: Water Pistol Balloons
    const product2 = await prisma.product.create({
      data: {
        title: 'Water Pistol Balloons',
        description: 'Fun and colorful water balloons for outdoor games and summer parties. Fills quickly and bursts on impact.',
        basePrice: 75,
        imageUrl: 'https://images.unsplash.com/photo-1572456299382-6c6f3ee00c44?w=500&h=500&fit=crop',
        sizes: ['Standard'],
        colors: ['Multicolor', 'Red', 'Blue', 'Yellow'],
        categories: ['Water Games', 'Balloons', 'Outdoor Fun'],
        details: 'Quick-fill water balloons perfect for water balloon fights and pool parties. Lightweight and easy to carry. Includes 100+ balloons per pack.',
      },
    });

    console.log('✅ Product 2 Added:', product2.title);

    console.log('\n🎉 All products added successfully!');
    console.log('\nProducts:');
    console.log(`1. ${product1.title} - ₹${product1.basePrice}`);
    console.log(`2. ${product2.title} - ₹${product2.basePrice}`);

  } catch (error) {
    console.error('❌ Error adding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProducts();
