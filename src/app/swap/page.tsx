"use client";

import { useState } from "react";
import { useAccount, useWriteContract, useChainId, useSwitchChain } from "wagmi";
import { parseUnits } from "viem";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const STABLEFX = "0x867650F5eAe8df91445971f14d89fd84F0C9a9f8";
const USDC = "0x3600000000000000000000000000000000000000";
const EURC = "0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a";
const ARC_CHAIN_ID = 1122334455;

const ERC20_ABI = [{ name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" }] as const;
const STABLEFX_ABI = [{ name: "swap", type: "function", inputs: [{ name: "tokenIn", type: "address" }, { name: "tokenOut", type: "address" }, { name: "amountIn", type: "uint256" }, { name: "minAmountOut", type: "uint256" }, { name: "recipient", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "nonpayable" }] as const;

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("EURC");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState("idle");
  const [txHash, setTxHash] = useState("");
  const { writeContract } = useWriteContract();

  const isWrongNetwork = chainId !== ARC_CHAIN_ID;

  const handleSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleSwap = () => {
    if (!amount || !address) return;
    const tokenIn = fromToken === "USDC" ? USDC : EURC;
    const tokenOut = toToken === "USDC" ? USDC : EURC;
    const amountIn = parseUnits(amount, 6);
    const minAmountOut = parseUnits((parseFloat(amount) * 0.9).toFixed(6), 6);

    setStep("approving");
    writeContract({ address: tokenIn, abi: ERC20_ABI, functionName: "approve", args: [STABLEFX, amountIn] }, {
      onSuccess: () => {
        setStep("swapping");
        writeContract({ address: STABLEFX, abi: STABLEFX_ABI, functionName: "swap", args: [tokenIn, tokenOut, amountIn, minAmountOut, address] }, {
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #c8d8f8; }
        input { font-family: 'Inter', sans-serif; }
        input::placeholder { color: rgba(100,120,160,0.4); }
        input:focus { outline: none; border-color: rgba(37,99,235,0.6) !important; }
      `}</style>
      <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #c8d8f8 0%, #d8e4ff 50%, #c4d4f8 100%)", fontFamily: "'Inter', sans-serif", color: "#1a1f36" }}>
        <nav style={{ borderBottom: "1px solid rgba(37,99,235,0.15)", padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <Logo />
            <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#2563eb", letterSpacing: "0.02em" }}>ArcPay</span>
          </Link>
          <span style={{ fontSize: "0.78rem", color: "#6b7280" }}>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        </nav>

        <section style={{ maxWidth: "480px", margin: "0 auto", padding: "60px 24px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>FX Swap</h1>
          <p style={{ color: "#6b7280", marginBottom: "36px", fontSize: "0.9rem" }}>Swap stablecoins instantly on Arc</p>

          {!isConnected ? (
            <div style={{ background: "rgba(254,243,199,0.6)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "16px", padding: "24px", textAlign: "center" }}>
              <p style={{ color: "#b45309", marginBottom: "12px" }}>Please connect your wallet first.</p>
              <Link href="/" style={{ color: "#2563eb", fontSize: "0.85rem" }}>← Go back</Link>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "20px", padding: "28px", display: "flex", flexDirection: "column", gap: "20px", backdropFilter: "blur(12px)", boxShadow: "0 2px 20px rgba(37,99,235,0.08)" }}>

              {isWrongNetwork && (
                <div style={{ background: "rgba(220,50,50,0.06)", border: "1px solid rgba(220,50,50,0.2)", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                  <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: "10px" }}>⚠️ Wrong network detected</p>
                  <button onClick={() => switchChain({ chainId: ARC_CHAIN_ID })}
                    style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", color: "#dc2626", padding: "8px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "0.85rem", cursor: "pointer" }}>
                    Switch to Arc Testnet
                  </button>
                </div>
              )}

              <div>
                <label style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: "600" }}>From</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: "12px", padding: "12px 16px", fontWeight: "700", color: "#2563eb", minWidth: "90px", textAlign: "center", fontSize: "0.9rem" }}>{fromToken}</div>
                  <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)}
                    style={{ flex: 1, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 16px", color: "#0f172a", fontSize: "0.9rem" }} />
                </div>
              </div>

              <button onClick={handleSwitch}
                style={{ margin: "0 auto", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", cursor: "pointer", color: "#2563eb" }}>
                ↕
              </button>

              <div>
                <label style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: "600" }}>To</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: "12px", padding: "12px 16px", fontWeight: "700", color: "#16a34a", minWidth: "90px", textAlign: "center", fontSize: "0.9rem" }}>{toToken}</div>
                  <div style={{ flex: 1, background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 16px", color: "#6b7280", fontSize: "0.9rem" }}>
                    {amount ? (parseFloat(amount) * 0.92).toFixed(2) : "0.00"}
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(37,99,235,0.04)", border: "1px solid rgba(37,99,235,0.08)", borderRadius: "12px", padding: "12px 16px", display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#6b7280" }}>
                <span>Rate</span>
                <span>1 {fromToken} ≈ 0.92 {toToken}</span>
              </div>

              <button onClick={handleSwap} disabled={isWrongNetwork || !amount || step !== "idle"}
                style={{ background: step === "done" ? "rgba(22,163,74,0.15)" : "linear-gradient(135deg, #2563eb, #3b82f6)", border: step === "done" ? "1px solid rgba(22,163,74,0.3)" : "none", color: step === "done" ? "#16a34a" : "#ffffff", padding: "14px", borderRadius: "12px", fontWeight: "600", fontSize: "0.9rem", cursor: isWrongNetwork || !amount || step !== "idle" ? "not-allowed" : "pointer", opacity: isWrongNetwork || !amount ? 0.5 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em", boxShadow: step === "done" ? "none" : "0 4px 20px rgba(37,99,235,0.25)" }}>
                {step === "approving" ? "Approving..." : step === "swapping" ? "Swapping..." : step === "done" ? "✓ Swapped!" : "Swap Now"}
              </button>

              {step === "done" && txHash && (
                <div style={{ background: "rgba(220,252,231,0.6)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px", padding: "16px" }}>
                  <p style={{ color: "#16a34a", fontWeight: "600", marginBottom: "6px" }}>Swap successful!</p>
                  <a href={"https://testnet.arcscan.app/tx/" + txHash} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontSize: "0.82rem", wordBreak: "break-all" }}>View on ArcScan →</a>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}