# MediRoute Backend

This directory contains the Node.js and Express backend for the MediRoute application. It provides two main endpoints:

-   `/api/triage`: Accepts user symptoms and returns an AI-generated specialist recommendation.
-   `/api/search`: Searches the static doctor database based on specialty and city.

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### Environment Variables

Before running the server, you need to set up your environment variables. Create a `.env` file in this directory by copying the example file:

```sh
cp .env.example .env
```

Then, edit the `.env` file and add your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
```

### Installation

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install the required dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

To start the local development server, run the following command:

```sh
npm start
```

The server will start on `http://localhost:5000`.
