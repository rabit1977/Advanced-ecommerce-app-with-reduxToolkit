import { getProductById } from '@/lib/data/get-products';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { priceFmt } from '@/lib/utils/formatters';
import Image from 'next/image';

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Product Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.brand} - {product.category}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-8">
            <Image
              alt={product.title}
              className="aspect-square rounded-md object-cover"
              height="200"
              src={product.images?.[0] || '/images/placeholder.jpg'}
              width="200"
            />
            <div className="space-y-2">
              <p><span className="font-semibold">ID:</span> {product.id}</p>
              <p><span className="font-semibold">Price:</span> {priceFmt(product.price)}</p>
              <p><span className="font-semibold">Stock:</span> {product.stock}</p>
              <p><span className="font-semibold">Rating:</span> {product.rating} ({product.reviewCount} reviews)</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p>{product.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}