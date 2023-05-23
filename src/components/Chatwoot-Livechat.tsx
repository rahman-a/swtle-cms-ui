import { useEffect } from 'react'
import { useRouter } from 'next/router'
export interface IChatwootLiveChatProps {}

export default function ChatWootLiveChat(props: IChatwootLiveChatProps) {
  const { locale } = useRouter()
  useEffect(() => {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: 'right', // This can be left or right
      locale: locale, // Language to be set
      type: 'standard', // [standard, expanded_bubble]
    }

    // Paste the script from inbox settings except the <script> tag
    ;(function (d, t) {
      let BASE_URL: string = 'https://app.chatwoot.com'
      let g = d.createElement(t) as HTMLScriptElement
      let s = d.getElementsByTagName(t)[0]
      g.src = BASE_URL + '/packs/js/sdk.js'
      s.parentNode!.insertBefore(g, s)
      g.async = !0
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: process.env.NEXT_PUBLIC_CHATWOOT_KEY,
          baseUrl: BASE_URL,
        })
      }
    })(document, 'script')
  }, [locale])
  return null
}
