import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NewsletterPlaceholder() {
  return (
    <>
      <Skeleton height={250} />
    </>
  );
}

export default NewsletterPlaceholder;
