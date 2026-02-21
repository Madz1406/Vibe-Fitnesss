# 🚀 Full-Stack Setup Guide - Vibe Fitness

This guide covers setting up and running **both** the React frontend and Python backend for the complete Vibe Fitness application.

## Project Architecture

```
Vibe Fitness (Full-Stack)
├── Frontend (React + TypeScript)
│   ├── Components: Onboarding, Dashboard, DietPlan
│   ├── Services: API client (dietApi.ts)
│   └── Port: http://localhost:5173
│
└── Backend (Python + Flask)
    ├── API Server: REST endpoints for meal planning
    ├── AI Engine: Rule-based meal database & recommendations
    └── Port: http://localhost:5000
```

## Quick Start (Complete Setup)

### Terminal 1: Start Frontend

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Expected output:
```
VITE v4.4.5  ready in 502 ms

➜  Local:   http://localhost:5173/
```

### Terminal 2: Start Backend

```bash
# Navigate to backend folder
cd backend

# Install Python dependencies (first time only)
pip install -r requirements.txt

# Run the Flask server
python app.py
```

Expected output:
```
Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### Terminal 3: Verify Both are Running

Check that both servers are accessible:

```bash
# Frontend health check (in any terminal)
curl http://localhost:5173

# Backend health check
curl http://localhost:5000/api/health
```

---

## Frontend Setup Details

### 1. Prerequisites

- **Node.js 16+**: Download from [nodejs.org](https://nodejs.org/)
- **npm 7+**: Comes with Node.js

### 2. Install & Run Frontend

```bash
# Navigate to project root
cd "d:\vibe fitness"

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Frontend Technologies

- **React 18.2.0**: UI framework
- **TypeScript 5.0.2**: Type safety
- **Vite 4.4.5**: Build tool & dev server
- **Tailwind CSS 3.3.0**: Styling
- **Lucide React**: Icons

### 4. Frontend Structure

```
src/
├── components/
│   ├── OnboardingForm.tsx       # 4-step user registration
│   ├── Dashboard.tsx            # Main dashboard with gamification
│   ├── DietPlan.tsx             # NEW: AI diet planning section
│   ├── onboarding/
│   │   ├── StepPhysicalMetrics.tsx
│   │   ├── StepHealthConstraints.tsx
│   │   ├── StepPreferences.tsx
│   │   └── StepGoal.tsx
│   └── dashboard/
│       ├── DailyTaskList.tsx
│       ├── ProgressBar.tsx
│       └── MacroBreakdown.tsx
├── services/
│   └── dietApi.ts               # NEW: Backend API client
├── types/
│   └── index.ts                 # TypeScript interfaces
├── utils/
│   └── calculations.ts          # TDEE & macro calculations
├── App.tsx                      # Main app component
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

---

## Backend Setup Details

### 1. Prerequisites

- **Python 3.8+**: Download from [python.org](https://www.python.org/)
- **pip**: Comes with Python

### 2. Install & Run Backend

```bash
# Navigate to backend folder
cd backend

# Install Python packages
pip install -r requirements.txt

# Run Flask server
python app.py
```

### 3. Backend Technologies

- **Flask 3.0.0**: Web framework
- **Flask-CORS 4.0.0**: Cross-Origin Resource Sharing
- **Python 3.8+**: Programming language

### 4. Backend Structure

```
backend/
├── app.py              # Flask REST API server (6 endpoints)
├── diet_ai.py          # AI meal planning engine
└── requirements.txt    # Python dependencies
```

### 5. Backend Architecture

**diet_ai.py** (DietAIGenerator class):
- 23 meal database with nutrition facts
- Medical condition awareness (Diabetes, Hypertension, etc.)
- Dietary restriction support (Vegan, Keto, Gluten-Free, etc.)
- 7-day meal plan generation
- AI-powered recommendations
- Shopping list generator
- Hydration planning
- Supplement recommendations

**app.py** (6 REST API endpoints):
- `POST /api/diet-plan` - Generate personalized 7-day meal plans
- `POST /api/recommendations` - AI recommendations (tips, hydration, supplements)
- `GET /api/meal-search` - Search meals by type and restrictions
- `POST /api/calculate-nutrition` - Bulk nutrition calculation
- `POST /api/shopping-list` - Generate shopping lists
- `GET /api/health` - Health check endpoint

---

## Frontend-Backend Integration

### How They Connect

1. **Frontend (React)** runs on `http://localhost:5173`
2. **Backend (Flask)** runs on `http://localhost:5000`
3. **Service Layer** (`dietApi.ts`) makes HTTP requests to backend
4. **DietPlan Component** displays backend responses

### API Flow Example

```
User clicks "Generate Plan"
    ↓
DietPlan.tsx calls generate() function
    ↓
dietApi.ts makes POST request to localhost:5000/api/diet-plan
    ↓
Flask backend receives request
    ↓
DietAIGenerator creates personalized meal plan
    ↓
Flask returns JSON response
    ↓
React DietPlan component displays meals, macros, recommendations
```

### Testing the Integration

1. **Ensure both servers are running**:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

2. **Open the frontend in browser**

3. **Navigate to Dashboard** (after onboarding)

4. **Scroll to "AI Diet Planner" section**

5. **Click "Generate Plan" button**

