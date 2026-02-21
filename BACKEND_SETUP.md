# Backend Setup & Running Guide

## Prerequisites

- **Python 3.8+** installed on your system
- **pip** (Python package manager)

## Installation

### 1. Install Python Dependencies

Navigate to the backend directory and install required packages:

```bash
cd backend
pip install -r requirements.txt
```

### 2. Verify Installation

Check that all packages are installed correctly:

```bash
pip list
```

You should see:
- Flask 3.0.0+
- Flask-CORS 4.0.0+
- python-dotenv (optional, for environment variables)

## Running the Backend

### Start the Flask Server

```bash
python app.py
```

You should see output like:
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### Verify Server is Running

The server runs on `http://localhost:5000` by default.

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "data": {
    "status": "Backend is running",
    "timestamp": "2024-01-XX HH:MM:SS"
  }
}
```

## API Endpoints

The backend provides 6 REST API endpoints for the React frontend:

### 1. Generate Diet Plan
**POST** `/api/diet-plan`

Request body:
```json
{
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
}
```

Response:
```json
{
  "success": true,
  "data": {
    "duration": "7 days",
    "targetCalories": 2000,
    "goal": "cutting",
    "days": { ... },
    "shoppingList": [ ... ],
    "medicalConsiderations": [ ... ],
    "mealPrepTips": [ ... ]
  }
}
```

### 2. Get Recommendations
**POST** `/api/recommendations`

Request body:
```json
{
  "height": 180,
  "weight": 75,
  "age": 25,
  "gender": "male",
  "activityLevel": "moderate",
  "goal": "cutting",
  "medicalConditions": [],
  "dietaryRestrictions": ["vegan"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "personalizedTips": [ ... ],
    "hydrationPlan": { ... },
    "trainingFoodPairing": { ... },
    "supplementRecommendations": { ... }
  }
}
```

### 3. Search Meals
**GET** `/api/meal-search?type=breakfast&restrictions=vegan,gluten-free`

Response:
```json
{
  "success": true,
  "data": {
    "meals": [ ... ]
  }
}
```

### 4. Calculate Nutrition
**POST** `/api/calculate-nutrition`

Request body:
```json
{
  "meals": [
    {
      "name": "Chicken Breast",
      "calories": 165,
      "protein": 31,
      "carbs": 0,
      "fats": 3.6
    }
  ]
}
```

### 5. Generate Shopping List
**POST** `/api/shopping-list`

Request body:
```json
{
  "mealPlan": { ... }
}
```

### 6. Health Check
**GET** `/api/health`

Response:
```json
{
  "success": true,
  "data": {
    "status": "Backend is running",
    "timestamp": "2024-01-XX HH:MM:SS"
  }
}
```

## Frontend Integration

The React frontend automatically connects to the backend when:

1. **Backend is running** on `http://localhost:5000`
2. **CORS is enabled** (already configured in Flask app)
3. **User clicks "Generate Plan"** in the Diet Planner section

## Troubleshooting

### Issue: "Connection refused"
**Solution**: Ensure the Flask server is running on localhost:5000

```bash
python app.py
```

### Issue: "CORS error"
**Solution**: CORS is already enabled in `app.py`. If you still see errors:
- Verify the frontend is running on `http://localhost:5173`
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: "No module named 'flask'"
**Solution**: Install dependencies again:

```bash
pip install -r requirements.txt
```

### Issue: Python not found
**Solution**: Ensure Python 3.8+ is installed:

```bash
python --version
```

If not installed, download from https://www.python.org/

### Issue: Port 5000 already in use
**Solution**: Change the port in `app.py`:

```python
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5001)  # Change 5000 to 5001
```

And update the frontend API URL in `src/services/dietApi.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5001/api';
```

## Development Tips

### Enable Debug Mode
Debug mode is already enabled in `app.py` for development. This provides:
- Automatic server reload on file changes
- Detailed error messages
- Interactive debugger

### Disable Debug Mode (for production)
Edit `app.py`:

```python
if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1', port=5000)
```

### View API Logs
Flask logs all requests in the console:

```
127.0.0.1 - - [24/Jan/2024 10:30:45] "POST /api/diet-plan HTTP/1.1" 200 -
```

## Next Steps

1. ✅ **Start backend**: `python backend/app.py`
2. ✅ **Start frontend**: `npm run dev` (in different terminal)
3. ✅ **Test integration**: Click "Generate Plan" in the Diet Planner section
4. ✅ **Monitor console**: Check both React and Flask console for errors

## Testing Endpoints with curl

### Generate a meal plan:
```bash
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
    "dietaryRestrictions": [],
    "targetCalories": 2000
  }'
```

### Get recommendations:
```bash
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
    "dietaryRestrictions": []
  }'
```

## Production Deployment

For deploying to production:

1. Set `debug=False` in `app.py`
2. Use a production server like **Gunicorn**:

```bash
pip install gunicorn
gunicorn app:app
```

3. Set environment variables for security
4. Use a reverse proxy (Nginx, Apache)
5. Enable HTTPS/SSL certificates
6. Update frontend API URL to production server

## Support

If you encounter issues:

1. Check the Flask console for error messages
2. Verify all dependencies in requirements.txt are installed
3. Ensure Python 3.8+ is being used
4. Check that port 5000 is not blocked by firewall
5. Look at the CORS configuration in app.py
