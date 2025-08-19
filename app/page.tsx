import Calculator from "@/components/calculator"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">Simple Calculator</h1>
        <Calculator />
      </div>
    </main>
  )
}
