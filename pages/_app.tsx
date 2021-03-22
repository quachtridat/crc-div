import { AppProps } from 'next/app'

import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return <Component {...pageProps} />
}

export default App;