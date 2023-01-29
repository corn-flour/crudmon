import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider, signIn, useSession } from "next-auth/react"

import { api } from "../utils/api"

import "../styles/globals.css"
import type { ReactNode } from "react"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: userSession } = useSession({
    required: true,
    onUnauthenticated: async () => {
      await signIn("discord")
    },
  })

  if (!userSession) return <div>Loading...</div>
  return <>{children}</>
}

export default api.withTRPC(MyApp)
