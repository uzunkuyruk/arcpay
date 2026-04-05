"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const ROUTER = "0xdfe1fB8C8eCb103a2CE15717501d002dD0FebBD6";
const USDC = "0x3600000000000000000000000000000000000000";
const ROUTER_ABI = [{ name: "sendPayment", type: "function", inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }, { name: "note", type: "string" }], outputs: [], stateMutability: "nonpayable" }] as const;
const ERC20_ABI = [{ name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" }] as const;

export default function SendPage() {
  const { address, isConnected } = useAccount();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState("idle");
  const [txHash, setTxHash] = useState("");
  const { writeContract } = useWriteContract();

  const handleSend = () => {
    if (!to || !amount) return;
    const units = parseUnits(amount, 6);
    setStep("approving");
    writeContract({ address: USDC, abi: ERC20_ABI, functionName: "approve", args: [ROUTER, units] }, {
      onSuccess: () => {
        setStep("sending");
        writeContract({ address: ROUTER, abi: ROUTER_ABI, functionName: "sendPayment", args: [to as `0x${string}`, units, note] }, {
          onSuccess: (hash) => { setTxHash(hash); setStep("done"); },
          onError: () => setStep("idle"),
        });
      },
      onError: () => setStep("idle"),
    });
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
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "2rem", fontWeight: "700", marginBottom: "8px", color: "#ffffff", letterSpacing: "0.03em" }}>Send Payment</h1>
          <p style={{ color: "rgba(180,195,220,0.5)", marginBottom: "36px", fontSize: "0.9rem", fontWeight: "300" }}>Send USDC instantly on Arc for ~$0.01</p>

          {!isConnected ? (
            <div style={{ background: "rgba(120,90,0,0.15)", border: "1px solid rgba(180,140,0,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
              <p style={{ color: "rgba(255,200,80,0.8)", marginBottom: "12px" }}>Please connect your wallet first.</p>
              <Link href="/" style={{ color: "#4a90ff", fontSize: "0.85rem" }}>← Go back</Link>
            </div>
          ) : (
            <div style={{ background: "rgba(2,4,8,0.5)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "20px", backdropFilter: "blur(12px)" }}>
              <div>
                <label style={{ fontSize: "0.78rem", color: "rgba(180,195,220,0.5)", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" }}>Recipient Address</label>
                <input type="text" placeholder="0x..." value={to} onChange={e => setTo(e.target.value)}
                  style={{ width: "100%", background: "rgba(74,144,255,0.04)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "12px", padding: "12px 16px", color: "#ffffff", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", color: "rgba(180,195,220,0.5)", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" }}>Amount (USDC)</label>
                <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)}
                  style={{ width: "100%", background: "rgba(74,144,255,0.04)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "12px", padding: "12px 16px", color: "#ffffff", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.78rem", color: "rgba(180,195,220,0.5)", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" }}>Note (optional)</label>
                <input type="text" placeholder="Payment for..." value={note} onChange={e => setNote(e.target.value)}
                  style={{ width: "100%", background: "rgba(74,144,255,0.04)", border: "1px solid rgba(74,144,255,0.15)", borderRadius: "12px", padding: "12px 16px", color: "#ffffff", fontSize: "0.9rem" }} />
              </div>
              <button onClick={handleSend} disabled={step !== "idle" || !to || !amount}
                style={{ background: step === "done" ? "rgba(40,120,40,0.4)" : "linear-gradient(135deg, #1a6aff, #4a90ff)", border: "none", color: "#ffffff", padding: "14px", borderRadius: "12px", fontWeight: "600", fontSize: "0.9rem", cursor: step !== "idle" || !to || !amount ? "not-allowed" : "pointer", opacity: !to || !amount ? 0.5 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em" }}>
                {step === "approving" ? "Approving..." : step === "sending" ? "Sending..." : step === "done" ? "✓ Sent!" : "Send Payment"}
              </button>
              {step === "done" && (
                <div style={{ background: "rgba(20,80,20,0.3)", border: "1px solid rgba(80,160,80,0.25)", borderRadius: "12px", padding: "16px" }}>
                  <p style={{ color: "#6fcf97", fontWeight: "600", marginBottom: "6px" }}>Payment sent!</p>
                  {txHash && <a href={"https://testnet.arcscan.app/tx/" + txHash} target="_blank" rel="noopener noreferrer" style={{ color: "#4a90ff", fontSize: "0.82rem", wordBreak: "break-all" }}>View on ArcScan →</a>}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}