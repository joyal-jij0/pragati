import Link from 'next/link'
import {
  ArrowRight,
  Cloud,
  Leaf,
  BarChart3,
  Shield,
  Users,
  Sun,
  Droplets,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-md shadow-md">
              <span className="font-bold">KS</span>
            </div>
            <div>
              <h1 className="text-green-600 font-bold text-xl tracking-tight">
                Krishi Sahayak
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Empowering Indian Farmers
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#benefits"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="cursor-pointer">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 font-medium shadow-sm"
              >
                Go to dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-800/90 z-10" />
          {/* Replaced placeholder with relevant farming hero image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center" />

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-20">
            <div className="max-w-3xl text-white">
              {/* <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-pulse">
                🚀 Hackathon Winner 2025
              </div> */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
                Krishi Sahayak
              </h1>
              <p className="text-xl md:text-2xl font-light mb-8 drop-shadow-sm max-w-2xl">
                A comprehensive digital platform empowering Indian farmers with
                real-time insights, expert advice, and market access
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-gray-100 font-semibold shadow-lg transition-all hover:scale-105"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  className="bg-yellow-600 text-white hover:bg-yellow-500 font-semibold shadow-lg transition-all hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-4 leading-tight text-gray-800">
                About Krishi Sahayak
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Krishi Sahayak is a revolutionary platform designed to transform
                Indian agriculture by providing farmers with the tools,
                information, and support they need to maximize productivity,
                increase profitability, and practice sustainable farming.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Bridging the Digital Divide in Agriculture
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  In a country where agriculture is the backbone of the economy,
                  Krishi Sahayak aims to bridge the digital divide by making
                  cutting-edge agricultural technology accessible to every
                  farmer, regardless of farm size or technical expertise.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our platform integrates weather forecasting, crop health
                  monitoring, market intelligence, and expert advisory services
                  into a single, easy-to-use interface available in multiple
                  Indian languages.
                </p>
                <div className="flex items-center gap-2 text-green-600 font-medium group">
                  <Link
                    href="#features"
                    className="flex items-center transition-all hover:translate-x-1"
                  >
                    Explore our features{' '}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:ml-3 transition-all" />
                  </Link>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                {/* Replaced placeholder with relevant farmer using mobile tech image */}
                {/* <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                  alt="Farmer using Krishi Sahayak"
                  width={800}
                  height={600}
                  className="w-full h-auto hover:scale-105 transition-transform duration-500"
                /> */}
                <img
                  src="https://media.istockphoto.com/id/1333908015/photo/myanmar-hpa-han-workers-in-the-fields.jpg?s=612x612&w=0&k=20&c=b1E1qrxKsIMK7m1JGSNYTK4Pf8kLYGLH-2WKPWpvtDE="
                  alt="Farmer using Krishi Sahayak"
                  // width={800}
                  // height={600}
                  className="w-full h-auto hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-4 leading-tight text-gray-800">
                Comprehensive Features
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Krishi Sahayak provides a complete suite of tools designed
                specifically for the needs of Indian farmers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Cloud className="h-10 w-10 text-blue-500" />,
                  title: 'Weather Intelligence',
                  description:
                    'Hyperlocal weather forecasts and alerts to help farmers plan their activities and protect their crops from adverse weather conditions.',
                },
                {
                  icon: <Leaf className="h-10 w-10 text-green-500" />,
                  title: 'Crop Doctor',
                  description:
                    'AI-powered disease detection and treatment recommendations to identify and address crop health issues before they cause significant damage.',
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-orange-500" />,
                  title: 'Market Prices',
                  description:
                    'Real-time market prices and trends to help farmers make informed decisions about when and where to sell their produce.',
                },
                {
                  icon: <Shield className="h-10 w-10 text-red-500" />,
                  title: 'Insurance & Loans',
                  description:
                    'Simplified access to agricultural insurance and financing options to protect farmers from risks and enable farm improvements.',
                },
                {
                  icon: <Users className="h-10 w-10 text-purple-500" />,
                  title: 'Farmer Community',
                  description:
                    'Connect with other farmers, share experiences, and learn best practices from successful agricultural practitioners across India.',
                },
                {
                  icon: <Sun className="h-10 w-10 text-yellow-500" />,
                  title: 'Sustainable Farming',
                  description:
                    'Guidance on sustainable farming practices that improve soil health, conserve water, and reduce environmental impact.',
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-xl transition-all hover:-translate-y-2 duration-300"
                >
                  <CardContent className="p-6">
                    <div className="bg-gray-100 p-3 rounded-full w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-4 leading-tight text-gray-800">
                Benefits for Farmers
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Krishi Sahayak is designed to address the key challenges faced
                by Indian farmers
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-green-50 rounded-lg p-8 shadow-lg border border-green-100">
                <h3 className="text-2xl font-bold mb-6 text-green-700">
                  How Krishi Sahayak Helps
                </h3>
                <ul className="space-y-4">
                  {[
                    'Increase crop yields by up to 25% with timely interventions',
                    'Reduce crop losses due to pests, diseases, and weather events',
                    'Get better prices for produce with market intelligence',
                    'Save time and resources with precision farming recommendations',
                    'Access government schemes and subsidies more easily',
                    'Connect with buyers directly, eliminating middlemen',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 rounded-full p-1 mt-1">
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Droplets className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-blue-700">
                      Water Management
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Our irrigation advisories help farmers optimize water usage
                    based on soil moisture, crop type, and weather forecasts,
                    reducing water consumption by up to 30%.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <BarChart3 className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="text-xl font-bold text-orange-700">
                      Income Growth
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Farmers using Krishi Sahayak report an average income
                    increase of 20-35% through better crop management and market
                    access.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-green-700">
                      Sustainable Practices
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Learn eco-friendly farming techniques that improve soil
                    health and biodiversity while reducing dependence on
                    chemical inputs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-16 md:py-24 bg-gray-50 relative overflow-hidden"
        >
          {/* Background pattern for visual interest */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-green-100 opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-blue-100 opacity-50"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-4 leading-tight text-gray-800">
                What Farmers Say
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Hear from farmers who have transformed their agricultural
                practices with Krishi Sahayak
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rajesh Kumar',
                  location: 'Punjab',
                  quote:
                    "Krishi Sahayak's weather alerts saved my wheat crop during an unexpected storm. The timely notification gave me enough time to take preventive measures.",
                  image:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
                },
                {
                  name: 'Anita Patel',
                  location: 'Gujarat',
                  quote:
                    'The market price information helped me negotiate better rates for my cotton crop. I earned 15% more than what local traders initially offered.',
                  image:
                    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
                },
                {
                  name: 'Suresh Reddy',
                  location: 'Telangana',
                  quote:
                    'The Crop Doctor feature identified a pest issue in my rice field before it became visible to the naked eye. Early intervention saved my entire harvest.',
                  image:
                    'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80',
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-none shadow-md hover:shadow-xl transition-all"
                >
                  <CardContent className="p-6">
                    <svg
                      className="h-8 w-8 text-green-500 mb-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-600 mb-6 italic leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3">
                      {/* Use actual farmer images for testimonials */}
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        {/* <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        /> */}
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          // width={40}
                          // height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Farmer, {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="contact"
          className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-700 text-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-sm">
                Ready to Transform Your Farming?
              </h2>
              <p className="text-xl mb-8 font-light">
                Join thousands of farmers across India who are already
                benefiting from Krishi Sahayak
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-gray-100 font-semibold shadow-lg transition-all hover:scale-105"
                >
                  Sign Up Now
                </Button>
                <Button
                  size="lg"
                  className="bg-yellow-600 text-white hover:bg-yellow-500 font-semibold shadow-lg transition-all hover:scale-105"
                >
                  Request Demo
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <p className="text-4xl font-bold mb-2">10,000+</p>
                  <p className="text-lg">Registered Farmers</p>
                </div>
                <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <p className="text-4xl font-bold mb-2">500+</p>
                  <p className="text-lg">Villages Covered</p>
                </div>
                <div className="flex flex-col items-center bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <p className="text-4xl font-bold mb-2">15+</p>
                  <p className="text-lg">States Across India</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 text-white p-2 rounded-md">
                  <span className="font-bold">KS</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">
                    Krishi Sahayak
                  </h3>
                  <p className="text-xs text-gray-400">
                    Empowering Indian Farmers
                  </p>
                </div>
              </div>
              <p className="text-sm mb-4">
                A comprehensive digital platform for Indian farmers providing
                weather forecasts, crop health monitoring, market intelligence,
                and expert advisory services.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Features</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Weather Intelligence
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Crop Doctor
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Market Prices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Insurance & Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Farmer Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Knowledge Base
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <svg
                    className="h-5 w-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    123 Agricultural Tech Park, Bangalore, Karnataka, India
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>contact@krishisahayak.com</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+91 1800-KRISHI (574744)</span>
                </li>
              </ul>
              <div className="mt-6">
                <h5 className="text-white font-medium mb-2">
                  Subscribe to our newsletter
                </h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 text-white px-3 py-2 rounded text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Krishi Sahayak. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
