import { Spacer } from "@/components/ui";
import * as S from "./StatCard.styles";
import StatCardPlaceholder from "./StatCard.placeholder";

interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <S.Container>
      <S.IconContainer backgroundColor={color}>{icon}</S.IconContainer>
      <Spacer size={1.5} horizontal />
      <div>
        <S.Title>{value}</S.Title>
        <Spacer size={0.5} />
        <S.Value>{title}</S.Value>
      </div>
    </S.Container>
  );
}

StatCard.Placeholder = StatCardPlaceholder;

export default StatCard;
