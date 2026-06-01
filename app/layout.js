export const metadata = {
  title: "Anzaar.mn",
  description: "Өнөөдрийг анзаарч маргаашийг бүтээе"
}

export default function RootLayout({ children }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  )
}
