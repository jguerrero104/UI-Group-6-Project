// server/seedProducts.js
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Define specific product names, unique descriptions, and price ranges for each category
    const categoryDetails = {
      Headsets: {
        names: ['Audio Master', 'Pro Talk', 'Gaming Hero', 'Sound Supreme', 'Voice Clarity', 'Music Bass', 'Audio Boost', 'Noise Control', 'Wireless Connect', 'Clear Talk'],
        descriptions: [
          'Top-tier headset with crystal-clear sound quality.',
          'Ideal for gamers who demand precision audio.',
          'Noise-canceling headset with immersive sound experience.',
          'Lightweight, comfortable, perfect for long calls.',
          'Exceptional bass and audio clarity in every beat.',
          'Wireless connectivity with deep bass.',
          'Built for studio-level sound clarity.',
          'Foldable design with premium noise isolation.',
          'Extended battery life for uninterrupted sessions.',
          'Lightweight build with rich, powerful sound.'
        ],
        priceRange: [50, 200]
      },
      Earbuds: {
        names: ['Bass Boost', 'Sound Pods', 'Mini Buds', 'Wireless Pro', 'Active Fit', 'Music Pulse', 'Sound Shell', 'Noise Blocker', 'True Freedom', 'Audio Bliss'],
        descriptions: [
          'Compact earbuds with high bass and noise reduction.',
          'Sweat-resistant, ideal for active lifestyles.',
          'True wireless experience with balanced sound.',
          'Designed for secure and comfortable fit.',
          'Exceptional battery life, powerful audio quality.',
          'Seamless Bluetooth connection with deep bass.',
          'Lightweight design, perfect for on-the-go.',
          'Noise-canceling features for focus and clarity.',
          'Long-lasting battery with fast charging.',
          'Compact and stylish with high sound fidelity.'
        ],
        priceRange: [20, 150]
      },
      Keyboards: {
        names: ['Type Pro', 'Silent Keys', 'Gaming Pad', 'Ultra Slim', 'Mechanical Master', 'Speed Type', 'Click-Free', 'RGB Magic', 'Wireless Touch', 'Ergo Comfort'],
        descriptions: [
          'Sleek keyboard with smooth, quiet keys.',
          'RGB backlighting, customizable options for gamers.',
          'Mechanical keys built for durability and speed.',
          'Compact and ultra-slim for minimal desk space.',
          'Ergonomic layout for hours of comfortable typing.',
          'Wireless with rechargeable battery and low latency.',
          'Whisper-quiet keys, perfect for open offices.',
          'Programmable keys for custom shortcuts.',
          'Durable design, spill-resistant keys.',
          'Modern design, perfect for all environments.'
        ],
        priceRange: [30, 120]
      },
      Laptops: {
        names: ['ProBook', 'UltraBook', 'Gaming Xtreme', 'Business Mate', 'Student Edition', 'Creative Studio', 'Power Boost', 'Compact Performer', 'Media Master', 'Workforce Elite'],
        descriptions: [
          'Lightweight laptop with high processing power.',
          'High-resolution display, ideal for gaming.',
          'Perfect for professionals on the go.',
          'Student-friendly, excellent value and durability.',
          'Powerful GPU, ideal for graphic-heavy tasks.',
          'Ultra-thin with exceptional battery life.',
          'Fast processor with plenty of storage options.',
          'Built for heavy multitasking with ease.',
          'Stunning visuals with vibrant color accuracy.',
          'Affordable, perfect for everyday use.'
        ],
        priceRange: [500, 2000]
      },
      Mouses: {
        names: ['Precision Click', 'Stealth Glide', 'Gaming Grip', 'Silent Mouse', 'Optical Master', 'Speed Runner', 'Comfort Grip', 'Wireless Freedom', 'RGB Lite', 'Pro Sensor'],
        descriptions: [
          'Ergonomic design for smooth, precise tracking.',
          'Ultra-quiet mouse for office environments.',
          'Designed for gamers with advanced DPI settings.',
          'Wireless and portable for easy control.',
          'RGB lighting for a customizable desk aesthetic.',
          'Compact design, perfect for travel.',
          'Programmable buttons for extra functionality.',
          'Durable and comfortable for long use.',
          'Built for speed and precision control.',
          'Enhanced grip for accuracy in gaming.'
        ],
        priceRange: [20, 150]
      },
      Phones: {
        names: ['Smart Pro', 'Infinity', 'Edge Plus', 'Lite Max', 'Power G', 'Ultra Zoom', 'Pixel Master', 'Aura', 'Next Gen', 'Vision X'],
        descriptions: [
          'Flagship smartphone with edge-to-edge display.',
          'High-resolution camera with night mode.',
          'Fast processing, optimized battery for usage.',
          'Affordable with essential features.',
          'AI-powered photography for stunning photos.',
          'High refresh rate for smooth visuals.',
          'Large storage and expandable memory options.',
          'Ultra-slim design with premium feel.',
          'Powerful chipset for fast multitasking.',
          'Durable build with water-resistance.'
        ],
        priceRange: [300, 1000]
      }
    };

    // Categories and their image folders
    const categoryImages = {
      Headsets: Array.from({ length: 10 }, (_, i) => `/images/products/headsets/headset${i + 1}.jpg`),
      Earbuds: Array.from({ length: 10 }, (_, i) => `/images/products/earbuds/earbud${i + 1}.jpg`),
      Keyboards: Array.from({ length: 10 }, (_, i) => `/images/products/keyboards/keyboard${i + 1}.jpg`),
      Laptops: Array.from({ length: 10 }, (_, i) => `/images/products/laptops/laptop${i + 1}.jpg`),
      Mouses: Array.from({ length: 10 }, (_, i) => `/images/products/mouses/mouse${i + 1}.jpg`),
      Phones: Array.from({ length: 10 }, (_, i) => `/images/products/phones/phone${i + 1}.jpg`)
    };

    // Generate products with unique descriptions and realistic prices
    const products = [];
    Object.keys(categoryDetails).forEach(category => {
      categoryDetails[category].names.forEach((name, index) => {
        const description = categoryDetails[category].descriptions[index];
        const [minPrice, maxPrice] = categoryDetails[category].priceRange;
        const price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice; // Random price within the range

        products.push({
          name: `${name} ${index + 1}`,
          description,
          price,
          image: categoryImages[category][index], // Each product has a unique image for its category
          category
        });
      });
    });

    // Shuffle the products array to randomize their order
    const shuffledProducts = products.sort(() => Math.random() - 0.5);

    // Clear existing products and add new ones
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Seeding new products...');
    await Product.insertMany(shuffledProducts);
    console.log('Unique products seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
