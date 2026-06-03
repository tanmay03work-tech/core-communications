import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ContactFormData } from '@/lib/schema';

export function NotificationEmail({
  name,
  email,
  services,
  message,
}: ContactFormData) {
  return (
    <Html>
      <Head />
      <Preview>New Core Communications enquiry from {name}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>Core Communications</Text>
          <Heading style={heading}>New contact enquiry</Heading>
          <Text style={lede}>
            A new website enquiry just came in. Here are the submission details.
          </Text>

          <Section style={card}>
            <Detail label="Name" value={name} />
            <Detail label="Email" value={email} />
            {services.length > 0 ? (
              <Detail label="Services" value={services.join(', ')} />
            ) : null}
          </Section>

          {message ? (
            <>
              <Hr style={divider} />

              <Section>
                <Text style={labelText}>Message</Text>
                <Text style={messageBlock}>{message}</Text>
              </Section>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Section style={detailGroup}>
      <Text style={labelText}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </Section>
  );
}

const body = {
  backgroundColor: '#eef4f8',
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
  padding: '36px',
};

const eyebrow = {
  color: '#3db7f2',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.14em',
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
};

const heading = {
  color: '#081931',
  fontFamily: 'Poppins',
  fontSize: '30px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '0 0 12px',
};

const lede = {
  color: '#35516f',
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 24px',
};

const card = {
  backgroundColor: '#f7fbff',
  borderRadius: '18px',
  padding: '20px',
};

const detailGroup = {
  marginBottom: '16px',
};

const labelText = {
  color: '#3d6f94',
  fontSize: '12px',
  fontWeight: '700',
  letterSpacing: '0.08em',
  margin: '0 0 4px',
  textTransform: 'uppercase' as const,
};

const valueStyle = {
  color: '#081931',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: 0,
};

const divider = {
  borderColor: '#d6dfeb',
  margin: '28px 0',
};

const messageBlock = {
  ...valueStyle,
  backgroundColor: '#f6f9fc',
  borderRadius: '16px',
  padding: '18px',
  whiteSpace: 'pre-wrap' as const,
};
