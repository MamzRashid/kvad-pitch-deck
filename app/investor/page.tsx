'use client'

import Image from 'next/image'
import WaveformBg from '@/components/WaveformBg'
import AudioPlayerInline from '@/components/AudioPlayerInline'
import { motion } from 'framer-motion'

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
            Infrastructure for natural Norwegian speech
          </p>
          <div className="w-px h-6 bg-white/8" />
          <p className="text-[15px] md:text-[16px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.48)' }}>
            Kvad is building the missing voice layer in Norwegian AI infrastructure: an API that gives
            companies and developers access to natural Norwegian speech with real-time response and
            human quality. Think Twilio for the Norwegian voice.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-2">
          <p className="text-[12px] font-light" style={{ color: 'rgba(255,255,255,0.22)' }}>
            This document is confidential and intended only for prospective investors.
          </p>
          <p className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.14)' }}>
            Questions? mamoon@kvad.no
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
      label: 'The problem',
      text: 'AI voice agents sound robotic in Norwegian. Norwegian users reject them, and the companies building them have no good solution.',
    },
    {
      label: 'The solution',
      text: 'Kvad is an API for natural Norwegian speech in real time. Companies integrate with a few lines of code and get human voice quality out of the box.',
    },
    {
      label: 'The market',
      text: 'Text-to-speech is a $7.6B global market by 2029 (MarketsandMarkets). We estimate a Nordic SAM of $135M, and target a SOM of $4M: 10% of the $39M Norwegian market. Kvad is positioning itself as the standard infrastructure for Norwegian speech AI.',
    },
    {
      label: 'Traction',
      text: 'Selly, an AI sales agent with interest from large Norwegian companies, is ready to launch but blocked by the lack of Norwegian TTS quality. Kvad is the solution.',
    },
    {
      label: 'The team',
      text: 'Mamoon Rashid (Product & distribution) and Vebjørn (Model training & technical architect). Their skills hit the core of what it takes to succeed.',
    },
    {
      label: 'The ask',
      text: 'NOK 6.5M pre-seed, 18 months of runway, to complete the core infrastructure, scale training data and secure the first paying enterprise customers.',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-16 md:py-20">
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Label>Summary</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3vw, 38px)' }}>
            Kvad in one minute.
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
          <Label>The problem</Label>
          <h2 className="text-[42px] md:text-[52px] font-bold tracking-tight text-white leading-[1.05]">
            AI still doesn&apos;t sound<br />human in Norwegian.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Global speech models are trained on English datasets and adapted to Norwegian afterwards. The result is
            stiff, inhuman speech that Norwegian users instantly recognize and reject. Norwegian
            companies that want to build AI agents, callbots and voice products don&apos;t have a good enough
            foundation to build on, and they know it.
          </p>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.36)' }}>
            This isn&apos;t a convenience problem. Latency of 300–800ms and unnatural intonation
            destroy trust in customer dialogue, support and sales. For companies competing on
            customer experience, this is a blocker, not a &quot;nice to have&quot;.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Generic AI voice today
            </span>
            <AudioPlayerInline label="DEMO" accent="rgba(255,255,255,0.40)" src="/audio/ai-demo.mp3" />
            <div className="flex flex-col gap-3 mt-1">
              <Bullet>300–800ms latency breaks natural conversation flow</Bullet>
              <Bullet>Trained on studio reads, lacks Norwegian rhythm and intonation</Bullet>
              <Bullet>Norwegian users have lower tolerance for robotic speech than, for example, English-speaking markets</Bullet>
              <Bullet>No existing solution is built specifically for Norwegian conversational AI</Bullet>
            </div>
          </div>

          <div className="flex flex-col gap-5 p-7 bg-[#0c0c0c] border border-[#181818] rounded-2xl">
            <span className="text-[10.5px] tracking-[0.18em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Kvad voice
            </span>
            <AudioPlayerInline label="KVAD" accent="rgba(255,255,255,0.70)" src="/audio/demo01.wav" />
            <div className="flex flex-col gap-3 mt-1">
              <Bullet>Trained on Norwegian conversations, not studio reads. Natural rhythm and intonation</Bullet>
              <Bullet>Under 200ms end-to-end latency, true real-time dialogue</Bullet>
              <Bullet>Emotional credibility and natural pauses that build trust</Bullet>
              <Bullet>API-first, integrates into existing systems with a few lines of code</Bullet>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── WHY NOW ─────────────────────────────────────────────────────────

