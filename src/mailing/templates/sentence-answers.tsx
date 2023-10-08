import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Heading } from '@react-email/heading';
import { Link } from '@react-email/link';

const logo =
  'data:image/png;base64,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';

export interface SentenceAnswersProps {
  answer: string;
  link: string;
}

const SentenceAnswers = ({
  answer = 'test answer',
  link,
}: SentenceAnswersProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome</title>
        <style></style>
      </Head>
      <Section
        style={{
          maxWidth: '600px',
          width: '600px',
        }}
      >
        <Row
          style={{
            backgroundColor: '#44432E',
            paddingTop: '27px',
            paddingBottom: '27px',
          }}
        >
          <Column align="center">
            <Img src={logo} />
          </Column>
        </Row>
      </Section>

      <Section
        style={{
          backgroundColor: '#EEEEE5',
          paddingTop: '64px',
          maxWidth: '600px',
          width: '600px',
          paddingLeft: '65px',
          paddingRight: '65px',
        }}
      >
        <Row>
          <Column align="center">
            <Heading
              style={{
                color: '#44432E',
                fontFamily: 'artifex-hand-cf, sans-serif',
                fontSize: '32px',
                letterSpacing: '-0.96px',
              }}
            >
              Welcome
            </Heading>
          </Column>
        </Row>

        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingBottom: '20px',
          }}
        >
          Your Statement is ready:
        </Text>

        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingBottom: '20px',
          }}
        >
          {answer}
        </Text>

        <Row>
          <Column align="center">
            <Link
              href={link}
              style={{
                color: '#44432E',
                fontFamily: 'artifex-hand-cf, sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '-0.42px',
                textTransform: 'uppercase',
                borderRadius: '65px',
                border: '1px solid #A3926E',
                padding: '10px',
              }}
            >
              View on Purpose AI website
            </Link>
          </Column>
        </Row>

        <Row
          style={{
            paddingTop: '234px',
            paddingBottom: '34px',
          }}
        >
          <Column align="center">
            <Text
              style={{
                color: '#A3926E',
                fontFamily: 'Inter',
                fontSize: '14px',
                letterSpacing: '-0.14px',
              }}
            >
              Terms | Privacy Policy
            </Text>
          </Column>
        </Row>
      </Section>
    </Html>
  );
};

export default SentenceAnswers;
