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
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">ArcPay</span>
        </Link>
        <span className="text-sm text-gray-400">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
      </nav>
      <section className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Send Payment</h1>
        <p className="text-gray-400 mb-8">Send USDC instantly on Arc for ~$0.01</p>
        {!isConnected ? (
          <div className="bg-yellow-900/20 border border-yellow-800 rounded-2xl p-6 text-center">
            <p className="text-yellow-400">Please connect your wallet first.</p>
            <Link href="/" className="text-blue-400 underline mt-2 block">Go back</Link>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Recipient Address</label>
              <input type="text" placeholder="0x..." value={to} onChange={(e) => setTo(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Amount (USDC)</label>
              <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Note (optional)</label>
              <input type="text" placeholder="Payment for..." value={note} onChange={(e) => setNote(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
            </div>
            <button onClick={handleSend} disabled={step !== "idle" || !to || !amount} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl font-medium transition">
              {step === "approving" ? "Approving..." : step === "sending" ? "Sending..." : step === "done" ? "Sent!" : "Send Payment"}
            </button>
            {step === "done" && (
              <div className="bg-green-900/20 border border-green-800 rounded-xl p-4">
                <p className="text-green-400 font-medium">Payment sent!</p>
                {txHash && <a href={"https://testnet.arcscan.app/tx/" + txHash} target="_blank" className="text-blue-400 text-sm underline break-all">View on ArcScan</a>}
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}