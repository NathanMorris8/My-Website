'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Menu, X, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Image from 'next/image'

// Hero carousel data - Nathan's actual projects
const heroProjects = [
  {
    id: 1,
    title: "AUTOCARE",
    description: "Fullstack website for finding local autocare services with car registration and parts lookup",
    image: "https://picsum.photos/1200/800?random=1",
    tech: ["Python", "TypeScript", "Fullstack", "Web Development"],
    link: "https://github.com/NathanMorris8/Autocare-Mechanic-Finder"
  },
  {
    id: 2,
    title: "Network Packet Sniffer",
    description: "Monitor mode wifi adapter packet collection and network analysis tool",
    image: "https://picsum.photos/1200/800?random=2",
    tech: ["Python", "Networking", "Linux", "Security"],
    link: "https://github.com/NathanMorris8/cs587_project"
  },
  {
    id: 3,
    title: "TRIVIA Game",
    description: "Python trivia game with scoring system and random question generation",
    image: "https://picsum.photos/1200/800?random=3",
    tech: ["Python", "Game Development", "Input/Output", "Scoring System"],
    link: "https://github.com/NathanMorris8/Trivia-Game"
  }
]

// Portfolio projects data - Nathan's actual projects
const portfolioProjects = [
  {
    id: 1,
    title: "AUTOCARE",
    description: "Fullstack website for finding local autocare services with car registration and parts lookup",
    image: "https://picsum.photos/600/400?random=4",
    category: "Fullstack Web Development",
    link: "https://github.com/NathanMorris8/Autocare-Mechanic-Finder"
  },
  {
    id: 2,
    title: "Network Packet Sniffer",
    description: "Monitor mode wifi adapter packet collection and network analysis tool",
    image: "https://picsum.photos/600/400?random=5",
    category: "Network Security",
    link: "https://github.com/NathanMorris8/cs587_project"
  },
  {
    id: 3,
    title: "TRIVIA Game",
    description: "Python trivia game with scoring system and random question generation",
    image: "https://picsum.photos/600/400?random=6",
    category: "Python Development",
    link: "https://github.com/NathanMorris8/Trivia-Game"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProjects.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProjects.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProjects.length) % heroProjects.length)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white">Nathan Morris</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'portfolio', 'skills', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item
                        ? 'text-red-500'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-t border-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'portfolio', 'skills', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={heroProjects[currentSlide].image}
              alt={heroProjects[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {heroProjects[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {heroProjects[currentSlide].description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {heroProjects[currentSlide].tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={heroProjects[currentSlide].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                View on GitHub
              </a>
            </motion.div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-red-500' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                I'm Nathan Morris, a passionate developer and designer with a love for creating beautiful, 
                functional digital experiences. My work combines technical expertise with 
                creative vision to deliver solutions that make a difference.
              </p>
              <p className="text-lg text-gray-600">
                With experience in modern web technologies and a keen eye for design, 
                I specialize in building applications that are both powerful and elegant.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
            <p className="text-xl text-gray-400">A selection of my recent work</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <ExternalLink size={32} className="text-white mb-2" />
                      <p className="text-white text-sm">View on GitHub</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-2">{project.description}</p>
                  <span className="text-sm text-red-500">{project.category}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills</h2>
            <p className="text-xl text-gray-600">Technologies and tools I work with</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js',
              'Python', 'MongoDB', 'PostgreSQL', 'AWS',
              'Docker', 'Git', 'Figma', 'Tailwind CSS'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-lg">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Get In Touch</h2>
            <p className="text-xl text-gray-400 mb-12">
              Ready to work together? Let's create something amazing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:nathan.morris@example.com"
                className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                <Mail size={20} />
                Send Email
              </a>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/NathanMorris8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/nathanmorris8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Nathan Morris. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}