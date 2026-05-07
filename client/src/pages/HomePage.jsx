import { useState, useEffect } from 'react';
import { checkBackendHealth } from '../services/api';

const HomePage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      setLoading(true);
      setError(null);
      const result = await checkBackendHealth();

      if (result.success) {
        setHealth(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    return status === 'healthy' ? 'text-emerald-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">Production Ready Stack</p>
          <h1 className="mt-4 text-4xl font-bold md:text-6xl">React + NestJS + Prisma + Docker</h1>
          <p className="mt-6 max-w-3xl text-slate-300">
            Scalable fullstack monorepo with environment-driven configuration and Docker-based development/production workflows.
          </p>

          {/* API URL */}
          <div className="mt-8 rounded-xl bg-slate-800 p-4 text-sm text-slate-300">
            API Base URL from environment: <span className="font-semibold text-emerald-400">{apiUrl}</span>
          </div>

          {/* Backend Health Status */}
          <div className="mt-8 rounded-xl border border-slate-700 bg-slate-800 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-100">Backend Health Status</h2>
              <div className="flex items-center gap-2">
                {loading ? (
                  <span className="text-sm text-slate-400">Checking...</span>
                ) : (
                  <>
                    <div className={`h-3 w-3 rounded-full ${health?.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                    <span className={`text-sm font-semibold ${getStatusColor(health?.status)}`}>{health?.status || 'Unknown'}</span>
                  </>
                )}
              </div>
            </div>

            {/* Health Details */}
            {!loading && health && (
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Server Status:</span>
                  <span className="font-semibold">{health.server}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Database:</span>
                  <span className={`font-semibold ${health.database === 'connected' ? 'text-emerald-400' : 'text-red-400'}`}>{health.database}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Check:</span>
                  <span className="font-semibold text-cyan-400">{new Date(health.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
