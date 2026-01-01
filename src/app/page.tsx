'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
    setSubmitStatus(null);
    setStatusMessage('');
  };

  const handleClose = () => {
    setShowModal(false);
    setEmail('');
    setSubmitStatus(null);
    setStatusMessage('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(
          data.alreadyExists
            ? 'You are already on the waitlist!'
            : 'Successfully added to waitlist!'
        );
        setEmail('');

        // Close modal after 2 seconds on success
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side - Text and Button */}
          <div className="text-left space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              The Future of Nutrition Budgeting
            </h1>
            <button
              onClick={handleOpen}
              className="px-12 py-4 bg-green-600 text-white text-lg rounded-full font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign up for our waitlist!
            </button>
          </div>

          {/* Right Side - iPhone Outline */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              {/* iPhone 14 Pro Outline */}
              <svg
                width="300"
                height="600"
                viewBox="0 0 300 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
              >
                {/* iPhone Body */}
                <rect
                  x="10"
                  y="10"
                  width="280"
                  height="580"
                  rx="50"
                  stroke="#1f2937"
                  strokeWidth="8"
                  fill="white"
                />

                {/* Screen */}
                <rect
                  x="20"
                  y="20"
                  width="260"
                  height="560"
                  rx="45"
                  fill="#f9fafb"
                />

                {/* Dynamic Island */}
                <rect
                  x="100"
                  y="30"
                  width="100"
                  height="35"
                  rx="17.5"
                  fill="#1f2937"
                />

                {/* App Content Mockup - Green themed */}
                <g>
                  {/* Header */}
                  <rect x="40" y="90" width="220" height="40" rx="8" fill="#dcfce7" />

                  {/* Cards */}
                  <rect x="40" y="150" width="220" height="80" rx="12" fill="#bbf7d0" />
                  <rect x="40" y="245" width="220" height="80" rx="12" fill="#86efac" />
                  <rect x="40" y="340" width="220" height="80" rx="12" fill="#4ade80" />

                  {/* Bottom Navigation Bar */}
                  <rect x="40" y="530" width="220" height="30" rx="15" fill="#22c55e" />
                </g>

                {/* Volume Buttons */}
                <rect x="0" y="120" width="6" height="50" rx="3" fill="#1f2937" />
                <rect x="0" y="180" width="6" height="50" rx="3" fill="#1f2937" />

                {/* Power Button */}
                <rect x="294" y="150" width="6" height="70" rx="3" fill="#1f2937" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Waitlist
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Be the first to know when we launch!
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />

              {statusMessage && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    submitStatus === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {statusMessage}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
