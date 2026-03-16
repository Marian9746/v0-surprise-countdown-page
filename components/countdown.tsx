"use client"

import { useState, useEffect } from "react"

const REAL_DATE = new Date("2026-05-09T00:00:00")

const MYSTERIOUS_MESSAGES = [
  "Esta fecha es tan fiable como el WiFi del metro",
  "El destino está escrito... en lápiz borrable",
  "Spoiler: puede que sí, puede que no",
  "Ni nosotras sabemos cuál es la buena",
  "Confía en el proceso... o no",
  "La fecha real es un misterio",
  "¿Quién necesita certezas de todos modos?",
]

function getRandomDate() {
  const minDate = new Date("2026-03-20")
  const maxDate = new Date("2026-05-10")
  const randomTime = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime())
  return new Date(randomTime)
}

function formatDate(date: Date) {
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card rounded-lg p-6 md:p-8 min-w-[90px] md:min-w-[140px] border border-border">
        <span className="text-5xl md:text-7xl font-bold text-primary tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-3 text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  )
}

export function Countdown() {
  const [mounted, setMounted] = useState(false)
  const [fakeDate, setFakeDate] = useState<Date | null>(null)
  const [message, setMessage] = useState("")
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setFakeDate(getRandomDate())
    setMessage(MYSTERIOUS_MESSAGES[Math.floor(Math.random() * MYSTERIOUS_MESSAGES.length)])
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!fakeDate) return

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = fakeDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [fakeDate])

  if (!mounted || !fakeDate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-xl text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="text-center max-w-3xl mx-auto">
          
          <p className="text-sm md:text-base font-semibold text-primary uppercase tracking-[0.3em] mb-4">
            Cuenta atrás
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight text-balance">
            La gran despedida de 2026
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 capitalize">
            {formatDate(fakeDate)}
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
            <TimeBox value={timeLeft.days} label="Días" />
            <TimeBox value={timeLeft.hours} label="Horas" />
            <TimeBox value={timeLeft.minutes} label="Minutos" />
            <TimeBox value={timeLeft.seconds} label="Segundos" />
          </div>

          <div className="border-t border-border pt-8 max-w-md mx-auto">
            <p className="text-base md:text-lg text-muted-foreground italic">
              "{message}"
            </p>
          </div>

          <p className="mt-12 text-sm text-muted-foreground/60">
            Refresca la página si te atreves...
          </p>
        </div>
      </main>
    </div>
  )
}
