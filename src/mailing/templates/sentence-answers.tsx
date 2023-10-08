import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';

export const SentenceAnswers = () => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>My email title</title>
      </Head>
      <Button href="https://example.com" style={{ color: '#61dafb' }}>
        Click me
      </Button>
    </Html>
  );
};
