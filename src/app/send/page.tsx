"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useChainId, useSwitchChain } from "wagmi";
import { parseUnits } from "viem";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const ROUTER = "0xdfe1fB8C8eCb103a2CE15717501d002dD0FebBD6";
const USDC = "0x3600000000000000000000000000000000000000" as `0x${string}`;
const ARC_CHAIN_ID = 1122334455;
const ROUTER_ABI = [{ name: "sendPayment", type: "function", inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }, { name: "note", type: "string" }], outputs: [], stateMutability: "nonpayable" }] as const;
const ERC20_ABI = [{ name: "approve", type: "function", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" }] as const;

const switchToArc = async () => {
  const chainHex = "0x42A9B587";
  try {
    await (window as any).ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainHex }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await (window as any).ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: chainHex,
          chainName: "Arc Testnet",
          nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
          rpcUrls: ["https://rpc.testnet.arc.network"],
          blockExplorerUrls: ["https://testnet.arcscan.app"],
        }],
      });
    }
  }
};

export default function SendPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [mounted, setMounted] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState("idle");
  const [txHash, setTxHash] = useState("");
  const { writeContract } = useWriteContract();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isWrongNetwork = chainId !== ARC_CHAIN_ID;

  const handleSend = async () => {
    if (!to || !amount) return;
    await switchToArc();
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
          <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "8px", color: "#0f172a" }}>Send Payment</h1>
          <p style={{ color: "#6b7280", marginBottom: "36px", fontSize: "0.9rem" }}>Send USDC instantly on Arc for ~$0.01</p>

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
                <label style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: "600" }}>Recipient Address</label>
                <input type="text" placeholder="0x..." value={to} onChange={e => setTo(e.target.value)}
                  style={{ width: "100%", background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 16px", color: "#0f172a", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: "600" }}>Amount (USDC)</label>
                <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)}
                  style={{ width: "100%", background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 16px", color: "#0f172a", fontSize: "0.9rem" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: "8px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase" as const, fontWeight: "600" }}>Note (optional)</label>
                <input type="text" placeholder="Payment for..." value={note} onChange={e => setNote(e.target.value)}
                  style={{ width: "100%", background: "rgba(37,99,235,0.03)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 16px", color: "#0f172a", fontSize: "0.9rem" }} />
              </div>

              <button onClick={handleSend} disabled={step !== "idle" || !to || !amount}
                style={{ background: step === "done" ? "rgba(22,163,74,0.15)" : "linear-gradient(135deg, #2563eb, #3b82f6)", border: step === "done" ? "1px solid rgba(22,163,74,0.3)" : "none", color: step === "done" ? "#16a34a" : "#ffffff", padding: "14px", borderRadius: "12px", fontWeight: "600", fontSize: "0.9rem", cursor: step !== "idle" || !to || !amount ? "not-allowed" : "pointer", opacity: !to || !amount ? 0.5 : 1, fontFamily: "'Inter', sans-serif", letterSpacing: "0.05em", boxShadow: step === "done" ? "none" : "0 4px 20px rgba(37,99,235,0.25)" }}>
                {step === "approving" ? "Approving..." : step === "sending" ? "Sending..." : step === "done" ? "✓ Sent!" : "Send Payment"}
              </button>

              {step === "done" && (
                <div style={{ background: "rgba(220,252,231,0.6)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "12px", padding: "16px" }}>
                  <p style={{ color: "#16a34a", fontWeight: "600", marginBottom: "6px" }}>Payment sent!</p>
                  {txHash && <a href={"https://testnet.arcscan.app/tx/" + txHash} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontSize: "0.82rem", wordBreak: "break-all" }}>View on ArcScan →</a>}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}