
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RoboX Shop | IoT & Robotics shop',
  description: 'RoboX: by Zbytes',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}> <Navbar />
        <NextTopLoader
          color="#ef4444" initialPosition={0.08} crawlSpeed={200} height={4} crawl={true} showSpinner={false} easing="ease" speed={200} shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        {children}
      </body>
    </html>
  )
}
