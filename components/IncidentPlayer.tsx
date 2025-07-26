'use client'

import { Play, Pause, Volume2, Maximize } from 'lucide-react'

export default function IncidentPlayer() {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Main Video Frame */}
      <div className="relative aspect-video bg-gray-800">
        {/* Placeholder for video content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm">Live Feed</p>
            <p className="text-xs text-gray-500 mt-1">Camera 1 - Main View</p>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Play className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-gray-300 transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <button className="text-white hover:text-gray-300 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mini Camera Thumbnails */}
      <div className="p-4">
        <h3 className="text-white text-sm font-medium mb-3">Camera Feeds</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Camera 1 */}
          <div className="relative aspect-video bg-gray-800 rounded overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs">Camera 1</p>
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Camera 2 */}
          <div className="relative aspect-video bg-gray-800 rounded overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Play className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs">Camera 2</p>
              </div>
            </div>
            <div className="absolute top-2 left-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 