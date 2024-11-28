import localFont from "next/font/local";
import "./globals.css";
import ContextProvider from "@/context/Context";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "simplyfy",
  description: "the one stop application to simyplyfy all academic doubts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider>

        {children}
        </ContextProvider>


      </body>
    </html>
  );
}
