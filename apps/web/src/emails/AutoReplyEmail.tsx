import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { getSiteUrl } from '@/lib/resend';

type AutoReplyEmailProps = {
  name: string;
};

export function AutoReplyEmail({ name }: AutoReplyEmailProps) {
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/core_logo_clean.svg`;

  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Core Communications</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={hero}>
            <Img
              src={logoUrl}
              alt="Core Communications"
              width="72"
              height="72"
              style={logo}
            />
            <Text style={eyebrow}>Core Communications</Text>
            <Heading style={heading}>Thank you for reaching out</Heading>
            <Text style={lede}>
              Hi {name}, thanks for getting in touch. We have received your note and will come
              back with the sharpest next step as soon as possible.
            </Text>
          </Section>

          <Section style={panel}>
            <Text style={panelTitle}>What happens next</Text>
            <Text style={panelCopy}>
              We review each enquiry personally and usually respond with a tailored recommendation,
              call availability, or a request for one or two clarifying details.
            </Text>
          </Section>

          <Button href={`${siteUrl}/work`} style={button}>
            Explore our work
          </Button>

          <Text style={footer}>
            Core Communications
            <br />
            Sydney, Mumbai and New Delhi
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#edf3f8',
  fontFamily: 'Open Sans',
  margin: 0,
  padding: '32px 16px',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #dbe5ee',
  borderRadius: '24px',
  margin: '0 auto',
  maxWidth: '640px',
  overflow: 'hidden',
  padding: '0 0 36px',
};

const hero = {
  background: 'linear-gradient(135deg, #081931 0%, #123257 100%)',
  padding: '36px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto 18px',
};

const eyebrow = {
  color: '#3db7f2',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.16em',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
};

const heading = {
  color: '#ffffff',
  fontFamily: 'Poppins',
  fontSize: '30px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '0 0 12px',
};

const lede = {
  color: '#d8e8f4',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: 0,
};

const panel = {
  backgroundColor: '#f7fbff',
  borderRadius: '18px',
  margin: '32px 36px 24px',
  padding: '24px',
};

const panelTitle = {
  color: '#081931',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 8px',
};

const panelCopy = {
  color: '#35516f',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: 0,
};

const button = {
  backgroundColor: '#3db7f2',
  borderRadius: '999px',
  color: '#081931',
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: '700',
  margin: '0 36px',
  padding: '14px 22px',
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
};

const footer = {
  color: '#56748e',
  fontSize: '13px',
  lineHeight: '1.7',
  margin: '28px 36px 0',
};
