# ZAVOD IT - Lusayo Nyondo

## Setup

- `git clone https://github.com/lusayo-nyondo/zavod_id_news.git`
- `python -m venv venv`
- `python -m pip install -r requirements.txt`
- `python -m manage.py runserver`
- Open browser and navigate to: `http://localhost:8000`.

## Logging In
- I've shipped the database, `db.sqlite3`, together with the repository to make it easier to check the app's functionality.
- The database contains the following users and their passwords:
    - admin: Admin1234
    - zavod_it: Zavod2025
    - lusayo: Lusayo1234

### Notes on deployment setup:

- I configured Vite to build the React app to a folder that Django can serve to simplify deployment for testing and viewing.
- The React application is being served from the `news_app` Django application.
- The React application has been built to the folder `news_app/templates/news_app` and that's where it's being served from when you run `python manage.py runserver`.
- The React app can however, be served independently by doing the following:
    - Navigate to `news_app`
    - Run `npm install`
    - Run `npm run dev`