function WhyNow() {
  const statements = [
    {
      number: '01',
      title: 'AI agents are waiting for a human voice.',
      desc: 'The next generation of AI agents is being built. They lack one thing to be accepted by Norwegian users: a voice that sounds human.',
    },
    {
      number: '02',
      title: 'Voice actors are expensive and slow.',
      desc: 'Norwegian content production, dubbing and audiobooks depend on voice actors. It is expensive, slow and doesn\'t scale. TTS is the answer, but the quality isn\'t good enough.',
    },
    {
      number: '03',
      title: 'The market is ready. The infrastructure isn\'t.',
      desc: 'Media houses, publishers, the public sector and tech companies are ready to adopt Norwegian speech AI. What\'s missing is the infrastructure that makes it possible.',
    },
    {
      number: '04',
      title: 'We have the data. We have the team. We have the timing.',
      desc: 'Kvad already has access to training data no one else has, a team with the right skills, and is in position before the big players prioritize the Nordics.',
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
          <Label>Why now</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
          >
            Voice AI is exploding.<br />Norwegian speech quality lags behind.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            The timing isn&apos;t a coincidence. Four converging forces make this the right moment
            for Kvad, and we are already in position.
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

// ── SOLUTION ────────────────────────────────────────────────────────

function Solution() {
  const sections = [
    {
      number: '01',
      title: 'Human-like speech',
      body: 'Natural rhythm, emotional flow and conversational delivery, not studio reads.',
      detail: 'Trained on real Norwegian conversations with pauses, shifts in tone and emotional variation. The model modulates tone and pace in context, something no global model does for Norwegian today.',
    },
    {
      number: '02',
      title: 'Real-time response',
      body: 'Optimized for live conversations with under 200ms end-to-end latency.',
      detail: 'Streaming architecture that generates and delivers speech while the sentence is being formed. This isn\'t batch TTS. It\'s conversational infrastructure built for agents that must respond instantly.',
    },
    {
      number: '03',
      title: 'API-first infrastructure',
      body: 'Production-ready API that integrates in minutes and scales to enterprise.',
      detail: 'Works on every platform, from prototype to production. A free developer tier lowers the adoption barrier. Enterprise customers get dedicated deployments with SLA and priority support.',
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
          <Label>The solution</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)' }}
          >
            Kvad is the voice behind Norwegian speech AI.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Three things must work simultaneously for Norwegian speech AI to be acceptable in
            production. Kvad is built around all three.
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

// ── TRACTION ─────────────────────────────────────────────────────────

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
          <Label>Early demand</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.2vw, 42px)' }}
          >
            The demand is real. The voice is missing.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Selly is a Norwegian AI sales agent that has been ready to launch for over a year.
            The problem is that no Norwegian TTS solution is good enough for Norwegian end users
            to accept it. Selly already has interest from large Norwegian companies that want to
            use the service, but hasn&apos;t gone to market because the voice isn&apos;t good enough.
          </p>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.36)' }}>
            Kvad removes the blocker. When Selly launches with Kvad, we get immediate
            exposure to the five customers in the diagram below: companies that are already
            interested and waiting. This isn&apos;t hypothetical future demand.
            It&apos;s concrete, pent-up demand that Kvad unlocks on day one.
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
              <span className="text-[9px] tracking-[0.18em] uppercase font-medium mt-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Infrastructure layer</span>
            </div>

            <TFlowLine height={40} />

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black"
                style={{ width: 84, height: 84, border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Image src="/selly-logo-white.svg" alt="Selly" width={48} height={18} style={{ opacity: 0.82 }} />
              </div>
              <span className="text-[9px] tracking-[0.18em] uppercase font-medium mt-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>Selly: waiting for Kvad</span>
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
              Converts once the voice sounds human
            </p>
          </div>

          <div className="flex flex-col gap-5 md:w-[38%] flex-shrink-0">
            <div className="flex flex-col gap-3 p-6 rounded-2xl"
              style={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                What this means
              </span>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Selly is one example of a broader pattern: Norwegian AI product companies are ready to launch voice features but are blocked by missing infrastructure.
              </p>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                Kvad is positioning itself as the solution this entire segment is waiting for. It isn&apos;t just one customer. It&apos;s a new product category being unlocked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── COMPETITIVE EDGE ────────────────────────────────────────────────

function WhyKvad() {
  const moats = [
    {
      number: '01', title: 'Built on data no one else has access to', tag: 'Data advantage',
      desc: 'Hundreds of hours of segmented Norwegian speech. Not studio reads, but authentic conversations with natural rhythm, pauses and emotional variation.',
      detail: 'Historical conversation data can\'t be recreated on demand. Competitors entering this market today must start from zero and wait years for comparable volume and quality.',
    },
    {
      number: '02', title: 'Conversational rhythm and prosody as a core competency', tag: 'Model advantage',
      desc: 'We don\'t just train on what is said, but on how it is said. Pace, stress, pauses and emotional flow are explicitly modeled.',
      detail: 'Global TTS is optimized for breadth. Kvad is deeply optimized for Norwegian conversational AI. No global player will do this work for a market of 5 million people.',
    },
    {
      number: '03', title: 'Exclusive raw material from Norwegian podcasters', tag: 'Content advantage',
      desc: 'Direct agreements with Norwegian podcasters give us access to authentic conversation recordings with rights cleared for model training.',
      detail: 'These relationships and rights are unavailable to competitors. The data isn\'t scraped. It is exclusively licensed.',
    },
    {
      number: '04', title: 'In-house production of speech data', tag: 'Production advantage',
      desc: 'Our own recording room lets the team produce training data continuously, with full control over quality, format and volume.',
      detail: 'We don\'t depend on third parties for data production. That means faster iteration and consistent data quality over time.',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 30% 50%, #0e0e0e 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-0">
        <div className="flex flex-col gap-6 md:pr-14 flex-shrink-0 md:w-[42%] md:justify-center">
          <Label>Why Kvad</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.03]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
          >
            Big players optimize for the world. We optimize for the Nordics.
          </h2>
          <p className="text-[13.5px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Generic voice models are broad. Kvad is deeply optimized: trained on Norwegian rhythm,
            Norwegian pauses and Norwegian conversational flow. Four advantages that reinforce each other over time
            and build a moat that gets harder to cross every month we operate.
          </p>
          <p className="text-[13px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.28)' }}>
            ElevenLabs, Google and Microsoft offer Norwegian TTS, but they aren&apos;t built for Norwegian conversational AI.
            It&apos;s the difference between reading a text aloud and holding a natural dialogue.
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

// ── MARKET ───────────────────────────────────────────────────────────

const M_NODES = [
  { label: 'Media',        sub: 'News reading & radio' },
  { label: 'Public sector', sub: 'Agencies & municipalities' },
  { label: 'Finance',      sub: 'Advisory & service' },
  { label: 'Content',      sub: 'Audiobooks, podcasts & e-learning' },
  { label: 'Dubbing',      sub: 'Film & TV' },
  { label: 'Customer service', sub: 'Live support' },
  { label: 'AI agents',    sub: 'Conversation & automation' },
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
    desc: 'Global text-to-speech market by 2029',
    value: '$7.6B',
    bar: 1.0,
    source: 'Source: MarketsandMarkets',
    color: 'rgba(255,255,255,0.55)',
  },
  {
    label: 'SAM',
    desc: 'Nordic text-to-speech market by 2029',
    value: '$135M',
    bar: 0.13,
    source: '1.8% of TAM, the Nordic share of world GDP',
    color: 'rgba(255,255,255,0.36)',
  },
  {
    label: 'SOM',
    desc: 'Kvad target share by 2029',
    value: '$4M',
    bar: 0.05,
    source: '10% of Norway ($39M, 0.51% of TAM)',
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
          <Label>Market opportunity</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
          >
            Text-to-speech is a billion-dollar market. Norwegian has no leader.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.50)' }}>
            Voice AI is one of the fastest-growing segments in enterprise technology globally.
            Kvad addresses the Nordic part of this market: a segment that today has no
            dedicated infrastructure for natural conversational AI.
          </p>
          <p className="text-[13.5px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.34)' }}>
            It isn&apos;t just one market. Kvad is horizontal infrastructure. Media, finance,
            healthcare, booking, customer service: all of them need natural Norwegian speech AI.
            The infrastructure layer wins across every vertical.
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
                <span className="text-[10.5px] font-normal tracking-wide leading-snug"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
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
      number: '01', timeframe: '0 – 6 months', title: 'Developer API',
      desc: 'We open the API with a free tier and focus on getting Norwegian developers to build with Kvad. The goal is to establish Kvad as the default choice for Norwegian speech AI from day one.',
      bullets: [
        'Free tier lowers the adoption barrier to zero',
        'Goal: 50 active integrations within 6 months',
        'Tight feedback loop for fast product iteration',
        'Selly launch gives immediate distribution to enterprise customers',
      ],
    },
    {
      number: '02', timeframe: '6 – 18 months', title: 'Vertical expansion',
      desc: 'Direct sales to the verticals with the highest ROI on natural speech: customer service, media and healthcare. We focus on winning reference customers that prove the business value.',
      bullets: [
        'Goal: 10 paying enterprise customers in Norway',
        'Partnerships with Norwegian digital agencies for distribution',
        'SLA agreements and dedicated enterprise onboarding',
        'ARR target: [FILL IN] by month 18',
      ],
    },
    {
      number: '03', timeframe: '18 – 36 months', title: 'Nordic scaling',
      desc: 'With our Norwegian position established, we expand to Sweden and Denmark through white-label and partner networks. The model is scaled, relationships are built, and Kvad is the Nordic standard.',
      bullets: [
        'Sweden and Denmark in year 2, with locally adapted models',
        'White-label for large Nordic players',
        'Kvad as the de facto infrastructure for Nordic enterprise voice AI',
        'Position for a Series A round',
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
          Three phases to Nordic market leadership.
        </h2>
        <p className="text-[14px] font-light leading-[1.8] max-w-3xl" style={{ color: 'rgba(255,255,255,0.44)' }}>
          We start close and deep with Norwegian developers, win enterprise reference customers vertical by vertical,
          and then scale across the Nordics. This pre-seed round funds phases one and two.
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

// ── BUSINESS MODEL ─────────────────────────────────────────────────

function BusinessModel() {
  const tiers = [
    {
      number: '01',
      title: 'API & Usage',
      pricing: 'Pay-as-you-go · per second',
      who: 'Developers and growing products',
      desc: 'Free tier for developers, paid usage from the first second over quota. Revenue scales automatically: the more the customer’s product grows, the more we earn.',
      retention: 'Medium',
    },
    {
      number: '02',
      title: 'AI Infrastructure',
      pricing: 'Fixed MRR · monthly subscription',
      who: 'Companies in production',
      desc: 'Dedicated infrastructure with SLA and guaranteed capacity. A fixed monthly contract gives predictable ARR and low churn. These customers don’t switch.',
      retention: 'High',
    },
    {
      number: '03',
      title: 'Enterprise Licensing',
      pricing: 'Custom ACV · annual contracts',
      who: 'Large players and media houses',
      desc: 'White-label and on-premise. Multi-year contracts with high ACV and extremely high switching costs: the customer builds its product on Kvad.',
      retention: 'Very high',
    },
  ]

  return (
    <section className="relative w-full bg-[#030303] px-8 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #0d0d0d 0%, #030303 100%)' }}
      />
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-5 max-w-3xl">
          <Label>Business model</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)' }}
          >
            Kvad scales with every AI conversation.
          </h2>
          <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Three revenue streams built for land-and-expand. Developers start for free,
            growing products upgrade, the largest customers get locked in. Each tier feeds the next.
          </p>
        </div>

        {/* Table header */}
        <div>
          <div className="hidden md:grid grid-cols-12 gap-4 pb-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {['Tier', 'Pricing · audience', 'Description', 'Retention'].map((h) => (
              <span key={h} className={`text-[9px] font-medium tracking-[0.18em] uppercase
                ${h === 'Tier' ? 'col-span-2' : h === 'Pricing · audience' ? 'col-span-3' : h === 'Description' ? 'col-span-5' : 'col-span-2 text-right'}
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
          Infrastructure companies with usage-based pricing win network effects:
          the more customers use it, the more expensive it is to switch. Kvad is built this way from day one.
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
      role: 'Co-founder & President',
      initials: 'MR',
      bio: 'Mamoon leads product, distribution and go-to-market for Kvad. He has experience building AI agent systems and conversational products, and understands the interplay between user needs, technical architecture and commercial growth.',
      focus: [
        'Product and user experience',
        'Go-to-market and partnerships',
        'AI agent architecture and real-time AI experiences',
      ],
    },
    {
      name: 'Vebjørn',
      role: 'Co-founder & CEO',
      initials: 'V',
      bio: 'Vebjørn is the technical architect behind the Kvad platform. He leads model training, latency optimization and the development of the Nordic speech infrastructure, and has deep expertise in real-time speech systems.',
      focus: [
        'Model training and Nordic speech optimization',
        'Streaming architecture and latency',
        'Conversational infrastructure and API design',
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
          <Label>The team</Label>
          <h2 className="font-bold tracking-tight text-white leading-[1.04]"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
            Two founders. Complementary skills. Exactly what it takes.
          </h2>
          <p className="text-[14px] font-light leading-[1.8] max-w-2xl" style={{ color: 'rgba(255,255,255,0.44)' }}>
            Kvad needs two things to succeed: technical depth in speech models and real-time systems,
            and the commercial ability to distribute and scale. The team is built around exactly that.
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
            <span style={{ color: 'rgba(255,255,255,0.60)' }}>Why we win:</span>{' '}
            The best voice AI companies combine model expertise with strong market understanding.
            Mamoon and Vebjørn cover both dimensions, and have already built relationships
            with data owners, partner companies and potential customers in the Nordic market.
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
      number: '01', area: 'Inference & compute infrastructure', pct: 27,
      detail: 'GPU inference for real-time speech in production, plus dedicated development servers for training and experimentation.',
      bullets: ['Inference: NOK 35k/month', 'Development servers: NOK 60k/month', 'Other hosting: NOK 3.5k/month'],
      color: '#38BDF8',
    },
    {
      number: '02', area: 'Proprietary speech data & labeling', pct: 21,
      detail: 'Acquire and label natural Norwegian conversation data, the core of our model advantage.',
      bullets: ['Data budget: NOK 1M', 'Labeling budget: NOK 400k'],
      color: '#818CF8',
    },
    {
      number: '03', area: 'Go-to-market & outbound', pct: 19,
      detail: 'Reach developers and enterprise buyers through targeted outbound and paid acquisition.',
      bullets: ['Email outbound: NOK 10k/month', 'Ads: NOK 60k/month'],
      color: '#34D399',
    },
    {
      number: '04', area: 'Legal, advisory & buffer', pct: 19,
      detail: 'Legal work, external expertise, travel and a buffer for the unexpected.',
      bullets: ['External consultants: NOK 20k/month', 'Legal: NOK 20k/month', 'Buffer: NOK 30k/month'],
      color: '#FBBF24',
    },
    {
      number: '05', area: 'Engineering team', pct: 14,
      detail: 'Full-time technical co-founder leading model training and infrastructure.',
      bullets: ['Salary incl. holiday pay and benefits: NOK 50k/month'],
      color: '#F472B6',
    },
  ]

  const milestones = [
    { label: 'Month 3', text: 'API in production, Selly launched, first paying customers' },
    { label: 'Month 6', text: '50+ active integrations, [X] paying customers' },
    { label: 'Month 12', text: '[X] enterprise customers, [ARR] annual recurring revenue' },
    { label: 'Month 18', text: 'Positioned for Series A or breakeven in the Norwegian market' },
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
              <Label>The ask</Label>
              <div className="flex items-baseline gap-5">
                <h2 className="text-[72px] md:text-[80px] font-bold tracking-tight text-white leading-none">NOK 6.5M</h2>
                <span className="text-[16px] font-light tracking-wide" style={{ color: 'rgba(255,255,255,0.26)' }}>
                  Pre-seed round
                </span>
              </div>
              <p className="text-[14px] font-light leading-[1.8] max-w-lg" style={{ color: 'rgba(255,255,255,0.48)' }}>
                NOK 6.5M gives us 18 months at full speed: complete the model, launch in the market,
                secure the first enterprise customers and reach the point where growth becomes self-reinforcing.
                Every allocation below is critical to getting there.
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
                Milestones
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
                Contact
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  Mamoon Rashid
                </span>
                <span className="text-[11px] font-light" style={{ color: 'rgba(255,255,255,0.30)' }}>
                  Co-founder & President, Kvad
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
          Norwegian AI needs a voice.<br />We&apos;re building it.
        </h2>
        <p className="text-[14px] font-light leading-[1.8]" style={{ color: 'rgba(255,255,255,0.38)' }}>
          The infrastructure layer for Norwegian speech AI doesn&apos;t exist yet. Kvad is building it,
          with the right people, the right data and the right timing.
          We invite you to join us on that journey.
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
