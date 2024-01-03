import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import StoreProvider from './context/StoreProvider.tsx'
import { store } from './redux/configureStore.ts'
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <BrowserRouter>
        <Provider store={store} >
          <App />
        </Provider>
        </BrowserRouter>
      </StoreProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
