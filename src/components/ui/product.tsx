import { Skeleton } from "@/components/ui";
import * as React from "react"
export function ProductCard(product) {
    return (
      <div key={product.id} className="group relative">
        <div className="w-full overflow-hidden rounded-md bg-muted border-muted lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            alt={product.description}
            src={product.image}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full border-muted"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="w-full">
            <p className="text-green-600 text-sm font-medium leading-5">
              &#9733; 5.0
            </p>
            <h3 className="text-xl font-semibold">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.product_name}
              </a>
            </h3>
            <p className="text-sm font-base text-gray-200">
              {product.description}
            </p>
            <div className="py-1">
              <hr />
            </div>
            <section className="flex items-center justify-between">
              <p className="mt-1 text-sm text-gray-500">
                {product.quantity_in_stock} in stock
              </p>
              <p className="text-sm font-base text-gray-500">
                Ksh {product.price}{" "}
                <span className="text-gray-600 font-light">each</span>
              </p>
            </section>
          </div>
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