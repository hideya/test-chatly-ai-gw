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

4. Clean the generated files:

```bash
npm run clean
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

Copy the `.env.template` file to `.env` in the `server` directory:

```bash
cp .env.template .env
```

Fill in your OpenAI API key in the `.env` file:

```
OPENAI_API_KEY=your_openai_api_key
```

4. Start the server:

```bash
npm start
```

5. Clean the generated files:

```bash
npm run clean
```

The server should now be running at `http://localhost:5000`.
