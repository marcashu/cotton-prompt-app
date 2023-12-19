export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-4">
      <div className="container py-6 rounded-[0.5rem] border bg-background shadow">
        {children}
      </div>
    </div>
  )
}
