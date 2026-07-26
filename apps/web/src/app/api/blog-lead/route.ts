import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { getContactEmailConfig, getResendClient, isResendConfigured } from '@/lib/resend';

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  blogTitle: z.string().optional(),
  blogSlug: z.string().optional(),
});

type LeadRecord = z.infer<typeof leadSchema> & {
  id: string;
  submittedAt: string;
};

const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

function getStoredLeads(): LeadRecord[] {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      const dataDir = path.dirname(leadsFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(leadsFilePath, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const fileContent = fs.readFileSync(leadsFilePath, 'utf-8');
    return JSON.parse(fileContent) as LeadRecord[];
  } catch (error) {
    console.error('Error reading leads file:', error);
    return [];
  }
}

function saveStoredLead(lead: LeadRecord) {
  try {
    const existing = getStoredLeads();
    const updated = [lead, ...existing];
    const dataDir = path.dirname(leadsFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(leadsFilePath, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving lead to file:', error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, blogTitle, blogSlug } = result.data;
    const submittedAt = new Date().toISOString();
    const id = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    const newLeadRecord: LeadRecord = {
      id,
      name,
      email,
      phone,
      blogTitle: blogTitle || 'General Blog Access',
      blogSlug: blogSlug || '',
      submittedAt,
    };

    // Save lead to local storage file
    saveStoredLead(newLeadRecord);

    // Send email notification to client via Resend
    let emailSent = false;
    if (isResendConfigured()) {
      try {
        const resend = getResendClient();
        const { from, to } = getContactEmailConfig();
        await resend.emails.send({
          from,
          to: [to],
          subject: `New Blog Lead Captured: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #0D1B2A;">
              <h2 style="color: #00B896;">New Lead Captured from Blog</h2>
              <p>A user submitted their contact details to read a blog post / download guides on your website.</p>
              <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email Address:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone Number:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Article Title:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${blogTitle || 'Blog Article'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Submission Date:</td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date(submittedAt).toLocaleString()}</td></tr>
              </table>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">View all leads in your Admin Leads Dashboard: <a href="https://www.corecommunication.biz/admin/leads">Admin Dashboard</a></p>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailErr) {
        console.error('Failed to send Resend lead email:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      emailSent,
      lead: newLeadRecord,
    });
  } catch (error) {
    console.error('Blog lead API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const adminPasscode = process.env.ADMIN_PASSCODE || 'core2026';
    const { searchParams } = new URL(req.url);
    const authHeader = req.headers.get('x-admin-passcode') || searchParams.get('passcode');

    if (authHeader !== adminPasscode) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Admin Passcode' }, { status: 401 });
    }

    const leads = getStoredLeads();
    return NextResponse.json({ leads, total: leads.length });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json({ error: 'Failed to retrieve leads' }, { status: 500 });
  }
}
