import 'nextra-theme-docs/style.css'

import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

// const banner = <Banner storageKey='some-key'>Nextra 4.0 is released 🎉</Banner>
const navbar = (
  <Navbar
    logo={<b>@textea/json-viewer</b>}
    logoLink='https://github.com/TexteaInc/json-viewer'
    projectLink='https://github.com/TexteaInc/json-viewer'
  />
)

export default async function RootLayout ({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang='en'
      // Required to be set
      dir='ltr'
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head>
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          feedback={{
            labels: 'feedback',
            content: 'Feedback'
          }}
          docsRepositoryBase='https://github.com/TexteaInc/json-viewer/tree/main/docs'
          editLink='Edit this page on GitHub'
          footer={<Footer>MIT {new Date().getFullYear()} © Textea, Inc.</Footer>}
          navbar={navbar}
          pageMap={await getPageMap()}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
