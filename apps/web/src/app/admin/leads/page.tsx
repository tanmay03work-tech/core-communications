'use client';

import { useEffect, useState, useMemo } from 'react';
import { Users, Mail, Phone, Search, RefreshCw, Calendar, BookOpen, FileSpreadsheet, Lock, KeyRound, ShieldAlert, LogOut, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  blogTitle?: string;
  blogSlug?: string;
  submittedAt: string;
};

export default function AdminLeadsPage() {
  const [passcode, setPasscode] = useState('');
  const [inputPasscode, setInputPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const savedPasscode = localStorage.getItem('core_admin_passcode');
      if (savedPasscode) {
        setPasscode(savedPasscode);
        verifyAndFetchLeads(savedPasscode);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const verifyAndFetchLeads = async (passcodeToTry: string) => {
    setLoading(true);
    setError('');
    setLoginError('');

    try {
      const res = await fetch('/api/blog-lead', {
        headers: { 'x-admin-passcode': passcodeToTry },
        cache: 'no-store',
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setLoginError('Invalid Admin Passcode. Please try again.');
        localStorage.removeItem('core_admin_passcode');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to load lead data');
      }

      const data = await res.json();
      setLeads(data.leads || []);
      setIsAuthenticated(true);
      setPasscode(passcodeToTry);
      localStorage.setItem('core_admin_passcode', passcodeToTry);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching lead data';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPasscode.trim()) {
      setLoginError('Please enter the admin passcode.');
      return;
    }
    verifyAndFetchLeads(inputPasscode.trim());
  };

  const handleLockDashboard = () => {
    localStorage.removeItem('core_admin_passcode');
    setPasscode('');
    setInputPasscode('');
    setIsAuthenticated(false);
    setLeads([]);
  };

  const filteredLeads = useMemo(() => {
    if (!searchTerm.trim()) return leads;
    const term = searchTerm.toLowerCase().trim();
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.toLowerCase().includes(term) ||
        (lead.blogTitle && lead.blogTitle.toLowerCase().includes(term))
    );
  }, [leads, searchTerm]);

  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ['ID', 'Full Name', 'Email Address', 'Phone Number', 'Blog Article Title', 'Blog Slug', 'Submission Date'];
    const csvRows = [
      headers.join(','),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.id}"`,
          `"${lead.name.replace(/"/g, '""')}"`,
          `"${lead.email.replace(/"/g, '""')}"`,
          `"${lead.phone.replace(/"/g, '""')}"`,
          `"${(lead.blogTitle || '').replace(/"/g, '""')}"`,
          `"${(lead.blogSlug || '').replace(/"/g, '""')}"`,
          `"${new Date(lead.submittedAt).toLocaleString()}"`,
        ].join(',')
      ),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `blog_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render Passcode Lock Screen if not authenticated
  if (isAuthenticated === false) {
    return (
      <main className="min-h-screen bg-navy text-white flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md border border-white/15 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Lock className="h-7 w-7" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Admin Security Access
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Please enter the security passcode to access client lead submissions.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="mt-8 space-y-4">
            {loginError ? (
              <div className="flex items-center gap-2 rounded border border-red-500/30 bg-red-500/10 p-3 text-xs font-medium text-red-300">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            ) : null}

            <div>
              <label htmlFor="admin-passcode" className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/80">
                Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  id="admin-passcode"
                  type="password"
                  required
                  placeholder="Enter passcode..."
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  className="w-full border border-white/20 bg-white/10 px-4 py-3 pl-10 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded bg-[linear-gradient(90deg,#00B896_0%,#00D4AA_100%)] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-navy shadow-md transition-all duration-200 hover:brightness-110 hover:shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <span className="font-extrabold text-navy">{loading ? 'Verifying Passcode...' : 'Access Lead Dashboard'}</span>
              <ArrowRight className="h-4 w-4 text-navy stroke-[2.5]" />
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-4 text-center text-[0.7rem] text-white/40">
            Protected Admin Area • Core Communications
          </div>
        </div>
      </main>
    );
  }

  // Hydration state loader
  if (isAuthenticated === null) {
    return (
      <main className="min-h-screen bg-surface-light flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-navy/60">
          <RefreshCw className="h-5 w-5 animate-spin text-primary" />
          <span>Verifying security credentials...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface-light text-navy pb-24 pt-32 md:pt-36">
      <Container className="max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-navy/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              <Users className="h-3.5 w-3.5" />
              <span>Client Lead Center (Authenticated)</span>
            </div>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Blog Lead Submissions
            </h1>
            <p className="mt-2 text-sm text-navy/70">
              View and manage reader leads captured from gated blog posts and downloadable guides.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => verifyAndFetchLeads(passcode)}
              disabled={loading}
              className="inline-flex items-center gap-2 border border-navy/15 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-navy transition-colors hover:bg-navy/5 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleExportCSV}
              disabled={filteredLeads.length === 0}
              className="inline-flex items-center gap-2 border border-navy bg-navy px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary disabled:opacity-50"
            >
              <FileSpreadsheet className="h-4 w-4 text-accent" />
              <span>Export CSV ({filteredLeads.length})</span>
            </button>
            <button
              onClick={handleLockDashboard}
              className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 transition-colors hover:bg-red-100"
              title="Lock Admin Dashboard"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-navy/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-navy/60">
              <span className="text-xs font-bold uppercase tracking-wider">Total Leads</span>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-2 font-heading text-3xl font-bold text-navy">{leads.length}</div>
            <div className="mt-1 text-[0.72rem] text-navy/50">Captured from blog gates & guides</div>
          </div>

          <div className="border border-navy/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-navy/60">
              <span className="text-xs font-bold uppercase tracking-wider">Unique Readers</span>
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div className="mt-2 font-heading text-3xl font-bold text-navy">
              {new Set(leads.map((l) => l.email.toLowerCase())).size}
            </div>
            <div className="mt-1 text-[0.72rem] text-navy/50">Verified unique email addresses</div>
          </div>

          <div className="border border-navy/10 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-navy/60">
              <span className="text-xs font-bold uppercase tracking-wider">Latest Activity</span>
              <Calendar className="h-5 w-5 text-navy/60" />
            </div>
            <div className="mt-2 text-base font-semibold text-navy">
              {leads.length > 0
                ? new Date(leads[0].submittedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'No submissions yet'}
            </div>
            <div className="mt-1 text-[0.72rem] text-navy/50">Real-time Resend email sync</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 flex items-center justify-between gap-4 border border-navy/15 bg-white p-3 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone, or blog article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent py-1.5 pl-10 pr-4 text-sm text-navy placeholder:text-navy/40 focus:outline-none"
            />
          </div>
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-semibold text-navy/50 hover:text-navy"
            >
              Clear Search
            </button>
          ) : null}
        </div>

        {/* Leads Table */}
        <div className="mt-6 overflow-hidden border border-navy/15 bg-white shadow-sm">
          {loading && leads.length === 0 ? (
            <div className="p-12 text-center text-sm text-navy/60">
              <RefreshCw className="mx-auto mb-3 h-6 w-6 animate-spin text-primary" />
              <span>Loading lead submissions...</span>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-sm text-red-600">
              <p>{error}</p>
              <button
                onClick={() => verifyAndFetchLeads(passcode)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold underline"
              >
                Try Again
              </button>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-navy/60">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-navy/30" />
              <h3 className="font-heading text-lg font-semibold text-navy">No Leads Found</h3>
              <p className="mt-1 text-xs">
                {searchTerm ? 'No submissions match your search criteria.' : 'When readers submit the blog lead form, their details will appear here.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-navy">
                <thead className="border-b border-navy/10 bg-surface-light text-[0.68rem] font-bold uppercase tracking-wider text-navy/60">
                  <tr>
                    <th className="px-6 py-4">Reader Name</th>
                    <th className="px-6 py-4">Contact Info</th>
                    <th className="px-6 py-4">Blog Article</th>
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="transition-colors hover:bg-surface-light/60">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-semibold text-navy">{lead.name}</div>
                        <div className="text-[0.72rem] text-navy/50">ID: {lead.id.slice(0, 14)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-navy hover:text-accent font-medium"
                          >
                            <Mail className="h-3.5 w-3.5 text-navy/40" />
                            <span>{lead.email}</span>
                          </a>
                          <a
                            href={`tel:${lead.phone}`}
                            className="inline-flex items-center gap-1.5 text-xs text-navy/80 hover:text-primary"
                          >
                            <Phone className="h-3.5 w-3.5 text-navy/40" />
                            <span>{lead.phone}</span>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate font-medium text-navy">
                          {lead.blogTitle || 'General Blog Access'}
                        </div>
                        {lead.blogSlug ? (
                          <a
                            href={`/blogs/${lead.blogSlug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[0.72rem] font-semibold text-primary hover:underline"
                          >
                            View Post -&gt;
                          </a>
                        ) : null}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-xs text-navy/70">
                        {new Date(lead.submittedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <a
                          href={`mailto:${lead.email}?subject=Core Communications Follow Up - ${encodeURIComponent(lead.blogTitle || 'Blog Insights')}`}
                          className="inline-flex items-center gap-1 border border-navy/15 bg-white px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wider text-navy transition-colors hover:bg-navy hover:text-white"
                        >
                          <Mail className="h-3 w-3" />
                          <span>Email Lead</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
