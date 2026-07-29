import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const imageUrl = `${protocol}://${host}/og.png`;

  return {
    title: "AI 여행 상담소 | 생활과 수송",
    description: "AI 추천을 비판적으로 검토하고 우리 모둠의 이동 계획을 완성하는 초등 5학년 실과 활동",
    openGraph: {
      title: "AI 여행 상담소",
      description: "AI의 추천을 살펴보고 우리 모둠만의 이동 계획을 완성해요.",
      type: "website",
      images: [{ url: imageUrl, width: 1733, height: 907, alt: "AI 여행 상담소" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI 여행 상담소",
      description: "초등 5학년 실과 · 생활과 수송 활동",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
