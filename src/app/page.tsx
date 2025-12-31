import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-green-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">🌱 Harvest Nutrition</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Harvest Nutrition
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Your journey to healthy living starts here. Discover nutritious recipes, 
            personalized meal plans, and expert wellness tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
            >
              Learn More
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition border-2 border-green-600 dark:border-green-400"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">🥗</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Healthy Recipes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore our collection of delicious and nutritious recipes designed for optimal health.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Meal Planning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized meal plans tailored to your dietary needs and goals.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Wellness Tips
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn from experts about nutrition, fitness, and maintaining a healthy lifestyle.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2025 Harvest Nutrition. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
