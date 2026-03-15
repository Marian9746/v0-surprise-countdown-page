"use client"

import { useState, useEffect, useMemo } from "react"
import { Heart, Gift, Sparkles, PartyPopper, Star } from "lucide-react"

const REAL_DATE = new Date("2026-05-09T00:00:00")

const MYSTERIOUS_MESSAGES = [
  "¿Confías en esta fecha? Nosotras tampoco...",
  "El destino está escrito... en lápiz borrable",
  "Esta fecha es tan real como los unicornios",
  "Spoiler: puede que sí, puede que no",
  "El misterio es parte de la diversión",
  "¿Será esta la fecha correcta? Quién sabe...",
  "Ni nosotras sabemos cuál es la buena",
  "La fecha real está en tu corazón... o no",
]

function getRandomDate() {
  const minDate = new Date("2026-03-20")
  const maxDate = new Date("2026-08-15")
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

function Confetti() {
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 8 + Math.random() * 12,
      color: ["#e10d13", "#ffbdd8", "#ff7a9a", "#ffd4e3", "#ffffff"][Math.floor(Math.random() * 5)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  )
}

function FloatingIcons() {
  const icons = [
    { Icon: Heart, className: "top-[10%] left-[5%]", delay: "0s" },
    { Icon: Gift, className: "top-[20%] right-[10%]", delay: "1s" },
    { Icon: Sparkles, className: "bottom-[30%] left-[8%]", delay: "2s" },
    { Icon: PartyPopper, className: "bottom-[20%] right-[5%]", delay: "0.5s" },
    { Icon: Star, className: "top-[40%] left-[3%]", delay: "1.5s" },
    { Icon: Heart, className: "top-[60%] right-[8%]", delay: "2.5s" },
  ]

  return (
    <>
      {icons.map(({ Icon, className, delay }, i) => (
        <div
          key={i}
          className={`absolute ${className} animate-float opacity-30`}
          style={{ animationDelay: delay }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary" />
        </div>
      ))}
    </>
  )
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 min-w-[80px] md:min-w-[120px] border-2 border-secondary hover:scale-105 transition-transform duration-300">
        <span className="text-4xl md:text-6xl font-bold text-primary">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-2 text-sm md:text-base font-medium text-muted-foreground uppercase tracking-wider">
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
        <div className="text-2xl text-primary animate-pulse">Cargando sorpresa...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-muted to-secondary/30">
      <Confetti />
      <FloatingIcons />
      
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <PartyPopper className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">Cuenta Atrás</span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl">para el Gran Fin de Semana</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-medium">
            {formatDate(fakeDate)}
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
            <TimeBox value={timeLeft.days} label="Días" />
            <TimeBox value={timeLeft.hours} label="Horas" />
            <TimeBox value={timeLeft.minutes} label="Minutos" />
            <TimeBox value={timeLeft.seconds} label="Segundos" />
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-secondary max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-foreground italic">
              "{message}"
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </div>
          </div>

          <p className="mt-10 text-muted-foreground text-sm md:text-base">
            Refresca la página si te atreves...
          </p>
        </div>
      </main>
    </div>
  )
}
