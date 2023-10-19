import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Heading } from '@react-email/heading';
import { Link } from '@react-email/link';

import type { StatementResponse } from 'src/prompts/prompts.dto';

export interface SentenceAnswersProps {
  readonly statement: StatementResponse;
  readonly link: string;
  readonly logoUrl: string;
}

const SentenceAnswers = ({
  logoUrl,
  statement,
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
            <Img src={logoUrl} />
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
          {statement.statement}
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
