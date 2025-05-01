import { HeartIcon, MapPinIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'

interface ProductRentCardProps {
  name: string
  location: string
  price: string
  image: string
  sellerName: string
}

const ProductRentCard: FC<ProductRentCardProps> = ({
  name,
  location,
  price,
  image,
  sellerName,
}) => {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="aspect-video w-full object-cover"
        />
      </div>
      <CardContent>
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm font-medium">{price}</p>
          <p className="text-sm text-gray-600">Seller: {sellerName}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="outline" size="sm">
          Details
        </Button>
        <Button size="sm">Rent Now</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductRentCard
