// "use client";

// import { Skeleton } from "@/components/ui/skeleton";
// import { Doc } from "@/convex/_generated/dataModel";
// import React from "react";

// interface TitleProps {
//   initialData: Doc<"documents">;
// }

// const Title = ({ initialData }: TitleProps) => {
//   return (
//     <div className="flex items-center gap-1">
//       {!!initialData.icon && <p className="text-3xl">{initialData.icon}</p>}
//       <h1 className="text-base py-2 md:text-3xl">{initialData?.title}</h1>
//     </div>
//   );
// };

// export default Title;

// Title.Skeleton = function TitleSkeleton() {
//   return (
//     <div className="py-16">
//       <Skeleton className="h-16 rounded-md" />
//     </div>
//   );
// };
