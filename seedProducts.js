mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [

  {
    name: "boAt Airdopes 141 Bluetooth",
    description: "boAt Airdopes 141 Bluetooth TWS Earbuds with 42H Playtime,Low Latency Mode for Gaming, ENx Tech, IWP, IPX4 Water Resistance.",
    price: 1299,
    originalPrice: 2999,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._AC_UL480_QL65_.jpg",
    rating: 4.2,
    reviewCount: 8234,
    stock: 40,
    inStock: true
  },
  {
    name: "Iphone 121 in Ear TWS Earbuds",
    description: "Iphone 121 in Ear TWS Earbuds with Beast Mode(40ms Low Latency) for Gaming, 40H Playtime, Blazing LEDs, Quad Mics ENx Sign.",
    price: 85000,
    originalPrice: 79999,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_UY327_FMwebp_QL65_.jpg",
    rating: 4.2,
    reviewCount: 8234,
    stock: 40,
    inStock: true
  },
  {
    name: "Xiaomi Pad 6",
    description: "Xiaomi Pad 6| Qualcomm Snapdragon 870| Powered by HyperOS | 144Hz Refresh Rate| 6GB, 128GB| 2.8K+ Display",
    price: 24999,
    originalPrice: 31000,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/71LRY1j6UHL._AC_UY327_FMwebp_QL65_.jpg",
    rating: 4.2,
    reviewCount: 8234,
    stock: 50,
    inStock: true
  },
  {
    name: "HP Victus Gaming Laptop",
    description: "HP Victus Gaming Laptop, 12th Gen Intel Core i5-12450H, 4GB RTX 3050 GPU, 15.6-inch (39.6 cm) FHD IPS 144Hz, 16GB DDR4, 512GB",
    price: 67999,
    originalPrice: 69980,
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/710ZcpHUpkL._AC_UL480_FMwebp_QL65_.jpg",
    rating: 4.2,
    reviewCount: 8234,
    stock: 50,
    inStock: true
  },

  {
    name: "Boat Rockerz 450 Bluetooth Headphones",
    description: "Wireless over-ear headphones with mic, 40mm drivers, 15 hours battery",
    price: 1499,
    originalPrice: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.2,
    reviewCount: 8234,
    stock: 50,
    inStock: true
  },
  {
    name: "Noise ColorFit Pro 3 Smartwatch",
    description: "1.55 inch display, SpO2, heart rate monitor, 10 sports modes",
    price: 2499,
    originalPrice: 4999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.1,
    reviewCount: 3421,
    stock: 75,
    inStock: true
  },
  {
    name: "HP Wireless Mouse",
    description: "Ergonomic wireless mouse with 1600 DPI, 18 month battery",
    price: 399,
    originalPrice: 799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    rating: 4.2,
    reviewCount: 2341,
    stock: 100,
    inStock: true
  },
  {
    name: "Wireless Keyboard",
    description: "Slim wireless keyboard with numeric keypad",
    price: 699,
    originalPrice: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    rating: 3.8,
    reviewCount: 1523,
    stock: 80,
    inStock: true
  },

  {
    name: "Women's Floral Print Dress",
    description: "Comfortable cotton floral midi dress for casual wear",
    price: 699,
    originalPrice: 1299,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    rating: 4.0,
    reviewCount: 523,
    stock: 30,
    inStock: true
  },
  {
    name: "Women's Running Shoes",
    description: "Lightweight sports shoes with air cushion sole",
    price: 1299,
    originalPrice: 2499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.4,
    reviewCount: 1523,
    stock: 60,
    inStock: true
  },
  {
    name: "Cooking Pan Set",
    description: "Non-stick cookware set with 3 pieces",
    price: 1299,
    originalPrice: 2499,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500",
    rating: 3,
    reviewCount: 654,
    stock: 40,
    inStock: true
  },
  {
    name: "Wall Clock",
    description: "Modern wall clock with silent movement",
    price: 599,
    originalPrice: 999,
    category: "Clocks",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500",
    rating: 4.1,
    reviewCount: 432,
    stock: 60,
    inStock: true
  },
  {
    name: "Water Bottle 1L",
    description: "Stainless steel insulated water bottle",
    price: 349,
    originalPrice: 699,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    rating: 4.4,
    reviewCount: 1234,
    stock: 150,
    inStock: true
  },
  {
    name: "Yoga Mat",
    description: "Anti-slip yoga mat with carrying strap",
    price: 799,
    originalPrice: 1499,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    rating: 4.2,
    reviewCount: 543,
    stock: 70,
    inStock: true
  },

  {
    name: "Women's Handbag",
    description: "Stylish handbag with multiple compartments",
    price: 899,
    originalPrice: 1799,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    rating: 4.1,
    reviewCount: 342,
    stock: 45,
    inStock: true
  },
  {
    name: "Sunglasses",
    description: "Polarized sunglasses with UV400 protection",
    price: 599,
    originalPrice: 1199,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    rating: 4.3,
    reviewCount: 678,
    stock: 70,
    inStock: true
  },

  {
    name: "Washing Machine 7kg Fully Automatic",
    description: "Front load washing machine with multiple wash programs",
    price: 18999,
    originalPrice: 24999,
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500",
    rating: 4.3,
    reviewCount: 892,
    stock: 15,
    inStock: true
  },
  {
    name: "Kitchen Chimney 60cm",
    description: "Filterless autoclean chimney with 1200 m3/hr suction",
    price: 12990,
    originalPrice: 18999,
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=500",
    rating: 3.5,
    reviewCount: 534,
    stock: 20,
    inStock: true
  },

  {
    name: "Air Purifier",
    description: "HEPA filter air purifier for home",
    price: 7999,
    originalPrice: 12999,
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500",
    rating: 4.4,
    reviewCount: 765,
    stock: 25,
    inStock: true
  },


  {
    name: "LED Desk Lamp",
    description: "Adjustable brightness, eye-care LED lamp for study",
    price: 899,
    originalPrice: 1499,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    rating: 2.9,
    reviewCount: 432,
    stock: 45,
    inStock: true
  },
  {
    name: "Laptop Backpack",
    description: "Water resistant laptop bag with USB charging port",
    price: 799,
    originalPrice: 1599,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 3.9,
    reviewCount: 678,
    stock: 55,
    inStock: true
  }
];


//function to add products to database
const seedProducts = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to MongoDB');

    //delete existing products
    await Product.deleteMany({});
    console.log('Cleared all products');

    //insert new products
    await Product.insertMany(sampleProducts);
    console.log('added 8 sample products');

    mongoose.connection.close();
    console.log('database connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();