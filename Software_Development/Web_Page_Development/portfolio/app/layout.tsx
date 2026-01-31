import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Niraj KV - Lead ETL Developer',
  description: 'Professional portfolio of Niraj KV, experienced Lead ETL Developer with 18+ years in data warehouse and BI',
  keywords: ['ETL', 'Data Warehouse', 'BI', 'Informatica', 'Snowflake', 'DBT', 'Developer'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
