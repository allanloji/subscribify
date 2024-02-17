import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

export const Title = styled.h1`
  font-size: 4rem;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
`;

export const CreateLink = styled(Link)`
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-size: 1rem;
  text-decoration: none;
  margin-top: 2rem;
  display: block;
  transition: color 0.2s;
  text-align: center;
  width: fit-content;

  &:hover {
    background-color: #666;
  }
`;

export const NewslettersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  height: 100%;
`;

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  background-color: #c3f0c3;
  border-radius: 1rem;
  padding: 2rem;
  justify-content: space-between;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;
`;

export const MessageTitle = styled.h2`
  font-size: 2rem;
  color: #000;
  font-weight: normal;
`;

export const MessageSubtitle = styled.p`
  color: #000;
`;

export const MessageImage = styled(Image)``;
