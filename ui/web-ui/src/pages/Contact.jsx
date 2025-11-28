import React, { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="relative bg-gradient-to-r from-teal-50 via-white to-cyan-50 py-20 overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 gradient-text">
            Contact Our Team
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">
            Have a question or want to collaborate? Send us a message, and we will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <div className="glass p-10 rounded-3xl shadow-2xl space-y-8 animate-slide-in-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
            
            <ContactInfo icon={<FiMail />} title="Email" lines={["yotlab.team@gmail.com","yotlab.team@gmail.com"]} />
            <ContactInfo icon={<FiPhone />} title="Phone" lines={["+265 99 65 41 336"]} />
            <ContactInfo icon={<FiMapPin />} title="Address" lines={[
              "LinguaOffline Project",
              "Department of Computer Science",
              "Center Name: TakenoLAB",
              "City : Lilogwe, Country : Malawi",
              "P.O. Box : 123",
              "Building Name: TakenoLAB",
              "Students at  TakenoLAB are responsible for developing and maintaining the LinguaOffline AI project."
            ]} />

            <div className="mt-8 p-6 bg-white/30 backdrop-blur-md rounded-xl border-l-4 border-teal-500 animate-fade-in-up">
              <h3 className="font-semibold text-slate-900 mb-1">Project Coordinator</h3>
              <p className="text-slate-700 mb-1">Yotcheb Kandolo Jean</p>
              <p className="text-slate-700 text-sm">Project Lead & Developer</p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 animate-slide-in-right">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
                <InputField label="Email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" type="email" />
              </div>
              <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
              <TextareaField label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..." />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
              >
                <FiSend className="h-5 w-5" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------
   Contact Info Component
-------------------------- */
function ContactInfo({ icon, title, lines }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-teal-100 rounded-lg text-teal-600 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {lines.map((line, i) => <p key={i} className="text-slate-700">{line}</p>)}
      </div>
    </div>
  )
}

/* -------------------------
   Input Field Component
-------------------------- */
function InputField({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  )
}

/* -------------------------
   Textarea Field Component
-------------------------- */
function TextareaField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={6}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical transition-all duration-200"
      />
    </div>
  )
}
