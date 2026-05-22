export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        html, body { overflow: auto !important; }
      `}</style>
      {children}
    </>
  )
}
