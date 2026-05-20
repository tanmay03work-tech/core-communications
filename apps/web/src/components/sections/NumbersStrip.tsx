import CounterAnimation from '@/components/animations/CounterAnimation';

const PROVEN_RESULTS = [
  {value: '20M+', label: 'Audience reach'},
  {value: '50+', label: 'Media stories in two weeks'},
  {value: '15+', label: 'Years of APAC relationships'},
  {value: '95%', label: 'Media relevance achieved'},
] as const;

export default async function NumbersStrip() {
  return (
    <section className="relative overflow-hidden bg-primary py-14 text-white md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-35deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 16px)',
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid-quarters">
          {PROVEN_RESULTS.map((stat) => (
            <div key={stat.label}>
              <CounterAnimation value={stat.value} />
              <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-white/72">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
