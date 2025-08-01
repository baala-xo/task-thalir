// app/products/[productId]/page.tsx
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
};

export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  const { productId } = params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error || !product) {
    // This is a standard Next.js function to show a 404 page
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden md:flex">
        {/* Product Image */}
        <div className="md:w-1/2 p-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6 text-sm text-gray-500">
            <span className="font-semibold">Category:</span>
            <span className="ml-2 px-3 py-1 bg-gray-200 rounded-full">{product.category}</span>
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}