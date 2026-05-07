const HomePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Production Ready Stack</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">React + NestJS + Prisma + Docker</h1>
          <p className="mt-6 max-w-3xl text-slate-300">
            Scalable fullstack monorepo with environment-driven configuration and Docker-based development/production workflows.
          </p>
          <div className="mt-8 rounded-xl bg-slate-800 p-4 text-sm text-slate-300">
            API Base URL from environment: <span className="font-semibold text-emerald-400">{apiUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
