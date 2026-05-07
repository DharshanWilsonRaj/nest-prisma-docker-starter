import { useState } from 'react';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';

function App() {
  const [currentPage, setCurrentPage] = useState('users');

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-cyan-400 cursor-pointer" onClick={() => setCurrentPage('home')}>
            🚀 FullStack App
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 'home'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('users')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === 'users'
                  ? 'bg-cyan-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Users
            </button>
          </div>
        </div>
      </nav>

      {/* Pages */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'users' && <UsersPage />}
    </div>
  );
}

export default App;
