'use client';

import { useState, FormEvent, useEffect } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past the home section (viewport height)
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollPosition > viewportHeight * 0.7) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="overflow-x-hidden">
      {/* Home Section */}
      <div className="min-h-screen" style={{ background: '#228B22' }}>
        <div
          className={`container mx-auto px-4 min-h-screen flex items-center transition-all duration-500 ${
            showModal ? 'blur-md scale-105' : 'blur-0 scale-100'
          }`}
        >
        <div className="grid md:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left Side (Desktop) / Top (Mobile) - Text and Buttons */}
          <div className="text-center md:text-left space-y-8 md:pl-8">
            {/* Logo */}
            <div className="mb-8 flex justify-center md:justify-start">
              <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tall, skinny trunk with bark texture */}
                <rect x="36" y="50" width="8" height="50" fill="#5D4E37" rx="1"/>
                {/* Bark texture lines */}
                <rect x="36" y="55" width="8" height="1" fill="#4A3C2A" opacity="0.6"/>
                <rect x="36" y="65" width="8" height="1" fill="#4A3C2A" opacity="0.6"/>
                <rect x="36" y="75" width="8" height="1" fill="#4A3C2A" opacity="0.6"/>
                <rect x="36" y="85" width="8" height="1" fill="#4A3C2A" opacity="0.6"/>
                <rect x="36" y="95" width="8" height="1" fill="#4A3C2A" opacity="0.6"/>

                {/* Darker, more distinct leaves */}
                {/* Bottom layer - Darkest green */}
                <ellipse cx="22" cy="48" rx="7" ry="9" fill="#2D5016" transform="rotate(-20 22 48)"/>
                <ellipse cx="32" cy="50" rx="8" ry="10" fill="#2D5016" transform="rotate(-10 32 50)"/>
                <ellipse cx="48" cy="50" rx="8" ry="10" fill="#2D5016" transform="rotate(10 48 50)"/>
                <ellipse cx="58" cy="48" rx="7" ry="9" fill="#2D5016" transform="rotate(20 58 48)"/>

                {/* Middle layer - Medium dark green */}
                <ellipse cx="18" cy="38" rx="7" ry="9" fill="#3A6B1F" transform="rotate(-25 18 38)"/>
                <ellipse cx="28" cy="40" rx="9" ry="11" fill="#3A6B1F" transform="rotate(-12 28 40)"/>
                <ellipse cx="40" cy="42" rx="9" ry="11" fill="#3A6B1F"/>
                <ellipse cx="52" cy="40" rx="9" ry="11" fill="#3A6B1F" transform="rotate(12 52 40)"/>
                <ellipse cx="62" cy="38" rx="7" ry="9" fill="#3A6B1F" transform="rotate(25 62 38)"/>

                {/* Upper layer - Forest green */}
                <ellipse cx="25" cy="28" rx="7" ry="9" fill="#228B22" transform="rotate(-18 25 28)"/>
                <ellipse cx="35" cy="30" rx="8" ry="10" fill="#228B22" transform="rotate(-8 35 30)"/>
                <ellipse cx="40" cy="28" rx="9" ry="11" fill="#228B22"/>
                <ellipse cx="45" cy="30" rx="8" ry="10" fill="#228B22" transform="rotate(8 45 30)"/>
                <ellipse cx="55" cy="28" rx="7" ry="9" fill="#228B22" transform="rotate(18 55 28)"/>

                {/* Top layer - Medium green */}
                <ellipse cx="30" cy="20" rx="6" ry="8" fill="#32CD32" transform="rotate(-15 30 20)"/>
                <ellipse cx="40" cy="18" rx="8" ry="10" fill="#32CD32"/>
                <ellipse cx="50" cy="20" rx="6" ry="8" fill="#32CD32" transform="rotate(15 50 20)"/>

                {/* Top accent - Brightest */}
                <ellipse cx="40" cy="10" rx="6" ry="8" fill="#3CB371"/>
              </svg>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              The Future of Nutrition Budgeting
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleOpen}
                className="px-8 sm:px-12 py-4 bg-white text-green-800 text-base sm:text-lg rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Join the Waitlist!
              </button>
              <button
                onClick={scrollToAbout}
                className="px-8 sm:px-12 py-4 bg-white text-green-800 text-base sm:text-lg rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                About Us
              </button>
            </div>

            {/* Mobile iPhone - Shows below buttons on mobile */}
            <div className="flex md:hidden justify-center items-center mt-12 mb-12">
              <div className="relative">
                {/* iPhone 14 Pro Outline - Mobile Size */}
                <svg
                  width="250"
                  height="500"
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

          {/* Right Side (Desktop only) - iPhone Outline */}
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

      {/* Gradient Transition */}
      <div className="h-32" style={{ background: 'linear-gradient(to bottom, #228B22, white)' }}></div>

      {/* About Us Section */}
      <div id="about" className="min-h-screen bg-white">
        <div className="container mx-auto px-4 min-h-screen flex items-start md:items-center justify-center pt-16 md:pt-0">
          <div className="flex items-center gap-4 md:gap-8 max-w-4xl">
            {/* Dark Green Square */}
            <div
              className="w-32 h-32 md:w-64 md:h-64 rounded-lg flex-shrink-0"
              style={{ background: '#228B22' }}
            ></div>

            {/* Text Content */}
            <div className="text-left">
              <div className="text-4xl md:text-8xl font-bold mb-2 md:mb-4" style={{ color: '#228B22' }}>
                1
              </div>
              <div className="text-lg md:text-3xl font-semibold" style={{ color: '#228B22' }}>
                Meet your Macros for Less
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Waitlist Button - Mobile Only */}
      <div
        className={`md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
          showFloatingButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <button
          onClick={handleOpen}
          className="px-8 py-4 bg-white text-green-800 text-base rounded-full font-semibold shadow-2xl hover:bg-gray-100 transition transform hover:scale-105"
        >
          Join the Waitlist!
        </button>
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
