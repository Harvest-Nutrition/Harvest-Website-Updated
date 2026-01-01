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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Home Section */}
      <div className="min-h-screen" style={{ background: '#228B22' }}>
        <div
          className={`container mx-auto px-4 min-h-screen flex items-center transition-all duration-500 ${
            showModal ? 'blur-md scale-105' : 'blur-0 scale-100'
          }`}
        >
        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left Side - Text and Button */}
          <div className="text-left space-y-8 md:pl-8">
            {/* Logo */}
            <div className="mb-8">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tree trunk */}
                <rect x="35" y="50" width="10" height="20" fill="#8B4513" rx="2"/>

                {/* Leaves - Multiple layers for fullness */}
                {/* Bottom layer */}
                <circle cx="25" cy="45" r="8" fill="#90EE90"/>
                <circle cx="35" cy="48" r="8" fill="#90EE90"/>
                <circle cx="45" cy="48" r="8" fill="#90EE90"/>
                <circle cx="55" cy="45" r="8" fill="#90EE90"/>

                {/* Middle layer */}
                <circle cx="20" cy="35" r="8" fill="#98FB98"/>
                <circle cx="30" cy="38" r="9" fill="#98FB98"/>
                <circle cx="40" cy="40" r="9" fill="#98FB98"/>
                <circle cx="50" cy="38" r="9" fill="#98FB98"/>
                <circle cx="60" cy="35" r="8" fill="#98FB98"/>

                {/* Top layer */}
                <circle cx="25" cy="25" r="8" fill="#ADFF2F"/>
                <circle cx="35" cy="28" r="9" fill="#ADFF2F"/>
                <circle cx="40" cy="25" r="10" fill="#ADFF2F"/>
                <circle cx="45" cy="28" r="9" fill="#ADFF2F"/>
                <circle cx="55" cy="25" r="8" fill="#ADFF2F"/>

                {/* Center top accent */}
                <circle cx="40" cy="18" r="8" fill="#7FFF00"/>
              </svg>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              The Future of Nutrition Budgeting
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleOpen}
                className="px-12 py-4 bg-white text-green-800 text-lg rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign up for our waitlist!
              </button>
              <button
                onClick={scrollToAbout}
                className="px-12 py-4 bg-white text-green-800 text-lg rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                About Us
              </button>
            </div>
          </div>

          {/* Right Side - iPhone Outline */}
          <div className="hidden md:flex justify-end items-center md:pr-8">
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
      </div>

      {/* About Us Section */}
      <div id="about" className="min-h-screen bg-white">
        <div className="container mx-auto px-4 min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
            {/* Left Side - Tree Logo */}
            <div className="hidden md:flex justify-start items-center md:pl-8">
              <div className="relative">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                  {/* Larger Tree trunk */}
                  <rect x="175" y="250" width="50" height="100" fill="#8B4513" rx="5"/>

                  {/* Leaves - Multiple layers for fullness */}
                  {/* Bottom layer */}
                  <circle cx="125" cy="225" r="40" fill="#90EE90"/>
                  <circle cx="175" cy="240" r="40" fill="#90EE90"/>
                  <circle cx="225" cy="240" r="40" fill="#90EE90"/>
                  <circle cx="275" cy="225" r="40" fill="#90EE90"/>

                  {/* Middle layer */}
                  <circle cx="100" cy="175" r="40" fill="#98FB98"/>
                  <circle cx="150" cy="190" r="45" fill="#98FB98"/>
                  <circle cx="200" cy="200" r="45" fill="#98FB98"/>
                  <circle cx="250" cy="190" r="45" fill="#98FB98"/>
                  <circle cx="300" cy="175" r="40" fill="#98FB98"/>

                  {/* Top layer */}
                  <circle cx="125" cy="125" r="40" fill="#ADFF2F"/>
                  <circle cx="175" cy="140" r="45" fill="#ADFF2F"/>
                  <circle cx="200" cy="125" r="50" fill="#ADFF2F"/>
                  <circle cx="225" cy="140" r="45" fill="#ADFF2F"/>
                  <circle cx="275" cy="125" r="40" fill="#ADFF2F"/>

                  {/* Center top accent */}
                  <circle cx="200" cy="90" r="40" fill="#228B22"/>
                </svg>
              </div>
            </div>

            {/* Right Side - About Content */}
            <div className="text-left space-y-8 md:pr-8">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight" style={{ color: '#228B22' }}>
                About Us
              </h2>
              <div className="space-y-6 text-gray-700 text-lg">
                <p>
                  At Harvest Nutrition, we believe that healthy eating should be accessible, affordable, and easy to manage.
                </p>
                <p>
                  Our mission is to revolutionize the way you approach nutrition budgeting by combining cutting-edge technology with personalized insights.
                </p>
                <p>
                  Whether you're tracking macros, planning meals, or managing your food budget, we're here to help you cultivate a healthier lifestyle.
                </p>
                <p className="font-semibold" style={{ color: '#228B22' }}>
                  Join us on our journey to make nutrition simple, sustainable, and smart.
                </p>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-12 py-4 text-white text-lg rounded-full font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ background: '#228B22' }}
              >
                Back to Top
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleClose();
          }}
          tabIndex={0}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Join Our Waitlist
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
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
