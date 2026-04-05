"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("EURC");
  const [amount, setAmount] = useState("");

  const handleSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d1f3d; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: rgba(180,195,220,0.3); }
        input:focus { outline: none; border-color: rgba(74,144,255,0.6) !important; }
      `}</style>
      <main style={{ minHeight: "100vh", background: "#0d1f3d", fontFamily: "'Inter', sans-serif", color: "#e8dcc8" }}>
        <nav style={{ borderBottom: "1px solid rgba(38,102,255,0.2)", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(2,4,8,0.7)", backdropFilter: "blur(16px)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <Logo />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: "1.25rem", fontWeight: "600", color: "#4a90ff", letterSpacing: "0.08em" }}>ArcPay</span>
          </Link>
          <span style={{ fontSize: "0.78rem", color: "rgba(74,144,255,0.5)" }}>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </nav>

        <section style={{ maxWidth: "480px", margin: "0 auto", padding: "60px 24px" }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "2rem", fontWeight: "700", marginBottom: "8px", color: "#ffffff", letterSpacing: "0.03em" }}>FX Swap</h1>
          <p style={{ color: "rgba(180,195,220,0.5)", marginBottom: "36px", fontSize: "0.9rem", fontWeight: "300" }}>Swap stablecoins instantly on Arc</p>

          {!isConnected ? (
            <div style={{ background: "rgba(120,90,0,0.15)", border: "1px solid rgba(180,140,0,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,200,80,0.8)", marginBottom: "12px" }}>Please connect your wallet first.</p>
              <Link href="/" style={{ color: "#4a90ff", fontSize: "0.85rem" }}>← Go back</Link>
            </div>
          ) : (
            <div style={{ background: "rgba(2,4,8,0.5)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "20px", backdropFilter: "blur(12px)" }}>
              <div>
                <label style={{ fontSize: "0.78rem", color: "rgba(180,195,220,0.5)", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" }}>From</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ background: "rgba(74,144,255,0.08)", border: "1px solid rgba(74,144,255,0.2)", borderRadius: "12px", padding: "12px 16px", fontWeight: "600", color: "#4a90ff", minWidth: "90px", textAlign: "center", fontSize: "0.9rem" }}>{fromToken}</div>
                  <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)}
                    style={{ flex: 1, background: "rgba(74,144,255,0.04)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "12px", padding: "12px 16px", color: "#ffffff", fontSize: "0.9rem" }} />
                </div>
              </div>

              <button onClick={handleSwitch}
                style={{ margin: "0 auto", background: "rgba(74,144,255,0.08)", border: "1px solid rgba(74,144,255,0.2)", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", cursor: "pointer", color: "#4a90ff" }}>
                ↕
              </button>

              <div>
                <label style={{ fontSize: "0.78rem", color: "rgba(180,195,220,0.5)", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" }}>To</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ background: "rgba(74,144,255,0.08)", border: "1px solid rgba(74,144,255,0.2)", borderRadius: "12px", padding: "12px 16px", fontWeight: "600", color: "#6fcf97", minWidth: "90px", textAlign: "center", fontSize: "0.9rem" }}>{toToken}</div>
                  <div style={{ flex: 1, background: "rgba(74,144,255,0.04)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "12px", padding: "12px 16px", color: "rgba(180,195,220,0.5)", fontSize: "0.9rem" }}>
                    {amount ? (parseFloat(amount) * 0.92).toFixed(2) : "0.00"}
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(74,144,255,0.04)", border: "1px solid rgba(74,144,255,0.1)", borderRadius: "12px", padding: "12px 16px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(180,195,220,0.5)" }}>
                <span>Rate</span>
                <span>1 {fromToken} = 0.92 {toToken}</span>
              </div>

              <button disabled={!amount}
                style={{ background: "linear-gradient(135deg, #1a6aff, #4a90ff)", border: "none", color: "#ffffff", padding: "14px", borderRadius: "12px", fontWeight: "600", fontSize: "0.9rem", cursor: !amount ? "not-allowed" : "pointer", opacity: !amount ? 0.5 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
                Swap Now
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}