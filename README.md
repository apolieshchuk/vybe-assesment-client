# Vybe Assesment (React + TypeScript + Vite)
## Project description 

- Used basic Material UI components for the UI
- For API calls used custom useFetch hook
- `src/api-models` contains the interfaces for the API responses, generated using https://openapi-generator.tech/ from the swagger api json file on the backend side
- Wallet balances chart and TPS chart are cached on the backend side for 30 seconds
- Market Cap SPL Tokens chart not cached (because we need to fetch 2 different views in the same time)
- For flexibility and scalability, the app is divided into 3 main components types:
 1. `src/components` - base layout components (header, footer, main)
 2. `src/charts` - basic chart components based on chart type (line, bar, pie)
 3. `src/dashboard` - specific charts components for the dashboard page that are using the basic chart components and manages data access layer (API calls)
- The app is hosted on Vercel and can be accessed at https://vybe-assesment-client.vercel.app/
## Running the client app

```bash
# development
$ npm install

# watch mode
$ npm run dev
```