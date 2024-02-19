import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function StatCardPlaceholder() {
  return (
    <>
      <Skeleton height={100} width={300} borderRadius="0.75rem" />
    </>
  );
}

export default StatCardPlaceholder;
