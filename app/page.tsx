import Navbar from '@/components/Navbar'
import IncidentPlayer from '@/components/IncidentPlayer'
import IncidentList from '@/components/IncidentList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Incident Player */}
          <div className="lg:col-span-2">
            <IncidentPlayer />
          </div>
          
          {/* Right Column - Incident List */}
          <div className="lg:col-span-1">
            <IncidentList />
          </div>
        </div>
      </main>
    </div>
  )
} 