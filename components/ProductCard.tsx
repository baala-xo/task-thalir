// components/ProductCard.tsx
import Link from 'next/link';
import Image from 'next/image';

// Define the props for the component
type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate text-gray-800">{product.name}</h3>
          <p className="text-xl font-bold text-blue-600 mt-1">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}