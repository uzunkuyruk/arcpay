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
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #03060f 0%, #060d1f 40%, #0a1628 70%, #0d1f3c 100%)",
      color: "#f0e6c8",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "radial-gradient(1px 1px at 20% 30%, rgba(255,255,220,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 80% 10%, rgba(255,255,220,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 50% 60%, rgba(255,255,220,0.4) 0%, transparent 100%), radial-gradient(2px 2px at 70% 25%, rgba(255,255,200,0.4) 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <nav style={{
        position: "relative",
        zIndex: 10,
        borderBottom: "1px solid rgba(201,162,39,0.25)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(3,6,15,0.6)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Logo />
          <span style={{ fontSize: "1.3rem", fontWeight: "700", letterSpacing: "0.05em", color: "#d4af37" }}>ArcPay</span>
          <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: "28px", fontSize: "0.85rem", color: "rgba(201,162,39,0.7)", textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#d4af37")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(201,162,39,0.7)")}>
            Faucet
          </a>
        </div>
        {isConnected ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.8rem", color: "rgba(201,162,39,0.6)" }}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button onClick={() => disconnect()}
              style={{ background: "rgba(120,30,30,0.4)", border: "1px solid rgba(180,60,60,0.4)", color: "#f0a0a0", padding: "8px 18px", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer" }}>
              Disconnect
            </button>
          </div>
        ) : (
          <button onClick={() => connect({ connector: injected() })}
            style={{ background: "linear-gradient(135deg, rgba(180,140,40,0.2), rgba(201,162,39,0.1))", border: "1px solid rgba(201,162,39,0.5)", color: "#d4af37", padding: "8px 22px", borderRadius: "6px", fontSize: "0.85rem", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,162,39,0.8)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,162,39,0.5)"; }}>
            Connect Wallet
          </button>
        )}
      </nav>

      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "100px 24px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-block", border: "1px solid rgba(201,162,39,0.3)", color: "rgba(201,162,39,0.8)", fontSize: "0.78rem", padding: "5px 16px", borderRadius: "20px", marginBottom: "32px", letterSpacing: "0.15em", textTransform: "uppercase" as const, background: "rgba(201,162,39,0.05)" }}>
          Live on Arc Testnet
        </div>
        <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", fontWeight: "700", lineHeight: "1.15", marginBottom: "24px", color: "#f0e6c8", textShadow: "0 0 60px rgba(201,162,39,0.2)", letterSpacing: "0.02em" }}>
          Global Payments &<br />
          <span style={{ color: "#d4af37" }}>Stablecoin Swap</span>
        </h1>
        <p style={{ color: "rgba(200,185,150,0.7)", fontSize: "1.1rem", maxWidth: "560px", margin: "0 auto 48px", lineHeight: "1.7" }}>
          Send USDC instantly on Arc blockchain for ~$0.01. Swap USDC ↔ EURC in seconds.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link href="/send" style={{ background: "linear-gradient(135deg, #b8860b, #d4af37)", color: "#0a0e1a", padding: "14px 36px", borderRadius: "8px", fontWeight: "700", textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.06em", boxShadow: "0 4px 24px rgba(180,140,40,0.3)" }}>
            Send Payment
          </Link>
          <Link href="/swap" style={{ border: "1px solid rgba(201,162,39,0.4)", color: "#d4af37", padding: "14px 36px", borderRadius: "8px", fontWeight: "600", textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.06em", background: "rgba(201,162,39,0.05)" }}>
            Swap Now
          </Link>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {[
          { icon: "⚡", title: "Instant Finality", desc: "Transaction confirmed in under 1 second" },
          { icon: "💸", title: "~$0.01 Fees", desc: "Stable, predictable gas paid in USDC" },
          { icon: "🔄", title: "FX Swap", desc: "Instant USDC ↔ EURC conversion" },
        ].map((item) => (
          <div key={item.title} style={{ background: "linear-gradient(135deg, rgba(10,14,26,0.8), rgba(15,25,50,0.6))", border: "1px solid rgba(201,162,39,0.2)", borderRadius: "16px", padding: "28px 24px", backdropFilter: "blur(8px)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
            <h3 style={{ fontWeight: "700", marginBottom: "8px", color: "#f0e6c8", fontSize: "1rem" }}>{item.title}</h3>
            <p style={{ color: "rgba(200,185,150,0.6)", fontSize: "0.88rem", lineHeight: "1.5" }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {isConnected && (
        <section style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "0 24px 48px" }}>
          <div style={{ background: "rgba(40,80,40,0.15)", border: "1px solid rgba(80,160,80,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
            <div style={{ color: "#6fcf97", fontWeight: "700", fontSize: "1.1rem", marginBottom: "4px" }}>Wallet Connected</div>
            <div style={{ color: "rgba(200,185,150,0.5)", fontSize: "0.85rem" }}>{address}</div>
          </div>
        </section>
      )}

      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(201,162,39,0.15)", padding: "24px 48px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {[
            { label: "Docs", href: "https://docs.arc.network/arc/concepts/welcome-to-arc" },
            { label: "Arc House", href: "https://community.arc.network/home" },
            { label: "Discord", href: "https://discord.gg/buildonarc" },
            { label: "X", href: "https://x.com/arc" },
          ].map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(201,162,39,0.5)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.08em" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4af37")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(201,162,39,0.5)")}>
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}