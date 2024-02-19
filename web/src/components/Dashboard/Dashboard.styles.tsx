import styled from "@emotion/styled";

export const Title = styled.h1`
  font-size: 4rem;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #666;
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

  @media (max-width: 640px) {
    height: fit-content;
    flex-direction: column;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 40%;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const MessageTitle = styled.p`
  font-size: 2rem;
  color: #000;
  font-weight: normal;
`;

export const MessageSubtitle = styled.p`
  color: #000;
`;
