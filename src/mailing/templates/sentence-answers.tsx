import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Img } from '@react-email/img';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Heading } from '@react-email/heading';
import { Link } from '@react-email/link';
import { Font } from '@react-email/font';

import { UserSentenceDto } from 'src/sentences/sentences.dto';

export interface SentenceAnswersProps {
  readonly statement: UserSentenceDto;
  readonly dashboardLink: string;
  readonly logoUrl: string;
  readonly fontsUrl: string;
}

const SentenceAnswers = ({
  logoUrl,
  statement,
  dashboardLink,
  fontsUrl,
}: SentenceAnswersProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome</title>
        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexCF-ExtraLight.otf`,
            format: 'opentype',
          }}
          fontWeight={200}
          fontStyle="normal"
        />
        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexCF-Regular.otf`,
            format: 'opentype',
          }}
          fontWeight={400}
          fontStyle="normal"
        />

        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexHandCF-ExtraLight.otf`,
            format: 'opentype',
          }}
          fontWeight={200}
          fontStyle="normal"
        />
        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexHandCF-Light.otf`,
            format: 'opentype',
          }}
          fontWeight={300}
          fontStyle="normal"
        />
        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexHandCF-Regular.otf`,
            format: 'opentype',
          }}
          fontWeight={400}
          fontStyle="normal"
        />

        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexHandCF-ExtraBold.otf`,
            format: 'opentype',
          }}
          fontWeight={800}
          fontStyle="normal"
        />
        <Font
          fontFamily="artifex-hand-cf"
          fallbackFontFamily="Verdana"
          webFont={{
            url: `${fontsUrl}/ArtifexHandCF-Heavy.otf`,
            format: 'opentype',
          }}
          fontWeight={900}
          fontStyle="normal"
        />
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
            paddingTop: '4px',
          }}
        >
          {statement.statement}
        </Text>

        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '20px',
          }}
        >
          Fear:
        </Text>
        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '4px',
          }}
        >
          {statement.fear}
        </Text>

        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '20px',
          }}
        >
          Love:
        </Text>
        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '4px',
          }}
        >
          {statement.love}
        </Text>

        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '20px',
          }}
        >
          Talent:
        </Text>
        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '4px',
          }}
        >
          {statement.talent}
        </Text>

        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '20px',
          }}
        >
          Ambition:
        </Text>
        <Text
          style={{
            color: '#44432E',
            fontFamily: 'artifex-hand-cf, sans-serif',
            fontSize: '18px',
            letterSpacing: '-0.9px',
            paddingTop: '4px',
          }}
        >
          {statement.ambition}
        </Text>

        <Row>
          <Column align="center">
            <Link
              href={dashboardLink}
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
