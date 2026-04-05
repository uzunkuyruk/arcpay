"use client";

import { Logo } from "@/components/Logo";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import Link from "next/link";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d1f3d; }
      `}</style>
      <main style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        color: "#e8dcc8",
        background: "#0d1f3d",
      }}>

        <div style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          pointerEvents: "none",
        }}>
          <img
            src="/usdc.png"
            alt=""
            style={{
              width: "600px",
              height: "600px",
              opacity: 0.06,
              filter: "blur(2px)",
              objectFit: "contain",
            }}
          />
        </div>

        <nav style={{
          position: "relative",
          zIndex: 10,
          borderBottom: "1px solid rgba(38,102,255,0.2)",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(2,4,8,0.7)",
          backdropFilter: "blur(16px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Logo />
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#4a90ff",
              letterSpacing: "0.08em",
            }}>ArcPay</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.82rem", color: "rgba(74,144,255,0.6)", textDecoration: "none", letterSpacing: "0.1em", fontWeight: "500", border: "1px solid rgba(74,144,255,0.4)", padding: "9px 24px", borderRadius: "8px" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#4a90ff"; e.currentTarget.style.borderColor = "rgba(74,144,255,0.8)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(74,144,255,0.6)"; e.currentTarget.style.borderColor = "rgba(74,144,255,0.4)"; }}>
              Faucet
            </a>
            {isConnected ? (
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "0.78rem", color: "rgba(74,144,255,0.5)", fontWeight: "500" }}>
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button onClick={() => disconnect()}
                  style={{ background: "rgba(120,30,30,0.3)", border: "1px solid rgba(180,60,60,0.35)", color: "#f0a0a0", padding: "8px 20px", borderRadius: "8px", fontSize: "0.82rem", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: "500" }}>
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={() => connect({ connector: injected() })}
                style={{ background: "linear-gradient(135deg, rgba(38,102,255,0.15), rgba(74,144,255,0.08))", border: "1px solid rgba(74,144,255,0.4)", color: "#4a90ff", padding: "9px 24px", borderRadius: "8px", fontSize: "0.82rem", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0.05em" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(74,144,255,0.8)"; e.currentTarget.style.background = "rgba(74,144,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(74,144,255,0.4)"; e.currentTarget.style.background = "linear-gradient(135deg, rgba(38,102,255,0.15), rgba(74,144,255,0.08))"; }}>
                Connect Wallet
              </button>
            )}
          </div>
        </nav>

        <section style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "120px 24px 90px", textAlign: "center" }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(74,144,255,0.25)", color: "rgba(74,144,255,0.7)", fontSize: "0.72rem", padding: "5px 18px", borderRadius: "20px", marginBottom: "36px", letterSpacing: "0.2em", textTransform: "uppercase" as const, background: "rgba(74,144,255,0.04)", fontWeight: "500" }}>
            Live on Arc Testnet
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.4rem, 5.5vw, 4rem)", fontWeight: "700", lineHeight: "1.2", marginBottom: "28px", color: "#ffffff", letterSpacing: "0.03em" }}>
            Global Payments<br />
            <span style={{ color: "#4a90ff" }}>Stablecoin Swap</span>
          </h1>
          <p style={{ color: "rgba(180,195,220,0.65)", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 52px", lineHeight: "1.8", fontWeight: "300" }}>
            Send USDC instantly on Arc blockchain for ~$0.01. Swap USDC ↔ EURC in seconds.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <Link href="/send" style={{ background: "linear-gradient(135deg, #1a6aff, #4a90ff)", color: "#ffffff", padding: "13px 34px", borderRadius: "10px", fontWeight: "600", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "0.06em", boxShadow: "0 4px 28px rgba(74,144,255,0.3)", fontFamily: "'Inter', sans-serif" }}>
              Send Payment
            </Link>
            <Link href="/swap" style={{ border: "1px solid rgba(74,144,255,0.35)", color: "#4a90ff", padding: "13px 34px", borderRadius: "10px", fontWeight: "500", textDecoration: "none", fontSize: "0.9rem", letterSpacing: "0.06em", background: "rgba(74,144,255,0.04)", fontFamily: "'Inter', sans-serif" }}>
              Swap Now
            </Link>
          </div>
        </section>

        <section style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "0 24px 90px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "⚡", title: "Instant Finality", desc: "Transaction confirmed in under 1 second" },
            { icon: "💸", title: "~$0.01 Fees", desc: "Stable, predictable gas paid in USDC" },
            { icon: "🔄", title: "FX Swap", desc: "Instant USDC ↔ EURC conversion" },
          ].map((item) => (
            <div key={item.title} style={{ background: "rgba(2,4,8,0.6)", border: "1px solid rgba(74,144,255,0.12)", borderRadius: "16px", padding: "28px 22px", backdropFilter: "blur(12px)" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontWeight: "600", marginBottom: "8px", color: "#ffffff", fontSize: "0.95rem", letterSpacing: "0.03em" }}>{item.title}</h3>
              <p style={{ color: "rgba(180,195,220,0.5)", fontSize: "0.85rem", lineHeight: "1.6", fontWeight: "300" }}>{item.desc}</p>
            </div>
          ))}
        </section>

        {isConnected && (
          <section style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "0 24px 48px" }}>
            <div style={{ background: "rgba(20,50,20,0.4)", border: "1px solid rgba(80,160,80,0.25)", borderRadius: "16px", padding: "22px", textAlign: "center", backdropFilter: "blur(12px)" }}>
              <div style={{ color: "#6fcf97", fontWeight: "600", fontSize: "1rem", marginBottom: "6px" }}>Wallet Connected</div>
              <div style={{ color: "rgba(180,195,220,0.45)", fontSize: "0.8rem", fontWeight: "300" }}>{address}</div>
            </div>
          </section>
        )}

        <footer style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(74,144,255,0.1)", padding: "22px 48px", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {[
              { label: "Docs", href: "https://docs.arc.network/arc/concepts/welcome-to-arc" },
              { label: "Arc House", href: "https://community.arc.network/home" },
              { label: "Discord", href: "https://discord.gg/buildonarc" },
              { label: "X", href: "https://x.com/arc" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(74,144,255,0.45)", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "0.08em", fontWeight: "500" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#4a90ff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(74,144,255,0.45)")}>
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}