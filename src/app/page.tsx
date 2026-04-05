"use client";

import { Logo } from "@/components/Logo";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #c8d8f8; }
      `}</style>
      <main style={{
        minHeight: "90vh",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
        color: "#1a1f36",
        background: "linear-gradient(135deg, #c8d8f8 0%, #d8e4ff 50%, #c4d4f8 100%)",
      }}>

        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          {/* Orta */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "420px", height: "420px", opacity: 0.12, objectFit: "contain" }} />
          {/* Sol üst büyük */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", top: "60px", left: "60px", width: "160px", height: "160px", opacity: 0.1, objectFit: "contain" }} />
          {/* Sol üst küçük */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", top: "160px", left: "220px", width: "100px", height: "100px", opacity: 0.08, objectFit: "contain" }} />
          {/* Sağ üst büyük */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", top: "60px", right: "100px", width: "140px", height: "140px", opacity: 0.1, objectFit: "contain" }} />
          {/* Sağ üst küçük */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", top: "30px", right: "30px", width: "90px", height: "90px", opacity: 0.07, objectFit: "contain" }} />
          {/* Sol alt */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", bottom: "80px", left: "40px", width: "120px", height: "120px", opacity: 0.08, objectFit: "contain" }} />
          {/* Sağ alt büyük */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", bottom: "120px", right: "80px", width: "150px", height: "150px", opacity: 0.1, objectFit: "contain" }} />
          {/* Sağ alt küçük */}
          <img src="/usdc.png" alt="" style={{ position: "absolute", bottom: "40px", right: "240px", width: "100px", height: "100px", opacity: 0.07, objectFit: "contain" }} />
        </div>

        <nav style={{ position: "relative", zIndex: 10, borderBottom: "1px solid rgba(74,144,255,0.15)", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Logo />
            <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#2563eb", letterSpacing: "0.02em" }}>ArcPay</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {isConnected ? (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "0.78rem", color: "#6b7280", fontWeight: "500" }}>
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button onClick={() => disconnect()}
                  style={{ background: "rgba(220,50,50,0.08)", border: "1px solid rgba(220,50,50,0.25)", color: "#dc2626", padding: "8px 20px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", fontWeight: "500" }}>
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={() => connect({ connector: injected() })}
                style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", border: "none", color: "#ffffff", padding: "9px 24px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", fontWeight: "600", letterSpacing: "0.02em", boxShadow: "0 2px 12px rgba(37,99,235,0.3)" }}>
                Connect Wallet
              </button>
            )}
          </div>
        </nav>

        <section style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "70px 24px 50px", textAlign: "center" }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(37,99,235,0.2)", color: "#2563eb", fontSize: "0.72rem", padding: "5px 18px", borderRadius: "20px", marginBottom: "32px", letterSpacing: "0.15em", textTransform: "uppercase" as const, background: "rgba(37,99,235,0.06)", fontWeight: "600" }}>
            Live on Arc Testnet
          </div>
          <h1 style={{ fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)", fontWeight: "700", lineHeight: "1.2", marginBottom: "24px", color: "#0f172a", letterSpacing: "-0.02em" }}>
            Global Payments<br />
            <span style={{ color: "#2563eb" }}>Stablecoin Swap</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.05rem", maxWidth: "520px", margin: "0 auto 48px", lineHeight: "1.8" }}>
            Send USDC instantly on Arc blockchain for ~$0.01. Swap USDC ↔ EURC in seconds.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", position: "relative", zIndex: 10 }}>
            <a href="/send" style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#ffffff", padding: "13px 34px", borderRadius: "10px", fontWeight: "600", textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(37,99,235,0.3)", display: "inline-block" }}>
              Send Payment
            </a>
            <a href="/swap" style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#ffffff", padding: "13px 34px", borderRadius: "10px", fontWeight: "600", textDecoration: "none", fontSize: "0.95rem", boxShadow: "0 4px 20px rgba(37,99,235,0.3)", display: "inline-block" }}>
              Swap Now
            </a>
          </div>
        </section>

        <section style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "0 24px 50px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { icon: "⚡", title: "Instant Finality", desc: "Transaction confirmed in under 1 second" },
            { icon: "💸", title: "~$0.01 Fees", desc: "Stable, predictable gas paid in USDC" },
            { icon: "🔄", title: "FX Swap", desc: "Instant USDC ↔ EURC conversion" },
          ].map((item) => (
            <div key={item.title} style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(37,99,235,0.1)", borderRadius: "16px", padding: "28px 22px", backdropFilter: "blur(8px)", boxShadow: "0 2px 16px rgba(37,99,235,0.06)" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{item.icon}</div>
              <h3 style={{ fontWeight: "600", marginBottom: "8px", color: "#0f172a", fontSize: "0.95rem" }}>{item.title}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.85rem", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          ))}
        </section>

        <footer style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(37,99,235,0.1)", padding: "16px 40px 12px", background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#2563eb", letterSpacing: "0.2em", marginBottom: "12px" }}>// BUILD</div>
              {[
                { label: "Documentation", href: "https://docs.arc.network/arc/concepts/welcome-to-arc" },
                { label: "Explorer", href: "https://testnet.arcscan.app" },
                { label: "Faucet", href: "https://faucet.circle.com" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", color: "#374151", textDecoration: "none", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#2563eb")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#2563eb", letterSpacing: "0.2em", marginBottom: "12px" }}>// EXPLORE</div>
              {[
                { label: "Blog", href: "https://www.arc.network/blog" },
                { label: "Ecosystem", href: "https://www.arc.network/ecosystem" },
                { label: "Litepaper", href: "https://www.arc.network/litepaper" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", color: "#374151", textDecoration: "none", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#2563eb")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: "700", color: "#2563eb", letterSpacing: "0.2em", marginBottom: "12px" }}>// CONNECT</div>
              {[
                { label: "Discord", href: "https://discord.gg/buildonarc" },
                { label: "X", href: "https://x.com/arc" },
                { label: "Arc House", href: "https://community.arc.network/home" },
              ].map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", color: "#374151", textDecoration: "none", fontSize: "0.85rem", fontWeight: "500", marginBottom: "6px" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#2563eb")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: "860px", margin: "12px auto 0", paddingTop: "10px", borderTop: "1px solid rgba(37,99,235,0.1)", textAlign: "center", color: "#9ca3af", fontSize: "0.75rem" }}>
            Built on Arc Testnet
          </div>
        </footer>
      </main>
    </>
  );
}