import { useState, useEffect } from 'react';
import { getAllUsers, searchUsersByEmail } from '../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const limit = 10;

  // Fetch users based on search or listing
  const fetchUsers = async (pageNum = 1) => {
    setLoading(true);
    setError(null);

    let result;
    if (isSearching && searchEmail) {
      result = await searchUsersByEmail(searchEmail, pageNum, limit);
    } else {
      result = await getAllUsers(pageNum, limit);
    }

    if (result.success) {
      setUsers(result.data.data);
      setPagination(result.data.pagination);
      setPage(pageNum);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    fetchUsers(1);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setPage(1);
    fetchUsers(1);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchEmail('');
    setIsSearching(false);
    setPage(1);
    fetchUsers(1);
  };

  // Handle pagination
  const handleNextPage = () => {
    if (pagination && page < pagination.totalPages) {
      fetchUsers(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchUsers(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Users Directory</h1>
          <p className="text-slate-400">Search and browse all registered users</p>
        </div>

        {/* Search Box */}
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Search by email... (e.g., dharshan@authorselvi.com)"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
            >
              Search
            </button>
            {isSearching && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Results Info */}
        {pagination && (
          <div className="mb-4 text-sm text-slate-400">
            {isSearching ? `Found ${pagination.total} user(s)` : `Total users: ${pagination.total}`} | Showing page{' '}
            {pagination.page} of {pagination.totalPages}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="inline-flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-slate-400">Loading users...</span>
            </div>
          </div>
        )}

        {/* Users Table */}
        {!loading && users.length > 0 && (
          <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={`border-b border-slate-700 ${index % 2 === 0 ? 'bg-slate-900/50' : 'bg-slate-800/30'} hover:bg-slate-800/50 transition`}>
                      <td className="px-6 py-4 text-sm text-cyan-400 font-mono">#{user.id}</td>
                      <td className="px-6 py-4 text-sm text-slate-100 break-words">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-300">{user.name || '—'}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && !error && (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-12 text-center">
            <div className="text-slate-400 mb-2">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a7 7 0 1114 0" />
              </svg>
            </div>
            <p className="text-lg">No users found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => (
                  <div key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-2 py-2">...</span>}
                    <button
                      onClick={() => fetchUsers(p)}
                      className={`px-3 py-2 rounded-lg font-semibold transition ${
                        p === page ? 'bg-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                      }`}
                    >
                      {p}
                    </button>
                  </div>
                ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
