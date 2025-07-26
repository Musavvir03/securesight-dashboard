'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Shield, User, Eye, CheckCircle } from 'lucide-react'

interface Camera {
  id: string
  name: string
  location: string
}

interface Incident {
  id: string
  cameraId: string
  camera: Camera
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
}

const getIncidentIcon = (type: string) => {
  switch (type) {
    case 'Gun Threat':
      return <AlertTriangle className="w-5 h-5 text-red-500" />
    case 'Unauthorised Access':
      return <Shield className="w-5 h-5 text-orange-500" />
    case 'Face Recognised':
      return <User className="w-5 h-5 text-blue-500" />
    case 'Suspicious Activity':
      return <Eye className="w-5 h-5 text-yellow-500" />
    default:
      return <AlertTriangle className="w-5 h-5 text-gray-500" />
  }
}

const getIncidentColor = (type: string) => {
  switch (type) {
    case 'Gun Threat':
      return 'bg-red-50 border-red-200'
    case 'Unauthorised Access':
      return 'bg-orange-50 border-orange-200'
    case 'Face Recognised':
      return 'bg-blue-50 border-blue-200'
    case 'Suspicious Activity':
      return 'bg-yellow-50 border-yellow-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents?resolved=false')
      const data = await response.json()
      setIncidents(data)
    } catch (error) {
      console.error('Error fetching incidents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResolve = async (incidentId: string) => {
    // Optimistic UI update
    setResolvingIds(prev => new Set(prev).add(incidentId))
    
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        // Remove from list after successful resolution
        setIncidents(prev => prev.filter(incident => incident.id !== incidentId))
      }
    } catch (error) {
      console.error('Error resolving incident:', error)
    } finally {
      setResolvingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(incidentId)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Active Incidents</h2>
        <p className="text-sm text-gray-500 mt-1">
          {incidents.length} unresolved incidents
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`p-4 transition-all duration-300 ${
              resolvingIds.has(incident.id) ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-xs">IMG</div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getIncidentIcon(incident.type)}
                  <span className="text-sm font-medium text-gray-900">
                    {incident.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-1">
                  {incident.camera.location}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Start: {formatTime(incident.tsStart)}</span>
                  <span>End: {formatTime(incident.tsEnd)}</span>
                  <span>{formatDate(incident.tsStart)}</span>
                </div>
              </div>

              {/* Resolve Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => handleResolve(incident.id)}
                  disabled={resolvingIds.has(incident.id)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    resolvingIds.has(incident.id)
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Resolve</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {incidents.length === 0 && (
        <div className="p-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            No active incidents
          </h3>
          <p className="text-sm text-gray-500">
            All incidents have been resolved
          </p>
        </div>
      )}
    </div>
  )
} 