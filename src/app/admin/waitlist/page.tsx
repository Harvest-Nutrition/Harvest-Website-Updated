'use client';

import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'Harvest69!';

interface WaitlistEntry {
  email: string;
  timestamp: string;
  id: string;
}

export default function WaitlistAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem('adminAuthenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
      fetchWaitlist();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchWaitlist = async () => {
    try {
      const response = await fetch('/api/admin/waitlist');
      const data = await response.json();
      setWaitlist(data.waitlist || []);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      setWaitlist([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setError('');
      fetchWaitlist();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setPassword('');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, rgba(47, 109, 53, 0.3), rgba(139, 195, 74, 0.3), rgba(76, 175, 80, 0.3), rgba(129, 199, 132, 0.3))',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <style jsx>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(-10px);
            }
            75% {
              transform: translateY(-30px) translateX(5px);
            }
          }
          .floating-circle {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(47, 109, 53, 0.4), transparent);
            animation: float 20s ease-in-out infinite;
          }
        `}</style>

        <div className="floating-circle" style={{
          width: '300px',
          height: '300px',
          top: '10%',
          left: '10%',
          animationDelay: '0s'
        }}></div>
        <div className="floating-circle" style={{
          width: '200px',
          height: '200px',
          top: '60%',
          right: '15%',
          animationDelay: '5s'
        }}></div>
        <div className="floating-circle" style={{
          width: '250px',
          height: '250px',
          bottom: '20%',
          left: '50%',
          animationDelay: '10s'
        }}></div>

        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          width: '100%',
          maxWidth: '400px',
          zIndex: 10
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#2f6d35',
            textAlign: 'center'
          }}>
            Admin Access
          </h1>
          <p style={{
            color: '#666',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Enter password to view waitlist
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: error ? '2px solid #ef4444' : '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => {
                if (!error) e.currentTarget.style.borderColor = '#2f6d35';
              }}
              onBlur={(e) => {
                if (!error) e.currentTarget.style.borderColor = '#ddd';
              }}
            />

            {error && (
              <p style={{
                color: '#ef4444',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#2f6d35',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#26582c'}
              onMouseOut={(e) => e.currentTarget.style.background = '#2f6d35'}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const filteredWaitlist = waitlist.filter(entry =>
    entry.email.toLowerCase().includes(filter.toLowerCase())
  );

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Timestamp', 'ID'].join(','),
      ...waitlist.map(entry => [
        entry.email,
        new Date(entry.timestamp).toLocaleString(),
        entry.id
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Waitlist Entries
          </h1>
          <p style={{ color: '#666' }}>
            Total entries: {waitlist.length}
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#555'}
          onMouseOut={(e) => e.currentTarget.style.background = '#666'}
        >
          Logout
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Filter by email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            flex: 1,
            maxWidth: '400px'
          }}
        />
        <button
          onClick={exportToCSV}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#2f6d35',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Export to CSV
        </button>
      </div>

      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                #
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                Email
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                Timestamp
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredWaitlist.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  {filter ? 'No entries match your filter' : 'No waitlist entries yet'}
                </td>
              </tr>
            ) : (
              filteredWaitlist.map((entry, index) => (
                <tr key={entry.id} style={{
                  borderBottom: index < filteredWaitlist.length - 1 ? '1px solid #eee' : 'none'
                }}>
                  <td style={{ padding: '1rem' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>
                    {entry.email}
                  </td>
                  <td style={{ padding: '1rem', color: '#666' }}>
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#999' }}>
                    {entry.id}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
          Note
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
          This page is accessible to anyone who knows the URL. Make sure to protect it with authentication
          before deploying to production. Data is stored in DynamoDB table: harvest-waitlist
        </p>
      </div>
    </div>
  );
}
