# SecureSight Dashboard

A comprehensive CCTV monitoring software dashboard for incident management, built with Next.js 15, TypeScript, and Prisma.

## 🚀 Live Demo

[Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/securesight-dashboard)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for consistent iconography

## 📋 Features

### Mandatory Features ✅
- **Navbar**: SecureSight branding with navigation controls
- **Incident Player**: Large video frame with mini camera thumbnails
- **Incident List**: Real-time incident display with resolve functionality
- **Database**: SQLite with Prisma schema (Camera & Incident models)
- **API Routes**: 
  - `GET /api/incidents?resolved=false` - Fetch unresolved incidents
  - `PATCH /api/incidents/:id/resolve` - Resolve incidents with optimistic UI
- **Seed Data**: 4 cameras and 12+ incidents across multiple threat types

### Optional Features 🎯
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Optimistic UI**: Smooth resolve animations and real-time updates
- **Loading States**: Skeleton loaders for better UX
- **Type Safety**: Full TypeScript implementation

## 🚀 Deployment Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/securesight-dashboard.git
   cd securesight-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - No environment variables needed for SQLite

3. **Database Setup on Vercel**
   - The SQLite database will be created automatically
   - Run the seed script after deployment:
   ```bash
   npm run db:seed
   ```

## 🏗️ Project Structure

```
securesight-dashboard/
├── app/
│   ├── api/
│   │   └── incidents/
│   │       ├── route.ts
│   │       └── [id]/resolve/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── IncidentPlayer.tsx
│   └── IncidentList.tsx
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Design Decisions

### Tech Choices
- **Next.js 15**: Latest features with App Router for better performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Rapid UI development with utility classes
- **SQLite**: Lightweight database perfect for demo and small deployments
- **Prisma**: Type-safe database access with excellent DX

### Architecture
- **API Routes**: Serverless functions for database operations
- **Client Components**: Interactive UI with optimistic updates
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Component Structure**: Modular, reusable components

## 🔮 Future Improvements

If I had more time, I would implement:

### High Priority
- **Real-time Updates**: WebSocket integration for live incident updates
- **Video Streaming**: Actual video feed integration with WebRTC
- **Authentication**: User login and role-based access control
- **Incident Timeline**: Interactive 24-hour timeline with draggable scrubber
- **Search & Filter**: Advanced filtering by camera, type, date range

### Medium Priority
- **3D Dashboard**: React Three Fiber implementation for immersive view
- **Analytics**: Incident statistics and trend analysis
- **Export Features**: PDF reports and data export
- **Mobile App**: React Native companion app
- **Push Notifications**: Real-time alerts for new incidents

### Low Priority
- **Multi-language**: Internationalization support
- **Dark Mode**: Theme switching capability
- **Advanced AI**: Computer vision integration for automatic threat detection
- **Cloud Storage**: Video footage storage and retrieval
- **API Documentation**: OpenAPI/Swagger documentation

## 📊 Database Schema

### Camera Model
```prisma
model Camera {
  id       String    @id @default(cuid())
  name     String
  location String
  incidents Incident[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Incident Model
```prisma
model Incident {
  id           String   @id @default(cuid())
  cameraId     String
  camera       Camera   @relation(fields: [cameraId], references: [id])
  type         String
  tsStart      DateTime
  tsEnd        DateTime
  thumbnailUrl String
  resolved     Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Database not found**
   ```bash
   npx prisma db push
   npm run db:seed
   ```

2. **TypeScript errors**
   ```bash
   npm install
   npx tsc --noEmit
   ```

3. **Build errors on Vercel**
   - Ensure all dependencies are in `package.json`
   - Check that `next.config.js` is properly configured

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ for the SecureSight technical assessment 