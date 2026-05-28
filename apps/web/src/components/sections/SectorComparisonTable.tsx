'use client';

import ScrollReveal from '@/components/motion/ScrollReveal';

const rows = [
  ['Cybersecurity', 'Breach narratives, threat research, enterprise trust', 'High', 'Share of voice, analyst pickup, tier-1 coverage', 'Verizon DBIR 2025'],
  ['Identity & IAM', 'Digital trust, zero trust, identity proofing', 'High', 'Executive visibility, pipeline influence, authority', 'GBG - Digital Identity'],
  ['Healthtech', 'Clinician credibility, patient messaging, policy context', 'High', 'Clinical engagement, launch reach, trust sentiment', 'Healthtech launch programs'],
  ['XaaS Platforms', 'Category creation, product launches, developer adoption', 'Medium', 'Demo demand, media depth, inbound interest', 'Platform positioning campaigns'],
  ['Critical Infrastructure', 'Security, utilities, transport stakeholders', 'High', 'Stakeholder alignment, risk framing, tier-1 trust', 'GBG - Digital Identity'],
  ['Telecom & Technology', 'Network policy, product rollouts, infrastructure', 'High', 'Policy coverage, feature stories, reach', 'Verizon DBIR 2025'],
  ['Edtech', 'Learning outcomes, educator buy-in, parent trust', 'Medium', 'Educator engagement, founder visibility, awareness', '-'],
  ['E-commerce & Retail', 'Brand credibility, retail innovation, growth', 'Medium', 'Launch coverage, search uplift, social proof', '-'],
  ['Startups & SMBs', 'Founder profiling, fundraising narrative, traction', 'Medium', 'Investor visibility, media momentum, traffic', 'Tiiik Money - $5.2M Seed'],
  ['Sustainability & CSR', 'Impact framing, stakeholder trust, ESG proof', 'High', 'Trust lift, partner engagement, investor confidence', '-'],
  ['Public Sector', 'Policy communications, consultation, stakeholder coordination', 'High', 'Public clarity, stakeholder support, reputation', '-'],
  ['SaaS & CRMs', 'Product positioning, user growth, developer advocacy', 'Medium', 'Demo demand, user growth, analyst mentions', '-'],
  ['DeFi & Web3', 'Community trust, exchange narratives, regulation', 'High', 'Conversation quality, reach, credibility', 'Tiiik Money'],
  ['Medtech', 'Device approvals, patient education, clinician relations', 'High', 'Launch readiness, clinician response, trust', '-'],
  ['AI & Emerging Tech', 'Responsible AI framing, analyst relations, proof points', 'High', 'Authority, analyst citations, quality reach', 'AtomEthics'],
  ['Fintech & BFSI', 'Funding narratives, compliance, customer trust', 'High', 'Investor attention, share of voice, search visibility', 'Tiiik Money - Seed Raise'],
] as const;

export default function SectorComparisonTable() {
  return (
    <section className="bg-white px-6 py-28 lg:px-16">
      <ScrollReveal direction="up">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Compare sectors
            </p>
            <h2 className="mt-5 font-heading text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-primary">
              A quick view of where our expertise goes deepest
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="min-w-[980px] border-collapse">
              <thead>
                <tr className="bg-primary text-left text-white">
                  {['Sector', 'Our expertise', 'Regulatory complexity', 'Typical KPIs', 'Featured work'].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row[0]}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-surface'} border-b border-neutral-100 transition-colors hover:bg-primary/[0.02]`}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${row[0]}-${cellIndex}`}
                        className={`px-5 py-4 align-top text-sm leading-relaxed text-primary/78 ${cellIndex === 0 ? 'border-l-4 border-transparent font-semibold text-primary hover:border-accent' : ''}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
