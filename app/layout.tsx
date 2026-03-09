import type { Metadata } from "next";
import "./globals.css";

const BASE = "https://twog.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: { 
    default: "TWOG — The Word of God", 
    template: "%s | TWOG" 
  },
  description: "A searchable archive of everything attributed to God in the Bible — violence, slavery, genocide, punishment, misogyny, contradictions. The content condemns itself.",
  keywords: ["Bible verses", "God in the Bible", "Bible violence", "Bible slavery", "Bible genocide", "Bible contradictions", "word of God"],
  
  // This section handles the favicon and app icons
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico", // Or apple-touch-icon.png if you have a specific one
  },

  // This section handles the social media preview image
  openGraph: {
    type: "website",
    siteName: "TWOG — The Word of God",
    title: "TWOG — Everything God Says in the Bible",
    description: "A searchable archive of divine commands, punishments, and moral decrees. The content condemns itself.",
    url: BASE,
    images: [
      { 
        url: "/images/og.png", 
        width: 1200, 
        height: 630, 
        alt: "TWOG — The Word of God" 
      }
    ],
  },

  // This section handles the Twitter/X preview image
  twitter: {
    card: "summary_large_image",
    title: "TWOG — Everything God Says in the Bible",
    description: "A searchable archive of divine commands, punishments, and moral decrees.",
    images: ["/images/og.png"],
  },
  
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Manual link tags for Google Fonts and Favicon fallback */}
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400;1,8..60,600&family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}