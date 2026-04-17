import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
