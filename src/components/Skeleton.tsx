import type { FC } from "react";

interface SkeletonProps {
  lines?: number;
}

const Skeleton: FC<SkeletonProps> = ({ lines = 3 }) => {
  return (
    <div data-testid="skeleton" className="animate-pulse space-y-2 mt-2">
      {[...Array(lines)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
      ))}
    </div>
  );
};

export default Skeleton;
