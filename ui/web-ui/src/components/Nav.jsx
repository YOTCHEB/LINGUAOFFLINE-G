import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Logo from '../assets/logo.png'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Translate' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-all duration-200 group">
            <div className="p-1 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg group-hover:shadow-lg transition-shadow">
              <img src={Logo} alt="LinguaOffline" className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl gradient-text">LinguaOffline</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive(link.to)
                    ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 shadow-md'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-200 group-hover:w-full ${
                  isActive(link.to) ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-teal-600 p-2 rounded-lg hover:bg-slate-50 transition-all duration-200"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-md animate-fade-in-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 animate-fade-in-up ${
                    isActive(link.to)
                      ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 shadow-md'
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
