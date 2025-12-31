import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-green-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-700 dark:text-green-400">
                🌱 Harvest Nutrition
              </Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
                Home
              </Link>
              <Link href="/about" className="text-green-600 dark:text-green-400 font-semibold">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
          About Harvest Nutrition
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            At Harvest Nutrition, we believe that healthy eating should be simple, enjoyable, and accessible to everyone. 
            Our mission is to empower individuals to make informed nutritional choices that enhance their overall well-being.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We provide evidence-based nutrition information, delicious recipes, and personalized meal planning tools 
            to help you achieve your health goals.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What We Offer
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-3 text-2xl">✓</span>
              <span>Curated collection of healthy, delicious recipes for all dietary preferences</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-3 text-2xl">✓</span>
              <span>Personalized meal planning tools and nutritional guidance</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-3 text-2xl">✓</span>
              <span>Expert tips and articles on nutrition, wellness, and healthy living</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-3 text-2xl">✓</span>
              <span>Community support and resources for your wellness journey</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                Evidence-Based
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                All our nutritional advice is backed by scientific research and expert knowledge.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                Inclusive
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We cater to all dietary preferences and needs, from vegan to gluten-free and beyond.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                Sustainable
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We promote environmentally conscious eating habits and sustainable food choices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                Supportive
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We foster a welcoming community where everyone feels supported on their health journey.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl"
          >
            Get in Touch
          </Link>
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
