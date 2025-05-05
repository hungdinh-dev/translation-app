import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/app-header";
import { RouteChangeIndicator } from "@/components/route-change-indicator";
import { AuthSessionProvider } from "@/providers/session-provider";
import { cookies } from "next/headers";
import "../i18n";
import TranslationsProvider from "@/i18n/TranslationsProvider";
import initTranslations from "../i18n";

const i18nNamespaces = ['default'];

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const ALL_LANGUAGES = ['en', 'vi'];
const LANGUAGE_COOKIE = 'NEXT_LOCALE';

export async function getLanguage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LANGUAGE_COOKIE)?.value;
  if (locale && ALL_LANGUAGES.includes(locale)) {
    return locale;
  }
}

export default async function RootLayout({ children, params }: Props) {

  const locale = params?.locale;
  const { t, resources, i18n } = await initTranslations(locale, ["default"]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
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
        </TranslationsProvider>
      </body>
    </html>
  );
}
