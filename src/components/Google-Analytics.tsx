import * as React from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'

export default function GoogleAnalyticsScript() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  React.useEffect(() => {
    const url = pathname + searchParams.toString()
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  }, [pathname, searchParams])
  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env
          .NEXT_PUBLIC_GA_MEASUREMENT_ID!}`}
      />
      <Script
        id='google-analytics-script'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
                'analytics_storage': 'denied',
            });
            gtag('config',${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}, {
                page_path: window.location.pathname,
            });
        `,
        }}
      />
    </>
  )
}
