import Link from "next/link";
import * as S from "./Dashboard.styles";

function Dashboard() {
  return (
    <main>
      <S.Title>subscribify</S.Title>
      <S.Subtitle>Manage your newsletters in an easy way</S.Subtitle>
      <S.CreateLink href="/newsletters">Create a new newsletter</S.CreateLink>
    </main>
  );
}

export default Dashboard;
