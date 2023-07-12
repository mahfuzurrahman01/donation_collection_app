import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import Store from "@/context/store";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tailwindCss = "lg:w-[80%] md:w-[90%] w-[98%]";
  const classes = inter.className;
  const combinedClassName = `${tailwindCss} ${classes}`;
  return (
    <html lang="en">
      <body
        className={combinedClassName}
        style={{
          background: "black",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          color: "#bbb",
          minHeight: "100vh",
          margin: "auto",
        }}
      >
        <Store>
          <Navbar />
          {children}
          <Footer />
        </Store>
      </body>
    </html>
  );
}
