import React, {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Translation from './pages/Translation'

export default function App(){
  const [loadingDone, setLoadingDone] = useState(false)

  return (
    <div className="app-wrapper bg-slate-50 min-h-screen flex flex-col">
      {!loadingDone && <LoadingScreen onFinish={()=>setLoadingDone(true)} />}

      <Nav />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Translation/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  )
}
