# test-chatly-ai-gw

## Client Side

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. Navigate to the `client` directory:

```bash
cd client
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The client application should now be running at `http://localhost:3000`.

## Server Side

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- SQLite

### Setup

1. Navigate to the `server` directory:

```bash
cd server
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

Create a `.env` file in the `server` directory and add the following:

```
OPENAI_API_KEY=your_openai_api_key
```

Replace `your_openai_api_key` with your actual OpenAI API key.

4. Start the server:

```bash
npm start
```

The server should now be running at `http://localhost:5000`.
