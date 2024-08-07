import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "./redux/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    //! suppressHydrationWarning  need for disable warning
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ToastContainer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