6. Shows loading state while fetching from backend

7. Displays personalized meal plan with:
   - 7-day meal schedule
   - Daily nutrition totals
   - Shopping list
   - Personalized tips
   - Hydration plan
   - Training food pairing

### Backend API Testing

Use **curl** to test endpoints directly:

```bash
# Test health check
curl http://localhost:5000/api/health

# Generate meal plan
curl -X POST http://localhost:5000/api/diet-plan \
  -H "Content-Type: application/json" \
  -d '{
    "height": 180,
    "weight": 75,
    "age": 25,
    "gender": "male",
    "bodyFatPercentage": 20,
    "activityLevel": "moderate",
    "goal": "cutting",
    "medicalConditions": [],
    "dietaryRestrictions": ["vegan"],
    "targetCalories": 2000
  }'

# Get recommendations
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "height": 180,
    "weight": 75,
    "age": 25,
    "gender": "male",
    "activityLevel": "moderate",
    "goal": "cutting",
    "medicalConditions": [],
    "dietaryRestrictions": ["vegan"]
  }'
```

---

## Troubleshooting

### Frontend Issues

| Error | Solution |
|-------|----------|
| `npm install` fails | Ensure Node.js 16+ is installed: `node --version` |
| Port 5173 in use | Change port in `vite.config.ts` or kill the process using port 5173 |
| CORS error | Ensure backend is running on port 5000 with CORS enabled |
| Blank page | Check browser console (F12 → Console tab) for errors |

### Backend Issues

| Error | Solution |
|-------|----------|
| `ModuleNotFoundError: No module named 'flask'` | Run `pip install -r requirements.txt` |
| Port 5000 in use | Change port in `app.py` or kill the process using port 5000 |
| Connection refused | Ensure Flask server is running: `python app.py` |
| CORS blocked | Already handled in app.py, hard refresh browser (Ctrl+Shift+R) |

### Common Issues

**Frontend can't reach backend:**
```bash
# Check if backend is running
curl http://localhost:5000/api/health

# If fails, start backend:
cd backend
python app.py
```

**React shows "Backend connection note":**
- This is normal if backend isn't running
- Start backend in separate terminal
- The message will disappear once backend is reachable

**Data not persisting:**
- Check browser localStorage (F12 → Application → Local Storage)
- Ensure you're saving a user profile before generating plans
- Clear cache if needed (Ctrl+Shift+Delete)

---

## Development Workflow

### Normal Development

1. **Terminal 1**: Start frontend
   ```bash
   npm run dev
   ```

2. **Terminal 2**: Start backend
   ```bash
   cd backend
   python app.py
   ```

3. **Browser**: Open http://localhost:5173

4. **Edit files**: Both frontend and backend auto-reload on save

### Testing New Features

Example: Adding a new meal type to backend

1. Edit `backend/diet_ai.py`
2. Add meal to database
3. Backend auto-reloads (if debug=True)
4. Frontend automatically uses new meals on next request

### Building for Production

**Frontend:**
```bash
npm run build
```
Creates optimized build in `dist/` folder

**Backend:**
Use production WSGI server (e.g., Gunicorn):
```bash
pip install gunicorn
gunicorn app:app
```

---

## Environment Variables (Optional)

Create `.env` file in root directory:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Then in frontend code:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## Database / Data Persist

Currently uses rule-based system:
- **Frontend**: localStorage (browser storage)
- **Backend**: In-memory meal database (resets on restart)

### Future: Add Real Database

For production, add a database:
1. Install SQLAlchemy: `pip install flask-sqlalchemy`
2. Add database models in backend
3. SQL Alchemy automatically creates tables
4. Meals persist across server restarts

---

## Performance Tips

### Frontend Optimization
- Use React DevTools Profiler to find slow components
- Check network tab (F12 → Network) for slow API calls
- Enable compression in production

### Backend Optimization
- Flask already has caching headers set
- Add database queries for faster meal lookups
- Enable gzip compression: `pip install flask-compress`

---

## Next Steps

1. ✅ **Setup complete** - Both frontend and backend running
2. 📱 **Test the app** - Go through onboarding, generate meal plans
3. 🔧 **Customize meals** - Edit `backend/diet_ai.py` to add new meals
4. 📊 **Add features** - Extend both frontend and backend
5. 🚀 **Deploy** - See DEPLOYMENT.md for deployment instructions

---

## Support & Documentation

- **Frontend Setup**: See GETTING_STARTED.md
- **Backend Details**: See BACKEND_SETUP.md
- **Full Features**: See FEATURES.md
- **Architecture**: See ARCHITECTURE.md
- **Deployment**: See DEPLOYMENT.md

---

## Quick Reference

### Start Both Servers

```bash
# Terminal 1
npm run dev

# Terminal 2 (in new terminal)
cd backend && python app.py
```

### Stop Servers

```bash
# To stop: Ctrl+C in each terminal
```

### Check Status

```bash
# Frontend
curl http://localhost:5173

# Backend
curl http://localhost:5000/api/health
```

### Clear Data

```bash
# Browser localStorage: Press Ctrl+Shift+Delete or click Logout button
# Backend: Just restart (uses in-memory database)
```

---

**You're all set! 🎉 Enjoy building with Vibe Fitness!**
