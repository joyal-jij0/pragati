import { HeartIcon, MapPinIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

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
        <div className="absolute top-0 right-0 px-2 py-1 z-100 flex justify-between text-xs">
          <div className="size-8 bg-white items-center justify-center rounded-full text-muted-foreground flex flex-row">
            <HeartIcon className="size-4" />
          </div>
        </div>
      </div>
      <CardContent className="px-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-medium">{price}</p>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <p className="text-sm text-gray-600 flex flex-row items-center">
              <MapPinIcon size={14} className="mr-1" />
              {location}
            </p>
            <p className="text-sm text-gray-600 flex flex-row items-center">
              <UserIcon size={14} className="mr-1" />
              {sellerName}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-2 pt-0">
        <Button variant="outline" size="sm">
          Details
        </Button>
        <Button size="sm">Rent Now</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductRentCard
