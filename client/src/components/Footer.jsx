import { motion } from 'framer-motion'
import { Heart, ArrowUp, Mail, MapPin, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Tech Stack', href: '#techstack' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/YOUR_USERNAME' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/YOUR_USERNAME' },
  { name: 'Twitter', href: 'https://twitter.com/YOUR_USERNAME' },
]

const Footer = () => {
  const { admin } = useAuth()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="inline-block text-xl font-mono font-bold text-cyan-500 cursor-pointer"
            >
              {'<JuniorTech />'}
            </motion.span>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Fullstack developer based in Cameroon. Building fast, scalable and
              beautiful web applications from front to back.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} className="text-cyan-500 shrink-0" />
              <span>Bamenda, Cameroon 🇨🇲</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={14} className="text-cyan-500 shrink-0" />
              
                <a href="mailto:juniortech775@gmail.com"
                  className="hover:text-cyan-500 transition-colors duration-200">
                
                </a>
              <a>
                juniortech775@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-cyan-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-500 transition-all duration-200" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & CTA */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">
              Let's Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="text-sm text-gray-400 hover:text-cyan-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-cyan-500 transition-all duration-200" />
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Availability Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-500">
                  Available for work
                </span>
              </div>
            </div>

            {/* Hire Me CTA */}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-cyan-500/25"
            >
              Hire Me 🚀
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={14} className="text-red-500 fill-red-500" />
            </motion.span>
            by{' '}
            <span className="text-cyan-500 font-medium">Junior Noel</span>
            {' '}— {new Date().getFullYear()}
          </p>

          <p className="text-xs text-gray-600 font-mono">
            React.js + Node.js + MongoDB
          </p>

          <div className="flex items-center gap-3">

            {/* Admin Dashboard Link — only visible when logged in */}
            {admin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 text-xs font-medium hover:bg-cyan-500 hover:text-white transition-all duration-200"
                >
                  <LayoutDashboard size={12} />
                  Dashboard
                </Link>
              </motion.div>
            )}

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-800 hover:bg-cyan-500 text-gray-400 hover:text-white transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  )
};

export default Footer