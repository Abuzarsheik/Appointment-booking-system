# 🚀 Deployment Guide - MedBook Appointment System

This guide will help you deploy your MERN stack appointment booking system using **Vercel** (frontend) and **Railway** (backend + database).

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway account (free)
- MongoDB Atlas account (free)

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create a Cluster**
   - Choose "Build a Database" → "M0 Sandbox" (Free)
   - Select your preferred region
   - Name your cluster (e.g., "medbook-cluster")

3. **Create Database User**
   - Go to "Database Access"
   - Add new user with username/password
   - Give "Read and write to any database" permissions

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (Allow access from anywhere)

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🖥️ Backend Deployment (Railway)

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Railway**
   - Go to [Railway](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Choose the `server` folder as root directory

3. **Configure Environment Variables**
   In Railway dashboard, go to your project → Variables tab:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-make-it-long-and-random
   JWT_EXPIRE=7d
   CLIENT_URL_PROD=https://your-app-name.vercel.app
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Deploy**
   - Railway will automatically deploy your backend
   - Note the generated URL (e.g., `https://your-app.railway.app`)

5. **Seed Database** (Optional)
   - In Railway dashboard, go to your project
   - Open the "Deploy" tab
   - Run: `npm run seed` to populate with dummy data

## 🌐 Frontend Deployment (Vercel)

1. **Configure Environment Variables**
   Create `client/.env.production`:
   ```
   REACT_APP_API_URL=https://your-railway-backend-url.railway.app
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Set Root Directory to `client`
   - Add Environment Variable:
     - `REACT_APP_API_URL`: Your Railway backend URL

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your React app
   - Note the generated URL (e.g., `https://your-app.vercel.app`)

4. **Update Backend CORS**
   - Go back to Railway
   - Update `CLIENT_URL_PROD` environment variable with your Vercel URL
   - Redeploy the backend

## ✅ Verification

1. **Test Backend**
   - Visit: `https://your-railway-url.railway.app/api/health`
   - Should return: `{"status":"OK",...}`

2. **Test Frontend**
   - Visit your Vercel URL
   - Try logging in with demo credentials:
     - Email: `demo@medbook.com`
     - Password: `demo123`

3. **Test Full Integration**
   - Create a new appointment
   - Check if data persists
   - Verify real-time updates work

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure `CLIENT_URL_PROD` in Railway matches your Vercel URL exactly
   - Check that both URLs use HTTPS

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string is correct
   - Ensure database user has proper permissions
   - Check network access allows all IPs (0.0.0.0/0)

3. **Build Failures**
   - Check Railway logs for specific error messages
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

4. **Environment Variables**
   - Double-check all required environment variables are set
   - Ensure no typos in variable names
   - Restart services after changing environment variables

## 📊 Monitoring

### Railway Monitoring:
- Check logs in Railway dashboard
- Monitor resource usage
- Set up alerts for downtime

### Vercel Monitoring:
- Check function logs
- Monitor build times
- Review analytics

## 💰 Cost Estimation

### Free Tier Limits:
- **Railway**: $5 credit monthly (usually sufficient for small apps)
- **Vercel**: 100GB bandwidth, 6000 build minutes
- **MongoDB Atlas**: 512MB storage, shared cluster

### Scaling:
- Railway: $0.000463 per GB-hour, $0.000231 per vCPU-hour
- Vercel: $20/month for Pro plan
- MongoDB Atlas: $9/month for dedicated cluster

## 🔄 Continuous Deployment

Both platforms support automatic deployments:
- **Railway**: Automatically deploys on git push to main branch
- **Vercel**: Automatically deploys on git push to main branch

## 🔐 Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Database user has minimal required permissions
- [ ] CORS configured for production domains only
- [ ] Rate limiting enabled
- [ ] HTTPS enforced on both frontend and backend
- [ ] Environment variables properly secured

## 📞 Support

If you encounter issues:
1. Check the platform-specific documentation
2. Review application logs
3. Verify environment variables
4. Test locally first
5. Contact platform support if needed

---

## 🎉 Success!

Your MedBook appointment system should now be live and accessible worldwide!

**Frontend**: https://your-app.vercel.app
**Backend**: https://your-app.railway.app
**Admin Panel**: Login with `admin@medbook.com` / `admin123` 