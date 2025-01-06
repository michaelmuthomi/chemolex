import * as React from "react";

import { Button, Skeleton } from "@/components/ui";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User2Icon } from "lucide-react";

export function CardComponent({ icon, title, statistic, moreDetails, percentage = 0 }) {
  return (
    <Card className="shadow-none border-none">
      <CardHeader className="flex flex-row gap-4">
        <section className="bg-blue-100 w-max h-max p-2 mt-[6px] rounded-full">
          {icon}
        </section>
        <section>
          <CardTitle className="text-4xl leading-none">
            {statistic === 0 ? <Skeleton className="w-2/4 h-10" /> : statistic}
          </CardTitle>
          <div className="flex justify-between items-center py-2 font-medium text-sm">
            <p className="text-gray-500 ">{title}</p>
          </div>
        </section>
      </CardHeader>
    </Card>
  );
}

export function CardSkeleton() {
  return (
    <Card className="shadow-none border-none">
      <CardHeader className="divide-y">
        <CardTitle className="text-2xl">
          <Skeleton className="h-8 w-24" />
        </CardTitle>
        <div className="flex justify-between items-center py-2 font-medium text-sm">
          <p className="text-gray-500">
            <Skeleton className="h-4 w-24" />
          </p>
          <p className="text-green-600">
            <Skeleton className="h-4 w-12" />
          </p>
        </div>
      </CardHeader>
    </Card>
  );
}
