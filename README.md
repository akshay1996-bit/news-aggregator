# News-aggregator-api

# News API Integration

In this project, user can fetch latest news stories based on his preferences.

## Prerequisites

Before running the project, make sure you have the following prerequisites:

- Node.js installed on your machine

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/akshay1996-bit/news-aggregator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd news-aggregator
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## API Routes
The project also includes the following API routes for users:

### User Routes

- `POST /register`: Register a new user.
- `POST /login`: Log in an existing user.
- `GET /prefernces`: Get the news preferences for the currently logged-in user.
- `PUT /prefernces`: Update the news preferences for the currently logged-in user.

### News Routes

- `GET /news`: Fetch all available news sources.
