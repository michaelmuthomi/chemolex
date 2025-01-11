import { Skeleton } from "@/components/ui";
import { formatPrice } from "@/hooks/format-price";
import * as React from "react"
export function ProductCard(product) {
    return (
      <div key={product.id} className="group relative">
        <div className="flex gap-4">
          <div className="w-full">
            <h3 className="text-base font-semibold">
              {product.name}
            </h3>
            <p className="text-sm font-base text-zinc-400">
              {product.description}
            </p>
          </div>
        </div>
        <div className="aspect-video rounded-md overflow-clip bg-white mt-4">
          <img
            alt={product.description}
            src={product.image_url}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    );
}

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-80" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}