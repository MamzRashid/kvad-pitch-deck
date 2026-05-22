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

// ── COVER ────────────────────────────────────────────────────────────

function Cover() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] py-32 md:py-40 px-8 text-center">
      <WaveformBg opacity={0.035} speed={0.6} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #030303 100%)' }}
      />
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        <Image src="/kvad-logo.svg" alt="Kvad" width={380} height={86} priority style={{ opacity: 0.92 }} />
        <p className="text-[14px] font-light text-white/50 tracking-[0.14em] uppercase">
          Infrastruktur for menneskelig AI-kommunikasjon.
        </p>
        <div className="w-px h-8 bg-white/8" />
        <p className="text-[14px] md:text-[15px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)' }}>
          Kvad bygger stemmelaget for norsk og nordisk AI — en API som gir utviklere og
          bedrifter tilgang til naturlig norsk tale med sanntidsrespons og menneskelig kvalitet.
        </p>
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
        <div className="flex flex-col gap-4">
          <Label>Problemet</Label>
          <h2 className="text-[42px] md:text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            AI høres fortsatt ikke<br />menneskelig ut.
          </h2>
          <p className="text-[14px] font-light leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Generiske tale-modeller er trenet på engelske datasett og oversatt til norsk i ettertid.
            Resultatet bryter ned tillit til AI-drevne produkter blant norske brukere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              AI-stemme i dag
            </span>
            <AudioPlayerInline label="DEMO" accent="rgba(255,255,255,0.40)" />
            <div className="flex flex-col gap-2">
              {['Robotaktig tale', 'Høy forsinkelse', 'Unaturlig samtaleflyt'].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/40 flex-shrink-0" />
                  <span className="text-[13px] text-white/72 font-light">{p}</span>
                </div>
              ))}
            </div>
            <Divider />
            <div className="flex flex-col gap-2.5">
              <Bullet>Forsinkelse på 300–800ms ødelegger naturlig samtaleflyt</Bullet>
              <Bullet>Trenet på studioopplesning — mangler norsk rytme og intonasjon</Bullet>
              <Bullet>Norske brukere har lavere toleranse for unaturlig tale</Bullet>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Menneskelig stemme
            </span>
            <AudioPlayerInline label="KVAD" accent="rgba(255,255,255,0.70)" />
            <div className="flex flex-col gap-2">
              {['Naturlig tempo', 'Sanntidssvar', 'Flytende samtale'].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-[3px] h-[3px] rounded-full bg-white/55 flex-shrink-0" />
                  <span className="text-[13px] text-white/82 font-light">{p}</span>
                </div>
              ))}
            </div>
            <Divider />
            <div className="flex flex-col gap-2.5">
              <Bullet>Emosjonell intonasjon og naturlige pauser bygger tillit</Bullet>
              <Bullet>Norsk rytme og prosodi som norske brukere kjenner igjen</Bullet>
              <Bullet>Dette er standarden Kvad leverer — via API</Bullet>
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
      number: '01', title: 'AI-agenter er allerede her.',
      desc: 'Norske bedrifter implementerer AI i kundedialog og salg raskere enn forventet.',
    },
    {
      number: '02', title: 'Norsk tale-AI henger etter.',
      desc: 'Infrastrukturen for naturlig norsk tale eksisterer ikke — bedriftene mangler noe å bygge på.',
    },
    {
      number: '03', title: 'Norsk tale-AI er uferdig.',
      desc: 'Eksisterende løsninger mangler den samtaleflyt og prosodien norske brukere krever.',
    },
    {
      number: '04', title: 'Kvad bygger fundamentet.',
      desc: 'Vinduet for å etablere seg som standardlaget er åpent nå — men lukkes raskt.',
    },
  ]

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <WaveformBg opacity={0.022} speed={0.35} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 42%, #0c0c0c 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-5 max-w-3xl">
          <Label>Hvorfor nå</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Conversational AI eksploderer.<br />Infrastrukturen henger etter.
          </h2>
        </div>

        <div className="w-full flex flex-col md:flex-row">
          {statements.map((s, i) => (
            <div key={s.number} className="flex flex-1 items-start">
              <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
              <div className="flex flex-col gap-3 px-8 py-4 text-left">
                <span className="text-[9px] font-mono tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  {s.number}
                </span>
                <p className="text-[18px] font-semibold leading-snug tracking-[-0.02em]"
                  style={{ color: 'rgba(255,255,255,0.92)' }}
                >
                  {s.title}
                </p>
                <p className="text-[12.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {s.desc}
                </p>
              </div>
              {i === statements.length - 1 && (
                <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── LØSNINGEN ────────────────────────────────────────────────────────

function Solution() {
  const sections = [
    {
      number: '01', title: 'Menneskelig tale',
      body: 'Naturlig rytme, emosjonell flyt og samtalevennlig levering.',
      detail: 'Trent på ekte norske samtaler — ikke studioopplesning. Modellen modulerer tempo, pauser og emosjonell troverdighet.',
    },
    {
      number: '02', title: 'Sanntidsrespons',
      body: 'Optimalisert for live samtaler med ultra-lav forsinkelse.',
      detail: 'Streaming-arkitektur som genererer og leverer tale mens setningen formuleres. Under 200ms ende-til-ende.',
    },
    {
      number: '03', title: 'Skalerbar stemmeinfrastruktur',
      body: 'Produksjonsklar API som skalerer med produktet.',
      detail: 'Fungerer på alle plattformer, fra prototype til enterprise. Noen linjer kode er alt som trengs for å komme i gang.',
    },
  ]

  return (
    <section className="relative w-full flex items-center bg-[#030303] px-8 py-20 md:py-28">
      <WaveformBg opacity={0.02} speed={0.3} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 75% 65% at 50% 40%, #0d0d0d 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-5">
          <Label>Løsningen</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.02] max-w-3xl"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
          >
            Kvad gjør det mulig for AI å kommunisere naturlig i sanntid.
          </h2>
        </div>

        <div className="flex flex-col">
          {sections.map((s, i) => (
            <div key={s.number}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-20 py-8">
                <div className="flex items-baseline gap-5 flex-shrink-0 md:w-[260px]">
                  <span className="text-[9px] font-mono text-white/18 tracking-[0.2em]">{s.number}</span>
                  <h3 className="text-[20px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.88)' }}>
                    {s.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[13.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
                    {s.body}
                  </p>
                  <p className="text-[12.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {s.detail}
                  </p>
                </div>
              </div>
              {i === sections.length - 1 && (
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              )}
            </div>
          ))}
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
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">

        {/* Left — text */}
        <div className="flex flex-col gap-6 md:w-[42%] flex-shrink-0">
          <Label>Tidlig etterspørsel</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.2vw, 38px)' }}
          >
            AI-systemer er allerede klare for naturlig norsk tale.
          </h2>
          <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
            Selly har i over ett år slitt med å lansere fordi ingen norsk TTS høres menneskelig nok ut. De har allerede interesse fra store selskaper som vil benytte tjenesten — men har ikke gått ut i markedet ennå. Kvad er blokkeren som fjernes.
          </p>
          <div className="flex flex-col gap-2.5">
            <Bullet>Selly: klar til lansering — venter kun på Kvad</Bullet>
            <Bullet>Store selskaper har allerede vist interesse for Sellys tjeneste</Bullet>
            <Bullet>Ingen av dem har gått ut i markedet ennå</Bullet>
          </div>
        </div>

        {/* Right — pyramid */}
        <div className="flex flex-col items-center flex-1 py-4">
          {/* Kvad */}
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

          {/* Selly */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full bg-black"
              style={{ width: 84, height: 84, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Image src="/selly-logo-white.svg" alt="Selly" width={48} height={18} style={{ opacity: 0.82 }} />
            </div>
            <span className="text-[9px] tracking-[0.18em] uppercase font-medium mt-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Selly — Venter på Kvad.</span>
          </div>

          <TBranchConnector />

          {/* Customers */}
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

      </div>
    </section>
  )
}

// ── KONKURRANSEFORTRINN ───────────────────────────────────────────────

function WhyKvad() {
  const moats = [
    {
      number: '01', title: 'Bygget på data ingen andre har tilgang til', tag: 'Datafortrinn',
      desc: 'Flere hundre timer segmentert norsk tale — ikke studioopplesning, men naturlig samtale.',
      detail: 'Historiske samtaledata kan ikke gjenskapes. Konkurrenter må starte fra scratch.',
    },
    {
      number: '02', title: 'Samtalerytme og prosodi', tag: 'Modellfortrinn',
      desc: 'Trent på pauser, tempo, trykk og emosjonell flyt. Ikke bare ord — men hvordan de sies.',
      detail: 'Modellen forstår kontekst og modulerer deretter — ingen global modell gjør dette for norsk.',
    },
    {
      number: '03', title: 'Eksklusivt råmateriale fra norske podcastere', tag: 'Innholdsfortrinn',
      desc: 'Direkte avtaler med norske podcastere gir oss tilgang til autentiske samtaler.',
      detail: 'Utilgjengelig for konkurrenter — vi eier relasjonene og datarettighetene.',
    },
    {
      number: '04', title: 'Internt podcastrom for norsk taleinnsamling', tag: 'Produksjonsfortrinn',
      desc: 'Eget opptaksrom lar teamet produsere treningsdata løpende.',
      detail: 'Vi kontrollerer dataproduksjonen helt — kvalitet og volum styres internt.',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-0">
        <div className="flex flex-col gap-6 md:pr-14 flex-shrink-0 md:w-[42%] md:justify-center">
          <Label>Konkurransefortrinn</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.03]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
          >
            Norsk conversational AI krever noe globale modeller ikke har.
          </h2>
          <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)', maxWidth: 320 }}>
            Generiske stemme-modeller er brede. Kvad er dypt optimalisert — trent på norsk rytme,
            norske pauser og norsk samtaleflyt. Fire fortrinn som forsterker hverandre.
          </p>
        </div>

        <div className="hidden md:block flex-shrink-0 self-stretch"
          style={{ width: '1px', background: 'rgba(255,255,255,0.06)', margin: '0' }}
        />

        <div className="flex flex-col flex-1 md:pl-14">
          {moats.map((m, i) => (
            <div key={m.number}>
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <div className="flex items-start gap-8 py-6">
                <span className="text-[9px] font-mono tracking-[0.2em] flex-shrink-0 w-5 pt-1"
                  style={{ color: 'rgba(255,255,255,0.20)' }}
                >
                  {m.number}
                </span>
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <h3 className="text-[15px] font-semibold tracking-tight leading-snug"
                      style={{ color: 'rgba(255,255,255,0.90)' }}
                    >
                      {m.title}
                    </h3>
                    <span className="text-[9px] font-medium tracking-[0.14em] uppercase px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ color: 'rgba(255,255,255,0.40)', border: '1px solid rgba(255,255,255,0.09)' }}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <p className="text-[12px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
                    {m.desc}
                  </p>
                  <p className="text-[11.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.30)' }}>
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
  { label: 'Mediahus',    sub: 'Nyheter & innhold' },
  { label: 'Utdanning',   sub: 'Læringsverktøy' },
  { label: 'Finans',      sub: 'Rådgivning & service' },
  { label: 'Booking',     sub: 'Reservasjon & service' },
  { label: 'Helse',       sub: 'Pasientdialog' },
  { label: 'Kundeservice',sub: 'Live support' },
  { label: 'Restauranter',sub: 'Bestilling & hjelp' },
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
    <svg viewBox={`0 0 ${M_VW} ${M_VH}`} style={{ width: '100%', maxWidth: 500, height: 'auto' }}>
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

function Market() {
  const signals = [
    { stat: '$47B', text: 'global voice AI-markedsverdi innen 2029', source: 'MarketsandMarkets' },
    { stat: '4 mrd', text: 'samtaler håndtert av AI daglig globalt i 2024', source: 'Gartner' },
    { stat: '40%', text: 'av kundeservice-interaksjoner håndteres av AI innen 2025', source: 'Gartner' },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Left — text + signals */}
        <div className="flex flex-col gap-8 md:w-[42%] flex-shrink-0">
          <div className="flex flex-col gap-5">
            <Label>Markedsmulighet</Label>
            <h2 className="font-bold tracking-tight text-white leading-[1.04]"
              style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
            >
              Norden beveger seg mot conversational AI.
            </h2>
            <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
              Voice AI er et av de raskest voksende segmentene innen enterprise-teknologi.
              Kvad er infrastrukturlaget for norsk og nordisk tale — på tvers av alle bransjer.
            </p>
          </div>
          <div className="flex flex-col">
            {signals.map((s, i) => (
              <div key={i}>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                <div className="flex items-center gap-5 py-4">
                  <span className="font-bold tracking-tight text-white flex-shrink-0"
                    style={{ fontSize: 26, lineHeight: 1, minWidth: 72 }}
                  >{s.stat}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-light" style={{ color: 'rgba(255,255,255,0.88)' }}>{s.text}</span>
                    <span className="text-[9px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.source}</span>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </div>

        {/* Right — orbit diagram */}
        <div className="flex-1 flex items-center justify-center">
          <MarketOrbit />
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
      desc: 'Åpent API med gratis tier for å senke adopsjonsbariæren.',
      bullets: ['Gratis tier senker terskel', 'Enkel API-dokumentasjon og SDK', 'Mål: 50 aktive integrasjoner', 'Feedback-loop for produktutvikling'],
    },
    {
      number: '02', timeframe: '6 – 18 mnd', title: 'Vertikal ekspansjon',
      desc: 'Direktesalg mot kundeservice, mediahus og helse i Norge.',
      bullets: ['10 betalende enterprise-kunder', 'Partneravtaler med digitalbyrå', 'SLA-avtaler og dedikert onboarding', 'Fokus: media & kundeservice'],
    },
    {
      number: '03', timeframe: '18 – 36 mnd', title: 'Nordisk skalering',
      desc: 'Ekspansjon til Sverige og Danmark via white-label og partnernettverk.',
      bullets: ['Sverige og Danmark i år 2', 'White-label for store aktører', 'Lokalt tilpassede modeller', 'Nordic voice infrastructure standard'],
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 50%, #0d0d0d 0%, #030303 100%)' }}
      />

      {/* Header */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pt-20 pb-12 flex flex-col gap-4">
        <Label>Go-to-Market</Label>
        <h2 className="font-bold tracking-tight text-white leading-[1.04]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
        >
          Tre faser mot nordisk markedsledelse.
        </h2>
      </div>

      {/* Phases */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pb-20">
        {phases.map((p, i) => (
          <div key={p.number} className="flex gap-8 md:gap-12 py-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.055)' }}
          >
            {/* Left — number + timeline dot */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0" style={{ width: 40 }}>
              <span className="text-[13px] font-bold tabular-nums" style={{ color: 'rgba(255,255,255,0.22)' }}>
                {p.number}
              </span>
              <div className="w-px flex-1" style={{ background: i < phases.length - 1 ? 'rgba(255,255,255,0.06)' : 'transparent' }} />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-6 flex-1 md:items-start">
              {/* Title block */}
              <div className="flex flex-col gap-3 flex-1">
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase px-2.5 py-1 rounded-full self-start"
                  style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  {p.timeframe}
                </span>
                <h3 className="font-bold tracking-tight text-white leading-[1.05]"
                  style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}
                >
                  {p.title}
                </h3>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.40)' }}>
                  {p.desc}
                </p>
              </div>

              {/* Bullets block */}
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
  const models = [
    {
      number: '01', title: 'API & Usage', hook: 'per/sek', tag: 'Betal per samtale',
      desc: 'AI-systemer kaller Kvad per sekund. Jo mer de bruker, jo mer tjener vi.',
      bullets: ['Fakturering per sekund', 'Streaming og sanntidsdialog', 'Gratis tier for utviklere', 'Volumrabatter'],
    },
    {
      number: '02', title: 'AI Infrastructure', hook: 'fast/mnd', tag: 'Månedlig abonnement',
      desc: 'Bedrifter betaler fast månedlig for dedikert infrastruktur med høy retensjon.',
      bullets: ['Dedikerte deployments', 'SLA-støttet oppetid 99.9%', 'Volumbasert prising', 'Prioritert support'],
    },
    {
      number: '03', title: 'Enterprise Licensing', hook: 'custom', tag: 'Egendefinerte kontrakter',
      desc: 'Store aktører lisenserer Kvad som eget stemmelag — white-label og on-premise.',
      bullets: ['Egendefinerte stemmemodeller', 'On-premise integrasjoner', 'White-label distribusjon', 'Årskontrakter med høy ACV'],
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #0d0d0d 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-4">
          <Label>Forretningsmodell</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
          >
            Kvad skalerer med hver AI-samtale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {models.map((m, i) => (
            <div key={m.number} className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Top half — hook + title */}
              <div className="flex flex-col gap-4 p-7 pb-6">
                <div className="flex items-start justify-between">
                  <span className="text-[9px] font-mono tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    {m.number}
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                    style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {m.tag}
                  </span>
                </div>

                {/* Big hook — the pricing "hook" */}
                <div className="py-4">
                  <span className="font-bold tracking-tight text-white select-none"
                    style={{ fontSize: 'clamp(36px, 4vw, 52px)', opacity: 0.12, letterSpacing: '-0.04em' }}
                  >
                    {m.hook}
                  </span>
                </div>

                <h3 className="text-[20px] font-bold tracking-tight text-white leading-tight">
                  {m.title}
                </h3>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />

              {/* Bottom half — desc + bullets */}
              <div className="flex flex-col gap-4 p-7 pt-6 flex-1">
                <p className="text-[12.5px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {m.desc}
                </p>
                <div className="flex flex-col gap-2 mt-auto pt-2">
                  {m.bullets.map((b) => <Bullet key={b}>{b}</Bullet>)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

// ── TEAM ─────────────────────────────────────────────────────────────

function Team() {
  const founders = [
    {
      name: 'Mamoon Rashid', role: 'Medgrunnlegger & President',
      focus: 'AI-agentsystemer og conversational products',
      detail: 'Produkt, distribusjon og sanntids-AI-opplevelser. Bygger brukeropplevelser og go-to-market for Kvad.',
    },
    {
      name: 'Vebjørn', role: 'Medgrunnlegger & CEO',
      focus: 'Real-time talesystemer og nordiske talemodeller',
      detail: 'Modelltrening, latency-optimering og conversational infrastructure. Teknisk arkitekt bak Kvad-plattformen.',
    },
  ]

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-12 items-center text-center">
        <div className="flex flex-col gap-3">
          <Label>Teamet</Label>
          <h2 className="text-[42px] md:text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            Grunnleggerne.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {founders.map((f) => (
            <div key={f.name} className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl text-left">
              <div className="w-full rounded-xl bg-[#111111] border border-[#1e1e1e] flex items-center justify-center" style={{ height: 120 }}>
                <span className="text-[42px] font-bold text-white/8 tracking-tight select-none">
                  {f.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[17px] font-semibold text-white/88 tracking-tight">{f.name}</span>
                <span className="text-[10.5px] text-white/30 tracking-[0.14em] uppercase font-medium">{f.role}</span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <p className="text-[13px] text-white/45 leading-relaxed">{f.focus}.</p>
              <p className="text-[12px] text-white/30 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-white/20 tracking-wide font-light">
          Bygger stemmelaget for neste generasjon AI-systemer.
        </p>
      </div>
    </section>
  )
}

// ── ASK ──────────────────────────────────────────────────────────────

function Ask() {
  const allocations = [
    {
      number: '01', area: 'Bygge Nordens conversational AI-lag', pct: 45,
      bullets: ['Norske og nordiske talemodeller', 'Sanntidsdialog og naturlig samtaleflyt', 'Proprietær conversational data'],
      color: '#38BDF8',
    },
    {
      number: '02', area: 'Skalere conversational infrastructure', pct: 30,
      bullets: ['Low-latency streaming', 'Production-grade AI infrastructure', 'API-distribusjon og integrasjoner'],
      color: '#818CF8',
    },
    {
      number: '03', area: 'Etablere Kvad i enterprise-markedet', pct: 25,
      bullets: ['Strategiske piloter og distribusjon', 'Developer og enterprise onboarding', 'Partneravtaler og vekst'],
      color: '#34D399',
    },
  ]

  return (
    <section className="relative w-full flex items-center justify-center bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 44%, #0f0f0f 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-14">
        <div className="flex flex-col gap-7 flex-1">
          <div className="flex flex-col gap-3">
            <Label>Vi søker</Label>
            <div className="flex items-baseline gap-5">
              <h2 className="text-[72px] md:text-[80px] font-bold tracking-tight text-white leading-none">$2M</h2>
              <span className="text-[16px] font-light tracking-wide" style={{ color: 'rgba(255,255,255,0.26)' }}>
                Seed-runde
              </span>
            </div>
            <p className="text-[13px] font-light leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
              For å ferdigstille kjerneinfrastrukturen, skalere treningsdata og etablere
              de første betalende kundene i norsk enterprise-markedet.
            </p>
          </div>

          <div className="flex flex-col">
            {allocations.map((a, i) => (
              <div key={a.number}>
                {i > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />}
                <div className="py-5 flex flex-col gap-2.5">
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

        <div className="flex flex-col gap-4 flex-shrink-0 md:pt-24">
          <div className="w-8 h-px" style={{ background: 'rgba(255,255,255,0.10)' }} />
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Mamoon Rashid
            </span>
            <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.30)' }}>
              Grunnlegger & President, Kvad
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <a href="mailto:mamoon@kvad.no" className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.22)' }}>
              mamoon@kvad.no
            </a>
          </div>
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
    </div>
  )
}
