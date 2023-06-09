import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
}

type props = {
  children: JSX.Element | ReactNode
}

const RootLayout = ({ children }: props) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
