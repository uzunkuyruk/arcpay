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
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">ArcPay</span>
        </Link>
        <span className="text-sm text-gray-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </nav>

      <section className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">FX Swap</h1>
        <p className="text-gray-400 mb-8">Swap stablecoins instantly on Arc</p>

        {!isConnected ? (
          <div className="bg-yellow-900/20 border border-yellow-800 rounded-2xl p-6 text-center">
            <p className="text-yellow-400">Please connect your wallet first.</p>
            <Link href="/" className="text-blue-400 underline mt-2 block">Go back</Link>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">From</label>
              <div className="flex gap-3">
                <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 font-bold text-blue-400 min-w-24 text-center">
                  {fromToken}
                </div>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleSwitch}
              className="mx-auto bg-gray-800 hover:bg-gray-700 border border-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-xl transition"
            >
              ↕
            </button>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">To</label>
              <div className="flex gap-3">
                <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 font-bold text-green-400 min-w-24 text-center">
                  {toToken}
                </div>
                <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-400">
                  {amount ? (parseFloat(amount) * 0.92).toFixed(2) : "0.00"}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-3 text-sm text-gray-400 flex justify-between">
              <span>Rate</span>
              <span>1 {fromToken} = 0.92 {toToken}</span>
            </div>

            <button
              disabled={!amount}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium transition"
            >
              Swap Now
            </button>
          </div>
        )}
      </section>
    </main>
  );
}