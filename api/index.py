from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        return None
    try:
        return psycopg2.connect(db_url)
    except Exception as e:
        print(f"DB Connection Error: {e}")
        return None

@app.get("/api/data")
def get_portfolio_data():
    # --- DATABASE LOGIC (Commented out for now) ---
    # conn = get_db_connection()
    # if conn:
    #     cursor = conn.cursor(cursor_factory=RealDictCursor)
    #     cursor.execute("SELECT project_name, score FROM my_projects;")
    #     rows = cursor.fetchall()
    #     cursor.close()
    #     conn.close()
    #     x_data = [row['project_name'] for row in rows]
    #     y_data = [row['score'] for row in rows]
    # else:
    #     x_data, y_data = [], []

    # --- HARDCODED LOGIC (Active: guarantees it works for your deadline) ---
   # Inside your get_portfolio_data() function:
    return {
        "data": [
            {
                "x": ["Python (DSA/OOP)", "React.js", "FastAPI", "n8n / Docker", "PostgreSQL", "AI / NLP"],
                "y": [90, 80, 85, 75, 70, 80],
                "type": "bar",
                "marker": {
                    "color": ["#306998", "#61DAFB", "#009688", "#FF6B6B", "#336791", "#9B59B6"]
                }
            }
        ],
        "layout": {
            "title": "Core Technical Skills",
            "paper_bgcolor": "rgba(0,0,0,0)",
            "plot_bgcolor": "rgba(0,0,0,0)",
            "font": {"color": "#333"}
        }
    }