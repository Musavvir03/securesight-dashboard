# Deployment Guide

## Size Optimization for GitHub (100MB Limit)

The project is designed to be under 100MB when deployed. Here's how to optimize:

### Before Pushing to GitHub

1. **Remove node_modules** (not needed in repo)
   ```bash
   # Already done - node_modules is in .gitignore
   ```

2. **Remove package-lock.json** (will be regenerated)
   ```bash
   # Already done - package-lock.json is in .gitignore
   ```

3. **Check project size**
   ```bash
   # Exclude node_modules from size calculation
   Get-ChildItem -Recurse -Exclude node_modules | Measure-Object -Property Length -Sum
   ```

### Deployment Steps

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SecureSight Dashboard"
   ```

2. **Create GitHub Repository**
   - Go to GitHub and create a new repository
   - Don't initialize with README (we already have one)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/securesight-dashboard.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically install dependencies and build
   - No environment variables needed

### Post-Deployment Setup

After deployment, run the database setup:

```bash
# In Vercel dashboard or via CLI
npx prisma db push
npm run db:seed
```

## Project Structure (Optimized)

```
securesight-dashboard/
├── app/                    # Next.js App Router
├── components/             # React components
├── prisma/                # Database schema and seed
├── public/                # Static assets
├── package.json           # Dependencies
├── README.md              # Documentation
└── .gitignore            # Git exclusions
```

## Size Breakdown

- **Source Code**: ~50KB
- **Configuration**: ~10KB
- **Documentation**: ~15KB
- **Total**: ~75KB (well under 100MB limit)

The `node_modules` directory (~600MB) is excluded from the repository and will be installed automatically by Vercel during deployment.

## Troubleshooting

### If GitHub rejects the push due to size:
1. Check that `node_modules` is in `.gitignore`
2. Remove any large files manually
3. Use `git status` to see what's being tracked

### If Vercel build fails:
1. Check that all dependencies are in `package.json`
2. Ensure `next.config.js` is properly configured
3. Verify TypeScript configuration in `tsconfig.json` 