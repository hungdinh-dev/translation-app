import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/app-header";
import { RouteChangeIndicator } from "@/components/route-change-indicator";
import { AuthSessionProvider } from "@/providers/session-provider";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, }: Props) {
  //Add ngôn ngữ sau

  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RouteChangeIndicator />
            <Header />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
