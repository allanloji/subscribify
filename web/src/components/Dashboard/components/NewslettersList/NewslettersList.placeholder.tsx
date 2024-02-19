import { Spacer } from "@/components/ui";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Newsletter from "../Newsletter";

import * as S from "./NewslettersList.styles";

function NewslettersListPlaceholder() {
  return (
    <>
      <Skeleton height={24} width={300} />
      <Spacer />
      <Skeleton height={24} width={500} />
      <Spacer size={2} />
      <S.Container>
        <Newsletter.Placeholder />
        <Newsletter.Placeholder />
        <Newsletter.Placeholder />
      </S.Container>
    </>
  );
}
export default NewslettersListPlaceholder;
