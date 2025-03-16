"use client"
import "./globals.css";
import { MiContextoProvider } from "./components/context";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <MiContextoProvider>
      <body>
        {children}
      </body>
        </MiContextoProvider>
    </html>
  );
}
