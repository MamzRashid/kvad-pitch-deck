'use client'

import Image from 'next/image'
import WaveformBg from '@/components/WaveformBg'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const BAR_COUNT = 28
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) =>
  4 + Math.round(Math.abs(Math.sin(i * 0.7 + 1.2)) * 12)
)

function AudioPlayerInline({ label, accent = 'rgba(255,255,255,0.55)' }: { label: string; accent?: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer select-none"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={() => setPlaying(p => !p)}
    >
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.09)' }}
      >
        {playing ? (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <rect x="0" y="0" width="2.8" height="10" rx="0.8" fill="rgba(255,255,255,0.75)" />
            <rect x="5.2" y="0" width="2.8" height="10" rx="0.8" fill="rgba(255,255,255,0.75)" />
          </svg>
        ) : (
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
            <path d="M1.5 1l5.5 4-5.5 4V1z" fill="rgba(255,255,255,0.75)" />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-[2.5px] flex-1" style={{ height: 20 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className={playing ? 'audio-bar-playing rounded-full flex-shrink-0' : 'rounded-full flex-shrink-0'}
            style={{
              width: 2.5,
              height: h,
              background: playing ? accent : 'rgba(255,255,255,0.12)',
              '--bar-dur': `${0.5 + (i % 5) * 0.12}s`,
              '--bar-delay': `${(i % 7) * -0.09}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <span className="text-[10px] font-medium tracking-[0.08em] flex-shrink-0" style={{ color: 'rgba(255,255,255,0.28)' }}>
        {label}
      </span>
    </div>
  )
}

const ease = [0.25, 0.1, 0.25, 1]

function Divider() {
  return <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] text-white/22 tracking-[0.28em] uppercase font-medium">
      {children}
    </span>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-[3px] h-[3px] rounded-full bg-white/22 flex-shrink-0 mt-[7px]" />
      <span className="text-[12.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
        {children}
      </span>
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
      style={{ color: 'rgba(255,255,255,0.40)', border: '1px solid rgba(255,255,255,0.09)' }}>
      {children}
    </span>
  )
}

// ── COVER ────────────────────────────────────────────────────────────

function Cover() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] py-32 md:py-44 px-8 text-center">
      <WaveformBg opacity={0.035} speed={0.6} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #030303 100%)' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-10 max-w-2xl">
        <Image src="/kvad-logo.svg" alt="Kvad" width={360} height={82} priority style={{ opacity: 0.92 }} />

        <div className="flex flex-col items-center gap-6">
          <p className="text-[14px] font-light text-white/50 tracking-[0.14em] uppercase">
            Infrastruktur for naturlig norsk tale
          </p>
          <div className="w-px h-6 bg-white/8" />
          <p className="text-[15px] md:text-[16px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.48)' }}>
            Kvad bygger stemmelaget som mangler i norsk AI-infrastruktur — et API som gir
            bedrifter og utviklere tilgang til naturlig norsk tale med sanntidsrespons og
            menneskelig kvalitet. Tenk Twilio for norsk stemme.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <p className="text-[12px] font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Dette dokumentet er konfidensielt og kun ment for potensielle investorer.
          </p>
          <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.14)' }}>
            Spørsmål? mamoon@kvad.no
          </p>
        </div>
      </div>
    </section>
  )
}

// ── EXECUTIVE SUMMARY ────────────────────────────────────────────────

function ExecutiveSummary() {
  const points = [
    {
      label: 'Problemet',
      text: 'AI-drevne taleagenter høres robotaktige ut på norsk. Norske brukere avviser dem — og bedriftene som bygger dem, har ingen god løsning.',
    },
    {
      label: 'Løsningen',
      text: 'Kvad er et API for naturlig norsk tale i sanntid. Bedrifter integrerer med noen linjer kode og får menneskelig stemmekvalitet ut av boksen.',
    },
    {
      label: 'Markedet',
      text: '$47B global voice AI-markedsverdi innen 2029. Vi anslår et nordisk SAM på $2.4B. Kvad posisjonerer seg som standardinfrastrukturen for norsk tale-AI.',
    },
    {
      label: 'Traksjon',
      text: 'Selly — en AI-salgsagent med interesse fra store norske selskaper — er klar til å lansere, men blokkert av manglende norsk TTS-kvalitet. Kvad er løsningen.',
    },
    {
      label: 'Teamet',
      text: 'Mamoon Rashid (Produkt & distribusjon) og Vebjørn (Modelltrening & teknisk arkitekt). Kompetansen treffer kjernen av det som kreves for å lykkes.',
    },
    {
      label: 'Vi søker',
      text: '$2M seed for å ferdigstille kjerneinfrastrukturen, skalere treningsdata og sikre de første betalende enterprise-kundene.',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-16 md:py-20">
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Label>Sammendrag</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3vw, 38px)' }}>
            Kvad på ett minutt.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'rgba(255,255,255,0.06)' }}>
          {points.map((p) => (
            <div key={p.label} className="flex flex-col gap-3 p-7 bg-[#030303]">
              <span className="text-[10px] font-semibold tracking-[0.20em] uppercase"
                style={{ color: 'rgba(255,255,255,0.28)' }}>
                {p.label}
              </span>
              <p className="text-[13.5px] font-light leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.68)' }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PROBLEM ──────────────────────────────────────────────────────────

function Problem() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, #0f0f0f 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-14">
        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Problemet</Label>
          <h2 className="text-[42px] md:text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            AI høres fortsatt ikke<br />menneskelig ut på norsk.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Globale tale-modeller er trent på engelske datasett og etterpå tilpasset norsk. Resultatet er
            stiv, umenneskelig tale som norske brukere umiddelbart kjenner igjen og avviser. Norske
            selskaper som vil bygge AI-agenter, callbots og stemmeprodukter har ikke et godt nok
            fundament å bygge på — og vet det.
          </p>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.36)' }}>
            Dette er ikke et bekvemmelhetsproblem. Forsinkelse på 300–800ms og unaturlig intonasjon
            ødelegger tillit i kundedialoger, support og salg. For selskaper som konkurrerer på
            kundeopplevelse, er dette en blokkerende faktor — ikke en "nice to have".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Generisk AI-stemme i dag
            </span>
            <AudioPlayerInline label="DEMO" accent="rgba(255,255,255,0.40)" />
            <div className="flex flex-col gap-3 mt-1">
              <Bullet>Forsinkelse på 300–800ms ødelegger naturlig samtaleflyt</Bullet>
              <Bullet>Trent på studioopplesning — mangler norsk rytme og intonasjon</Bullet>
              <Bullet>Norske brukere har lavere toleranse for robotaktig tale enn f.eks. engelsktalende markeder</Bullet>
              <Bullet>Ingen eksisterende løsning er bygget spesifikt for norsk samtale-AI</Bullet>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Kvad-stemme
            </span>
            <AudioPlayerInline label="KVAD" accent="rgba(255,255,255,0.70)" />
            <div className="flex flex-col gap-3 mt-1">
              <Bullet>Trent på norske samtaler — ikke studioopplesning. Naturlig rytme og intonasjon</Bullet>
              <Bullet>Under 200ms ende-til-ende forsinkelse — reell sanntidsdialog</Bullet>
              <Bullet>Emosjonell troverdighet og naturlige pauser som bygger tillit</Bullet>
              <Bullet>API-første — integreres i eksisterende systemer med noen linjer kode</Bullet>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── HVORFOR NÅ ───────────────────────────────────────────────────────

function WhyNow() {
  const statements = [
    {
      number: '01',
      title: 'AI-agenter venter på en menneskelig stemme.',
      desc: 'Neste generasjon AI-agenter er under utvikling. De mangler én ting for å bli akseptert av norske brukere: en stemme som høres menneskelig ut.',
    },
    {
      number: '02',
      title: 'Stemmeskuespillere er dyre og trege.',
      desc: 'Norsk innholdsproduksjon, dubbing og lydbok er avhengig av stemmeskuespillere. Det er dyrt, tregt og skalerer ikke. TTS er løsningen — men kvaliteten holder ikke mål.',
    },
    {
      number: '03',
      title: 'Markedet er klart. Infrastrukturen er ikke.',
      desc: 'Mediahus, forlag, offentlig sektor og teknologiselskaper er klare til å ta i bruk norsk tale-AI. Det som mangler er infrastrukturen som gjør det mulig.',
    },
    {
      number: '04',
      title: 'Vi har dataen. Vi har teamet. Vi har timingen.',
      desc: 'Kvad har allerede tilgang til treningsdata ingen andre har, et team med riktig kompetanse, og er i posisjon før de store aktørene prioriterer Norden.',
    },
  ]

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <WaveformBg opacity={0.022} speed={0.35} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 42%, #0c0c0c 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-14">
        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Hvorfor nå</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
          >
            Voice AI eksploderer.<br />Norsk talekvalitet henger etter.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Timingen er ikke tilfeldig. Fire konvergerende krefter gjør dette til det rette øyeblikket
            for Kvad — og vi er allerede i posisjon.
          </p>
        </div>

        <div className="flex flex-col">
          {statements.map((s, i) => (
            <div key={s.number}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex gap-8 py-8 items-start">
                <span className="text-[9px] font-mono tracking-[0.2em] flex-shrink-0 w-6 pt-1.5"
                  style={{ color: 'rgba(255,255,255,0.22)' }}>
                  {s.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[18px] font-semibold leading-snug tracking-[-0.01em]"
                    style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {s.title}
                  </h3>
                  <p className="text-[13.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.46)' }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  )
}

// ── LØSNINGEN ────────────────────────────────────────────────────────

function Solution() {
  const sections = [
    {
      number: '01',
      title: 'Menneskelig tale',
      body: 'Naturlig rytme, emosjonell flyt og samtalevennlig levering — ikke studioopplesning.',
      detail: 'Trent på ekte norske samtaler med pauser, temperaturveksling og emosjonell variasjon. Modellen modulerer tone og tempo kontekstuelt — noe ingen global modell gjør for norsk i dag.',
    },
    {
      number: '02',
      title: 'Sanntidsrespons',
      body: 'Optimalisert for live samtaler med under 200ms ende-til-ende forsinkelse.',
      detail: 'Streaming-arkitektur som genererer og leverer tale mens setningen formuleres. Dette er ikke batch-TTS — det er konversasjonell infrastruktur bygget for agenter som må svare umiddelbart.',
    },
    {
      number: '03',
      title: 'API-første infrastruktur',
      body: 'Produksjonsklar API som integreres på minutter og skalerer til enterprise.',
      detail: 'Fungerer på alle plattformer, fra prototype til produksjon. Gratis tier for utviklere senker adopsjonsbarrieren. Enterprise-kunder får dedikerte deployments med SLA og prioritert support.',
    },
  ]

  return (
    <section className="relative w-full flex items-center bg-[#030303] px-8 py-20 md:py-28">
      <WaveformBg opacity={0.02} speed={0.3} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 40%, #0d0d0d 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Løsningen</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
          >
            Kvad er stemmen bak norsk tale-AI.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Det er tre ting som må fungere simultant for at norsk tale-AI skal være akseptabelt i
            produksjon. Kvad er bygget rundt alle tre.
          </p>
        </div>

        <div className="flex flex-col">
          {sections.map((s, i) => (
            <div key={s.number}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-20 py-9">
                <div className="flex items-baseline gap-5 flex-shrink-0 md:w-[240px]">
                  <span className="text-[9px] font-mono text-white/18 tracking-[0.2em]">{s.number}</span>
                  <h3 className="text-[20px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.90)' }}>
                    {s.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-2.5">
                  <p className="text-[14px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
                    {s.body}
                  </p>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.36)' }}>
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </div>
    </section>
  )
}

// ── TRAKSJON ─────────────────────────────────────────────────────────

const GREEN = '#4ade80'
const KVAD_SELLY = 1.8
const TOTAL_CYCLE = 7.0
const CUST_SIZE = 88
const CUST_GAP = 20
const CUST_COUNT = 5
const CUST_TOTAL = CUST_SIZE * CUST_COUNT + CUST_GAP * (CUST_COUNT - 1)
const CUST_CENTERS = Array.from({ length: CUST_COUNT }, (_, i) => CUST_SIZE / 2 + i * (CUST_SIZE + CUST_GAP))
const CUST_MID = CUST_CENTERS[2]
const MAX_HORIZ = CUST_MID - CUST_CENTERS[0]

function TFlowLine({ height = 46 }: { height?: number }) {
  return (
    <div className="flex justify-center" style={{ height }}>
      <svg width={2} height={height} style={{ overflow: 'visible' }}>
        <line x1={1} y1={0} x2={1} y2={height} stroke="rgba(255,255,255,0.06)" strokeWidth={0.75} />
        <motion.circle cx={1} cy={0} r={1.6} fill={GREEN}
          animate={{ cy: [0, height], opacity: [0, 1, 1, 0] }}
          transition={{ duration: KVAD_SELLY, repeat: Infinity, ease: 'easeInOut', repeatDelay: TOTAL_CYCLE - KVAD_SELLY }}
        />
      </svg>
    </div>
  )
}

function TBranchConnector() {
  const H = 40
  const stemH = 14
  const dropH = H - stemH
  const MAX_BRANCH = 3.2

  return (
    <div className="relative" style={{ width: CUST_TOTAL, height: H }}>
      <svg width={CUST_TOTAL} height={H} className="absolute inset-0" style={{ overflow: 'visible' }}>
        <line x1={CUST_MID} y1={0} x2={CUST_MID} y2={stemH} stroke="rgba(255,255,255,0.07)" strokeWidth={0.75} />
        <line x1={CUST_CENTERS[0]} y1={stemH} x2={CUST_CENTERS[4]} y2={stemH} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        {CUST_CENTERS.map((x) => (
          <line key={x} x1={x} y1={stemH} x2={x} y2={H} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        ))}
        {CUST_CENTERS.map((x, i) => {
          const horizDist = Math.abs(x - CUST_MID)
          const totalDist = stemH + horizDist + dropH
          const t1 = stemH / totalDist
          const t2 = (stemH + horizDist) / totalDist
          const duration = 2.0 + (horizDist / MAX_HORIZ) * 1.2
          const delay = KVAD_SELLY + (MAX_BRANCH - duration)
          return (
            <motion.circle key={i} r={1.6} fill={GREEN}
              animate={{ cx: [CUST_MID, CUST_MID, x, x], cy: [0, stemH, stemH, H], opacity: [0, 1, 1, 0] }}
              transition={{ duration, delay, repeat: Infinity, repeatDelay: TOTAL_CYCLE - duration, ease: 'easeInOut', times: [0, t1, t2, 1] }}
            />
          )
        })}
      </svg>
    </div>
  )
}

const customers = [
  { name: '24t', img: '/logo24web2025BLACK.svg.png', style: { filter: 'grayscale(1) invert(1)', mixBlendMode: 'screen' as const, opacity: 0.78 }, w: 44, h: 44 },
  { name: 'Masala', img: '/Asset 2.png', style: { opacity: 0.76, filter: 'invert(1)', mixBlendMode: 'screen' as const }, w: 46, h: 46 },
  { name: 'Compho', img: '/COMPHO_2rowsWhite.png', style: { opacity: 0.72 }, w: 46, h: 22 },
  { name: 'J&Co', img: '/Hvit skrift (2) (1).png', style: { opacity: 0.74 }, w: 48, h: 24 },
  { name: 'Kahlon', img: '/KG-Hoved-White.png', style: { opacity: 0.72 }, w: 56, h: 28 },
]

function Traction() {
  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <WaveformBg opacity={0.018} speed={0.22} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 44%, #0f0f0f 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Tidlig etterspørsel</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.2vw, 42px)' }}
          >
            Etterspørselen er konkret. Stemmen mangler.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Selly er en norsk AI-salgsagent som i over ett år har vært klar til å lansere.
            Problemet er at ingen norsk TTS-løsning er god nok til at norske sluttbrukere
            aksepterer den. De har allerede interesse fra store norske selskaper som ønsker å
            bruke tjenesten — men har ikke gått ut i markedet fordi stemmen ikke holder mål.
          </p>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.36)' }}>
            Kvad fjerner den blokkerende faktoren. Når Selly lanserer med Kvad, får vi umiddelbar
            eksponering mot de fem kundene i diagrammet nedenfor — selskaper som allerede er
            interessert og ventet. Dette er ikke hypotetisk fremtidig etterspørsel.
            Det er konkret, ventet etterspørsel som Kvad låser opp dag én.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-14">
          <div className="flex flex-col items-center flex-1 py-4">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center rounded-full bg-black"
                style={{ width: 120, height: 120, border: '1px solid rgba(255,255,255,0.11)', boxShadow: '0 0 28px 4px rgba(255,255,255,0.015)' }}
              >
                <motion.div className="absolute rounded-full pointer-events-none"
                  style={{ width: 170, height: 170, top: -25, left: -25, border: '1px solid rgba(255,255,255,0.04)' }}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="flex flex-col items-center gap-1.5">
                  <Image src="/kvad-icon.svg" alt="Kvad" width={38} height={38} style={{ opacity: 0.93 }} />
                  <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-white/85">Kvad</span>
                </div>
              </div>
              <span className="text-[9px] tracking-[0.18em] uppercase font-medium mt-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Infrastrukturlag</span>
            </div>

            <TFlowLine height={40} />

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black"
                style={{ width: 84, height: 84, border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Image src="/selly-logo-white.svg" alt="Selly" width={48} height={18} style={{ opacity: 0.82 }} />
              </div>
              <span className="text-[9px] tracking-[0.18em] uppercase font-medium mt-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Selly — Venter på Kvad.</span>
            </div>

            <TBranchConnector />

            <div className="flex items-start" style={{ gap: CUST_GAP }}>
              {customers.map((c) => (
                <div key={c.name} className="flex flex-col items-center gap-2" style={{ width: CUST_SIZE }}>
                  <div className="flex items-center justify-center rounded-full bg-black flex-shrink-0"
                    style={{ width: CUST_SIZE, height: CUST_SIZE, border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.name} width={c.w} height={c.h} style={c.style} />
                  </div>
                  <span className="text-[9.5px] font-medium tracking-[0.12em] uppercase text-center leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] font-light mt-4 text-center" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Konverterer når stemmen høres menneskelig ut
            </p>
          </div>

          <div className="flex flex-col gap-5 md:w-[38%] flex-shrink-0">
            <div className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                Hva dette betyr
              </span>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Selly er ett eksempel på et bredere mønster: norske AI-produktselskaper er klare til å lansere stemmefunksjoner, men blokkert av infrastrukturmangel.
              </p>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Kvad posisjonerer seg som løsningen hele dette segmentet venter på. Det er ikke bare én kunde — det er et nytt produktkategori som aktiveres.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── KONKURRANSEFORTRINN ───────────────────────────────────────────────

function WhyKvad() {
  const moats = [
    {
      number: '01', title: 'Bygget på data ingen andre har tilgang til', tag: 'Datafortrinn',
      desc: 'Flere hundre timer segmentert norsk tale — ikke studioopplesning, men autentiske samtaler med naturlig rytme, pauser og emosjonell variasjon.',
      detail: 'Historisk samtaledata kan ikke gjenskapes på bestilling. Konkurrenter som vil inn i dette markedet i dag, må starte fra null og vente år på sammenlignbart volum og kvalitet.',
    },
    {
      number: '02', title: 'Samtalerytme og prosodi som en kjernekompetanse', tag: 'Modellfortrinn',
      desc: 'Vi trener ikke bare på hva som sies — men på hvordan det sies. Tempo, trykk, pauser og emosjonell flyt er eksplisitt modellert.',
      detail: 'Global TTS er bredde-optimert. Kvad er dypt optimalisert for norsk samtale-AI. Ingen global aktør vil gjøre dette arbeidet for et marked på 5 millioner mennesker.',
    },
    {
      number: '03', title: 'Eksklusivt råmateriale fra norske podcastere', tag: 'Innholdsfortrinn',
      desc: 'Direkte avtaler med norske podcastere gir oss tilgang til autentiske samtaleopptak med rettigheter klare for modelltrening.',
      detail: 'Disse relasjonene og rettighetene er utilgjengelige for konkurrenter. Dataen er ikke skrapet — den er eksklusivt lisensiert.',
    },
    {
      number: '04', title: 'Internt produksjonsapparat for taledata', tag: 'Produksjonsfortrinn',
      desc: 'Eget opptaksrom lar teamet produsere og kontrollere treningsdata løpende — med full kontroll over kvalitet, format og volum.',
      detail: 'Vi er ikke avhengig av tredjeparter for dataproduksjon. Det betyr raskere iterasjon og konsekvent datakvalitet over tid.',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-0">
        <div className="flex flex-col gap-6 md:pr-14 flex-shrink-0 md:w-[42%] md:justify-center">
          <Label>Hvorfor Kvad</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.03]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
          >
            Store aktører optimaliserer for verden. Vi optimaliserer for Norden.
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Generiske stemmemodeller er brede. Kvad er dypt optimalisert — trent på norsk rytme,
            norske pauser og norsk samtaleflyt. Fire fortrinn som forsterker hverandre over tid,
            og som skaper en grøft som er vanskeligere å krysse for hver måned vi opererer.
          </p>
          <p className="text-[13px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.28)' }}>
            ElevenLabs, Google og Microsoft tilbyr norsk TTS — men de er ikke bygget for norsk samtale-AI.
            Det er forskjellen mellom å lese opp en tekst og å føre en naturlig dialog.
          </p>
        </div>

        <div className="hidden md:block flex-shrink-0 self-stretch"
          style={{ width: '1px', background: 'rgba(255,255,255,0.06)', margin: '0' }}
        />

        <div className="flex flex-col flex-1 md:pl-14">
          {moats.map((m, i) => (
            <div key={m.number}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex items-start gap-8 py-7">
                <span className="text-[9px] font-mono tracking-[0.2em] flex-shrink-0 w-5 pt-1"
                  style={{ color: 'rgba(255,255,255,0.20)' }}
                >
                  {m.number}
                </span>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="text-[15px] font-semibold tracking-tight leading-snug"
                      style={{ color: 'rgba(255,255,255,0.90)' }}
                    >
                      {m.title}
                    </h3>
                    <Tag>{m.tag}</Tag>
                  </div>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                    {m.desc}
                  </p>
                  <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    {m.detail}
                  </p>
                </div>
              </div>
              {i === moats.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MARKED ───────────────────────────────────────────────────────────

const M_NODES = [
  { label: 'Mediahus',     sub: 'Nyhetsopplesning & radio' },
  { label: 'Offentlig',    sub: 'NAV, kommuner & stat' },
  { label: 'Finans',       sub: 'Rådgivning & service' },
  { label: 'Innhold',      sub: 'Lydbok, podkast & e-læring' },
  { label: 'Dubing',       sub: 'Film & TV' },
  { label: 'Kundeservice', sub: 'Live support' },
  { label: 'AI-agenter',   sub: 'Samtale & automatisering' },
]
const M_DOT_CONFIGS = [
  { duration: 1.4, delay: 1.2, repeatDelay: 5.8 },
  { duration: 1.8, delay: 2.6, repeatDelay: 6.2 },
  { duration: 1.3, delay: 0.8, repeatDelay: 7.1 },
  { duration: 1.6, delay: 3.4, repeatDelay: 5.4 },
  { duration: 1.5, delay: 1.9, repeatDelay: 6.8 },
  { duration: 1.7, delay: 4.1, repeatDelay: 5.9 },
  { duration: 1.4, delay: 2.2, repeatDelay: 7.4 },
]
const M_VW = 500, M_VH = 500, M_CX = 250, M_CY = 250, M_R = 185

function mGetPos(i: number, n: number, r: number) {
  const angle = ((i * 360 / n) - 90) * Math.PI / 180
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r }
}
function mGetLabel(px: number, py: number) {
  if (px > 60)  return { anchor: 'start' as const,  dx: 32,  dy: py > 0 ? 38 : -44 }
  if (px < -60) return { anchor: 'end'   as const,  dx: -32, dy: py > 0 ? 38 : -44 }
  return          { anchor: 'middle' as const, dx: 0,   dy: py > 0 ? 46 : -46 }
}

function MarketOrbit() {
  const n = M_NODES.length
  return (
    <svg viewBox={`0 0 ${M_VW} ${M_VH}`} style={{ width: '100%', maxWidth: 460, height: 'auto' }}>
      <circle cx={M_CX} cy={M_CY} r={M_R} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
      {M_NODES.map((_, i) => {
        const pos = mGetPos(i, n, M_R * 0.84)
        const cfg = M_DOT_CONFIGS[i]
        return (
          <motion.circle key={i} r={2} fill="#4ade80"
            animate={{ cx: [M_CX, M_CX + pos.x], cy: [M_CY, M_CY + pos.y], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: cfg.duration, delay: cfg.delay, repeat: Infinity, repeatDelay: cfg.repeatDelay, ease: 'easeInOut', times: [0, 0.18, 0.82, 1] }}
          />
        )
      })}
      {M_NODES.map((node, i) => {
        const pos = mGetPos(i, n, M_R)
        const nx = M_CX + pos.x, ny = M_CY + pos.y
        const { anchor, dx, dy } = mGetLabel(pos.x, pos.y)
        return (
          <g key={i}>
            <circle cx={nx} cy={ny} r={22} fill="#060606" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            <circle cx={nx} cy={ny} r={4} fill="rgba(255,255,255,0.38)" />
            <text x={nx + dx} y={ny + dy} textAnchor={anchor} fill="rgba(255,255,255,0.90)" fontSize="11"
              fontFamily="Inter, sans-serif" fontWeight="600"
              style={{ letterSpacing: '0.10em', textTransform: 'uppercase' } as React.CSSProperties}
            >{node.label}</text>
            <text x={nx + dx} y={ny + dy + 16} textAnchor={anchor} fill="rgba(255,255,255,0.30)" fontSize="9.5"
              fontFamily="Inter, sans-serif" fontWeight="300"
              style={{ letterSpacing: '0.06em' } as React.CSSProperties}
            >{node.sub}</text>
          </g>
        )
      })}
      <g>
        <circle cx={M_CX} cy={M_CY} r={44} fill="#040404" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <image href="/kvad-icon.svg" x={M_CX - 16} y={M_CY - 16} width={32} height={32} opacity={0.92} />
        <text x={M_CX} y={M_CY + 62} textAnchor="middle" fill="rgba(255,255,255,0.80)" fontSize="9"
          fontFamily="Inter, sans-serif" fontWeight="600"
          style={{ letterSpacing: '0.28em' } as React.CSSProperties}
        >KVAD</text>
      </g>
    </svg>
  )
}

const MARKET_SEGMENTS = [
  {
    label: 'TAM',
    desc: 'Global voice AI-markedsverdi innen 2029',
    value: '$47B',
    bar: 1.0,
    source: 'MarketsandMarkets',
    color: 'rgba(255,255,255,0.55)',
  },
  {
    label: 'SAM',
    desc: 'Nordisk enterprise voice AI',
    value: '$2.4B',
    bar: 0.30,
    source: 'Estimert',
    color: 'rgba(255,255,255,0.36)',
  },
  {
    label: 'SOM',
    desc: 'Kvads adresserbart marked — år 1–3',
    value: '$85M',
    bar: 0.10,
    source: 'Intern estimat',
    color: 'rgba(74,222,128,0.70)',
  },
]

function Market() {
  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Markedsmulighet</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
          >
            Tekst til tale er et milliardmarked. Norsk har ingen leder.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Voice AI er et av de raskest voksende segmentene innen enterprise-teknologi globalt.
            Kvad addresserer den nordiske delen av dette markedet — et segment som i dag ikke
            har dedikert infrastruktur for naturlig samtale-AI.
          </p>
          <p className="text-[13.5px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.34)' }}>
            Det er ikke bare ett marked — Kvad er horisontal infrastruktur. Mediahus, finans,
            helse, booking, kundeservice: alle trenger naturlig norsk tale-AI.
            Infrastrukturlaget vinner på tvers av alle vertikaler.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex flex-col gap-7 md:w-[42%] flex-shrink-0">
            {MARKET_SEGMENTS.map((m) => (
              <div key={m.label} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.28)' }}>
                      {m.label}
                    </span>
                    <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {m.desc}
                    </span>
                  </div>
                  <span className="text-[16px] font-bold tracking-tight text-white ml-3 flex-shrink-0">
                    {m.value}
                  </span>
                </div>
                <div className="relative h-[3px] rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.bar * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
                <span className="text-[9px] font-medium tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.20)' }}>
                  {m.source}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center">
            <MarketOrbit />
          </div>
        </div>

      </div>
    </section>
  )
}

// ── GO-TO-MARKET ──────────────────────────────────────────────────────

function GoToMarket() {
  const phases = [
    {
      number: '01', timeframe: '0 – 6 mnd', title: 'Developer API',
      desc: 'Vi åpner APIet med en gratis tier og fokuserer på å få norske utviklere til å bygge med Kvad. Målet er å etablere Kvad som standardvalget for norsk tale-AI fra dag én.',
      bullets: [
        'Gratis tier senker adopsjonsbariæren til null',
        'Mål: 50 aktive integrasjoner i løpet av 6 måneder',
        'Tett feedback-loop for rask produktiterasjon',
        'Selly-lansering gir umiddelbar distribusjon til enterprise-kunder',
      ],
    },
    {
      number: '02', timeframe: '6 – 18 mnd', title: 'Vertikal ekspansjon',
      desc: 'Direktesalg mot de vertikalene med høyest ROI på naturlig tale: kundeservice, mediahus og helse. Vi fokuserer på å vinne referansekunder som beviser forretningsverdien.',
      bullets: [
        'Mål: 10 betalende enterprise-kunder i Norge',
        'Partneravtaler med norske digitalbyråer for distribusjon',
        'SLA-avtaler og dedikert onboarding for enterprise',
        'ARR-mål: [FYLL INN] innen måned 18',
      ],
    },
    {
      number: '03', timeframe: '18 – 36 mnd', title: 'Nordisk skalering',
      desc: 'Med norsk posisjon etablert ekspanderer vi til Sverige og Danmark via white-label og partnernettverk. Modellen er skalert, relasjoner er bygd, og Kvad er nordisk standard.',
      bullets: [
        'Sverige og Danmark i år 2 — lokalt tilpassede modeller',
        'White-label for store nordiske aktører',
        'Kvad som defacto-infrastruktur for nordisk enterprise voice AI',
        'Posisjoner for serie A-runde',
      ],
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, #0d0d0d 0%, #030303 100%)' }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pt-20 pb-12 flex flex-col gap-5">
        <Label>Go-to-Market</Label>
        <h2 className="font-bold tracking-tight text-white leading-[1.04]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
        >
          Tre faser mot nordisk markedsledelse.
        </h2>
        <p className="text-[14px] font-light leading-[1.8] max-w-3xl" style={{ color: 'rgba(255,255,255,0.44)' }}>
          Vi starter tett og dypt med norske utviklere, vinner enterprise-referansekunder vertikalt,
          og skalerer deretter nordisk. Alle tre faser er finansiert av denne seed-runden.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pb-20">
        {phases.map((p, i) => (
          <div key={p.number} className="flex gap-8 md:gap-12 py-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
          >
            <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 40 }}>
              <span className="text-[13px] font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.22)' }}>
                {p.number}
              </span>
              <div className="w-px flex-1" style={{ background: i < phases.length - 1 ? 'rgba(255,255,255,0.06)' : 'transparent' }} />
            </div>

            <div className="flex flex-col md:flex-row gap-6 flex-1 md:items-start">
              <div className="flex flex-col gap-3 flex-1">
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 rounded-full self-start"
                  style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  {p.timeframe}
                </span>
                <h3 className="font-bold tracking-tight text-white leading-[1.05]"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
                >
                  {p.title}
                </h3>
                <p className="text-[13.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                  {p.desc}
                </p>
              </div>

              <div className="flex flex-col gap-2.5 flex-shrink-0 md:w-[260px] md:pt-9">
                {p.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}
              </div>
            </div>
          </div>
        ))}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.055)' }} />
      </div>
    </section>
  )
}

// ── FORRETNINGSMODELL ─────────────────────────────────────────────────

function BusinessModel() {
  const tiers = [
    {
      number: '01',
      title: 'API & Usage',
      pricing: 'Pay-as-you-go · per sekund',
      who: 'Utviklere og voksende produkter',
      desc: 'Gratis tier for utviklere, betalt bruk fra første sekund over kvoten. Inntekten skalerer automatisk — jo mer produktet til kunden vokser, jo mer tjener vi.',
      retention: 'Medium',
    },
    {
      number: '02',
      title: 'AI Infrastructure',
      pricing: 'Fast MRR · månedlig abonnement',
      who: 'Bedrifter i produksjon',
      desc: 'Dedikert infrastruktur med SLA og garantert kapasitet. Fast månedlig kontrakt gir forutsigbar ARR og lav churn — disse kundene bytter ikke.',
      retention: 'Høy',
    },
    {
      number: '03',
      title: 'Enterprise Licensing',
      pricing: 'Custom ACV · årskontrakter',
      who: 'Store aktører og mediehus',
      desc: 'White-label og on-premise. Multi-år kontrakter med høy ACV og ekstremt sterke switching costs — kunden bygger produktet sitt på Kvad.',
      retention: 'Svært høy',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #0d0d0d 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Forretningsmodell</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
          >
            Kvad skalerer med hver AI-samtale.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Tre inntektsstrømmer bygget for land-and-expand. Utviklere starter gratis,
            voksende produkter oppgraderer, de største kundene låses inn. Hvert nivå mater det neste.
          </p>
        </div>

        {/* Table header */}
        <div>
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Tier', 'Prising · målgruppe', 'Beskrivelse', 'Retensjon'].map((h) => (
              <span key={h} className={`text-[9px] font-medium tracking-[0.18em] uppercase
                ${h === 'Tier' ? 'col-span-2' : h === 'Prising · målgruppe' ? 'col-span-3' : h === 'Beskrivelse' ? 'col-span-5' : 'col-span-2 text-right'}
              `} style={{ color: 'rgba(255,255,255,0.20)' }}>
                {h}
              </span>
            ))}
          </div>

          {tiers.map((t, i) => (
            <div key={t.number}
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 md:items-start">
                {/* Tier */}
                <div className="md:col-span-2 flex flex-col gap-1">
                  <span className="text-[9px] font-mono tracking-[0.2em]"
                    style={{ color: 'rgba(255,255,255,0.22)' }}>{t.number}</span>
                  <span className="text-[15px] font-semibold tracking-tight"
                    style={{ color: 'rgba(255,255,255,0.90)' }}>{t.title}</span>
                </div>

                {/* Pricing + who */}
                <div className="md:col-span-3 flex flex-col gap-1 md:pt-0.5">
                  <span className="text-[12px] font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {t.pricing}
                  </span>
                  <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    {t.who}
                  </span>
                </div>

                {/* Description */}
                <p className="md:col-span-5 text-[13px] font-light leading-relaxed md:pt-0.5"
                  style={{ color: 'rgba(255,255,255,0.46)' }}>
                  {t.desc}
                </p>

                {/* Retention */}
                <div className="md:col-span-2 flex md:justify-end md:pt-0.5">
                  <span className="text-[11px] font-medium tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {t.retention}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[13px] font-light leading-relaxed max-w-2xl"
          style={{ color: 'rgba(255,255,255,0.26)' }}>
          Infrastrukturselskaper med usage-based pricing vinner nettverkseffekter —
          jo mer kundene bruker, jo dyrere er det å bytte. Kvad er bygget slik fra dag én.
        </p>

      </div>
    </section>
  )
}

// ── TEAM ─────────────────────────────────────────────────────────────

function Team() {
  const founders = [
    {
      name: 'Mamoon Rashid',
      role: 'Medgrunnlegger & President',
      initials: 'MR',
      bio: 'Mamoon leder produkt, distribusjon og go-to-market for Kvad. Han har erfaring med å bygge AI-agentsystemer og conversational products, og forstår samspillet mellom brukerbehov, teknisk arkitektur og kommersiell vekst.',
      focus: [
        'Produkt og brukeropplevelse',
        'Go-to-market og partnerskap',
        'AI-agentarkitektur og sanntids-AI-opplevelser',
      ],
    },
    {
      name: 'Vebjørn',
      role: 'Medgrunnlegger & CEO',
      initials: 'V',
      bio: 'Vebjørn er den tekniske arkitekten bak Kvad-plattformen. Han leder modelltrening, latency-optimering og utviklingen av den nordiske taleinfrastrukturen — og har dyp kompetanse innen real-time talesystemer.',
      focus: [
        'Modelltrening og nordisk taleoptimering',
        'Streaming-arkitektur og latency',
        'Conversational infrastructure og API-design',
      ],
    },
  ]

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <Label>Teamet</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            To grunnleggere. Komplementær kompetanse. Eksakt det som trengs.
          </h2>
          <p className="text-[14px] font-light leading-[1.8] max-w-2xl" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Kvad krever to ting for å lykkes: teknisk dybde i talemodeller og sanntidssystemer,
            og kommersiell evne til å distribuere og skalere. Teamet er bygget rundt nettopp dette.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {founders.map((f) => (
            <div key={f.name} className="flex flex-col gap-6 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#111111] border border-[#1e1e1e] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px] font-bold text-white/20 tracking-tight select-none">
                    {f.initials}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[17px] font-semibold text-white/90 tracking-tight">{f.name}</span>
                  <span className="text-[10.5px] text-white/30 tracking-[0.14em] uppercase font-medium">{f.role}</span>
                </div>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <p className="text-[13.5px] font-light leading-[1.75]" style={{ color: 'rgba(255,255,255,0.52)' }}>
                {f.bio}
              </p>
              <div className="flex flex-col gap-2">
                {f.focus.map((item) => <Bullet key={item}>{item}</Bullet>)}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl" style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
            <span style={{ color: 'rgba(255,255,255,0.60)' }}>Hvorfor vi vinner:</span>{' '}
            De beste stemme-AI-selskapene kombinerer modellkompetanse med sterk markedsforståelse.
            Mamoon og Vebjørn dekker begge dimensjoner — og har allerede etablert relasjoner
            med dataeiere, partnerselskaper og potensielle kunder i det nordiske markedet.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── ASK ──────────────────────────────────────────────────────────────

function Ask() {
  const allocations = [
    {
      number: '01', area: 'Modell & infrastruktur', pct: 45,
      detail: 'Ferdigstille kjernemodellen for norsk conversational AI, skalere treningsdata og bygge produksjonsklar streaming-infrastruktur.',
      bullets: ['Norske og nordiske talemodeller', 'Sanntidsdialog og naturlig samtaleflyt', 'Proprietær conversational data'],
      color: '#38BDF8',
    },
    {
      number: '02', area: 'Skalering av infrastruktur', pct: 30,
      detail: 'Bygge API-distribusjon, latency-optimering og produksjonsinfrastruktur som tåler enterprise-scale.',
      bullets: ['Low-latency streaming', 'Production-grade AI infrastructure', 'API-distribusjon og integrasjoner'],
      color: '#818CF8',
    },
    {
      number: '03', area: 'Salg & enterprise-etablering', pct: 25,
      detail: 'Sikre de første betalende enterprise-kundene, bygge partnernettverk og etablere Kvad som foretrukket infrastruktur.',
      bullets: ['Strategiske piloter og direktesalg', 'Developer og enterprise onboarding', 'Partneravtaler og vekst'],
      color: '#34D399',
    },
  ]

  const milestones = [
    { label: 'Mnd 3', text: 'API i produksjon, Selly lansert, første betalende kunder' },
    { label: 'Mnd 6', text: '50+ aktive integrasjoner, [X] betalende kunder' },
    { label: 'Mnd 12', text: '[X] enterprise-kunder, [ARR] årlig tilbakevendende inntekt' },
    { label: 'Mnd 18', text: 'Posisjon for Serie A eller breakeven i norsk markedet' },
  ]

  return (
    <section className="relative w-full flex items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 44%, #0f0f0f 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col md:flex-row items-start gap-14">
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex flex-col gap-3">
              <Label>Vi søker</Label>
              <div className="flex items-baseline gap-5">
                <h2 className="text-[72px] md:text-[80px] font-bold tracking-tight text-white leading-none">$2M</h2>
                <span className="text-[16px] font-light tracking-wide" style={{ color: 'rgba(255,255,255,0.26)' }}>
                  Seed-runde
                </span>
              </div>
              <p className="text-[14px] font-light leading-[1.8] max-w-lg" style={{ color: 'rgba(255,255,255,0.48)' }}>
                $2M gir oss 18 måneder med full fart: ferdigstille modellen, lansere i markedet,
                sikre de første enterprise-kundene og nå et punkt der veksten er selvforsterkende.
                Alle tre allokeringer er kritiske for å nå dette.
              </p>
            </div>

            <div className="flex flex-col">
              {allocations.map((a, i) => (
                <div key={a.number}>
                  {i > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />}
                  <div className="py-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.16)' }}>
                          {a.number}
                        </span>
                        <h3 className="text-[16px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
                          {a.area}
                        </h3>
                      </div>
                      <span className="text-[22px] font-bold tabular-nums tracking-tight" style={{ color: 'rgba(255,255,255,0.70)' }}>
                        {a.pct}%
                      </span>
                    </div>
                    <p className="text-[12.5px] font-light leading-relaxed ml-6" style={{ color: 'rgba(255,255,255,0.38)' }}>
                      {a.detail}
                    </p>
                    <div className="relative h-[2px] rounded-full overflow-hidden ml-6"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${a.pct}%`, background: a.color }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 ml-6">
                      {a.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:w-[280px] flex-shrink-0">
            <div className="flex flex-col gap-4 p-6 rounded-2xl"
              style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                Milepæler
              </span>
              <div className="flex flex-col gap-4">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[10px] font-mono tracking-wide flex-shrink-0 pt-0.5"
                      style={{ color: 'rgba(255,255,255,0.25)', minWidth: 44 }}>
                      {m.label}
                    </span>
                    <p className="text-[12px] font-light leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 rounded-2xl"
              style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                Kontakt
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Mamoon Rashid
                </span>
                <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  Grunnlegger & President, Kvad
                </span>
              </div>
              <a href="mailto:mamoon@kvad.no"
                className="text-[12px] font-mono hover:text-white/50 transition-colors"
                style={{ color: 'rgba(255,255,255,0.28)' }}>
                mamoon@kvad.no
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── CLOSING ───────────────────────────────────────────────────────────

function Closing() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] py-28 md:py-40 px-8 text-center">
      <WaveformBg opacity={0.025} speed={0.5} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, #0c0c0c 0%, #030303 100%)' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        <Image src="/kvad-icon.svg" alt="Kvad" width={40} height={40} style={{ opacity: 0.35 }} />
        <h2 className="font-bold tracking-tight text-white leading-[1.05]"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          Norsk AI trenger en stemme.<br />Vi bygger den.
        </h2>
        <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.38)' }}>
          Infrastrukturlaget for norsk tale-AI finnes ikke ennå. Kvad bygger det —
          med de rette menneskene, de rette dataene og den rette timingen.
          Vi inviterer deg med på den reisen.
        </p>
        <div className="flex flex-col items-center gap-2 pt-4">
          <a href="mailto:mamoon@kvad.no"
            className="text-[13px] font-mono hover:text-white/60 transition-colors"
            style={{ color: 'rgba(255,255,255,0.30)' }}>
            mamoon@kvad.no
          </a>
          <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.16)' }}>
            kvad.no
          </span>
        </div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <div className="fixed top-7 left-8 z-50 pointer-events-none">
        <Image src="/kvad-icon.svg" alt="Kvad" width={22} height={22} style={{ opacity: 0.30 }} />
      </div>
      <Cover />
      <Divider />
      <ExecutiveSummary />
      <Divider />
      <Problem />
      <Divider />
      <WhyNow />
      <Divider />
      <Solution />
      <Divider />
      <Traction />
      <Divider />
      <WhyKvad />
      <Divider />
      <Market />
      <Divider />
      <GoToMarket />
      <Divider />
      <BusinessModel />
      <Divider />
      <Team />
      <Divider />
      <Ask />
      <Divider />
      <Closing />
    </div>
  )
}
