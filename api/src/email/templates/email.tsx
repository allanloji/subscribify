import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface NewsletterEmailProps {
  link: string;
  newsletterName: string;
}

function NewsletterEmail({ link, newsletterName }: NewsletterEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message of your subscription</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-center text-[36px]">🚨</Text>
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>New message</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              This is a message of your subscription of{' '}
              <strong>{newsletterName}</strong>, you will find a file attached
              to this email.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="rounded-lg bg-[#000] text-white text-[16px] font-bold text-center block w-3/4 p-[10px]"
                href={link}
              >
                Unsubscribe from this newsletter
              </Button>
            </Section>
          </Container>
          <Text className="text-center">Made with ❤️ by allanloji.</Text>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default NewsletterEmail;
