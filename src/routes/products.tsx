import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header, DialogComponent, CardComponent } from "@/components";
import { ProductCard, ProductSkeleton } from "@/components/ui";
import { ProductTable } from "@/components/tables/Product";
import { Switch } from "@/components/ui/switch";
import { fetchProducts } from "@/api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui";

export const Route = createFileRoute("/products")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <ProductPage />
      </main>
    </SidebarProvider>
  ),
});

function ProductPage() {
  const [isGridLayout, setIsGridLayout] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [cardData, setCardData] = React.useState([]);

  // fetch products
  async function productsFetcher() {
    setProducts(await fetchAllProducts());
  }
  React.useEffect(() => {
    productsFetcher();
    setCardData([
      {
        icon: <SquareStack size={20} color="black" />,
        title: "Total Products",
        statistic: products.length,
        moreDetails: "The total amount of all orders.",
      },
      {
        icon: <SquareStack size={20} color="black" />,
        title: "Most Expensive",
        statistic:
          products.length > 0
            ? Math.max(...products.map((product) => product.price))
            : 0,
        moreDetails: "The most expensive item.",
      },
      {
        icon: <SquareStack size={20} color="black" />,
        title: "Most Affordable",
        statistic:
          products.length > 0
            ? Math.min(...products.map((product) => product.price))
            : 0,
        moreDetails: "The most affordable item.",
      },
    ]);
  }, [products]);

  return (
    <div className="flex flex-col">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Products" />
      </section>
      <section className="px-6 pt-10 flex justify-between items-center gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Products</h1>
          <p className="font-medium text-zinc-600">
            View products that are currently listed
          </p>
        </div>
        <div className="flex items-center">
          <Switch
            onclick={() => {
              setIsGridLayout(!isGridLayout);
            }}
          />
        </div>
      </section>
      <section className="flex pb-6 pt-4 border-b-[1px]">
        {cardData.map((card, index) => (
          <div className="w-1/3" key={index}>
            <CardComponent
              icon={card.icon}
              title={card.title}
              statistic={card.statistic}
              moreDetails={card.moreDetails}
              percentage={10}
            />
          </div>
        ))}
      </section>
      <section className="px-6">
        {isGridLayout ? (
          products.length === 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )
        ) : (
          <ProductTable data={products} />
        )}
      </section>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchAllProducts } from "@/api/fetchProducts";
import { SquareStack } from "lucide-react";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}