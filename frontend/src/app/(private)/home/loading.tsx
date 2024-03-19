import { Skeleton } from "@/components/ui/skeleton";

export default function ItemsTableLoading() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] flex-col max-h-600:mt-auto">
      <div className="min-w-[40%]">
        <div className="flex justify-between gap-3 pb-8 pt-4">
          <div className="flex items-center">
            <Skeleton className="max-w-80 rounded-xl w-60 h-9" />
          </div>
          <div>
            <Skeleton className="w-20 h-10 xs:mr-1" />
          </div>
        </div>
        <Skeleton className="w-full h-72"/>
      </div>
    </div>
  );
}
