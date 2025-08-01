// seed.js

// Using require for CommonJS module syntax
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

// Use your actual keys from the .env.local file.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if keys are available
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase URL and Service Role Key are required. Please check your .env.local file.');
}

// Create a Supabase client with the service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Sample product data
const products = [
  {
    name: "Apple iPhone 15 Pro",
    description: "Latest iPhone with advanced camera and fast processor.",
    price: 1199.99,
    image_url: "https://images.same-assets.com/ebay-iphone15.jpg",
    category: "electronics"
  },
  {
    name: "Vintage Leather Jacket",
    description: "Classic brown leather jacket for men.",
    price: 89.99,
    image_url: "https://images.same-assets.com/ebay-leather-jacket.jpg",
    category: "clothing"
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Noise-cancelling wireless headphones.",
    price: 349.99,
    image_url: "https://images.same-assets.com/ebay-sony-headphones.jpg",
    category: "electronics"
  },
  {
    name: "KitchenAid Mixer",
    description: "Powerful stand mixer for baking.",
    price: 299.99,
    image_url: "https://images.same-assets.com/ebay-mixer.jpg",
    category: "home"
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable and stylish running shoes.",
    price: 129.50,
    image_url: "https://images.same-assets.com/ebay-nike-airmax.jpg",
    category: "footwear"
  },
  {
    name: "LEGO Star Wars Millennium Falcon",
    description: "1,300-piece set for Star Wars lovers.",
    price: 159.99,
    image_url: "https://images.same-assets.com/ebay-lego-falcon.jpg",
    category: "toys"
  },
  {
    name: "Samsung Galaxy Tab S9",
    description: "High-resolution tablet for work and play.",
    price: 599.00,
    image_url: "https://images.same-assets.com/ebay-galaxy-tab.jpg",
    category: "electronics"
  },
  {
    name: "Hydro Flask Water Bottle",
    description: "Keeps cold drinks cold for 24 hours.",
    price: 35.00,
    image_url: "https://images.same-assets.com/ebay-hydroflask.jpg",
    category: "sports"
  },
  {
    name: "Casio G-Shock Watch",
    description: "Tough, reliable digital watch.",
    price: 99.95,
    image_url: "https://images.same-assets.com/ebay-gshock.jpg",
    category: "accessories"
  },
  {
    name: "Instant Pot Duo",
    description: "The best-selling 7-in-1 multi-cooker.",
    price: 89.99,
    image_url: "https://images.same-assets.com/ebay-instantpot.jpg",
    category: "home"
  }
];

// Main function to execute the seeding process
async function main() {
  console.log('Starting database seeding...');
  
  // First, check if the products table exists. This is an optional sanity check.
  const { data: tableCheck, error: checkError } = await supabase
    .from('products')
    .select('*')
    .limit(0);

  if (checkError && checkError.code === '42P01') {
      console.error('Error: The "products" table does not exist. Please create it first in your Supabase dashboard.');
      process.exit(1);
  }

  // Insert the product data
  const { error: insertError } = await supabase.from('products').insert(products);
  
  if (insertError) {
    console.error('Seeding failed:', insertError.message);
    process.exit(1);
  }

  console.log('✅ Products seeded successfully!');
  process.exit(0);
}

main();