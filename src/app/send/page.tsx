"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import Link from "next/link";

export default function SendPage() {
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    if (!to || !amount) return;
    sendTransaction({
      to: to as `0x${string}`,
      value: parseEther(amount),
    });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          <span className="text-xl font-bold">ArcPay</span>
        </Link>
        <span className="text-sm text-gray-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
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
              <input
                type="text"
                placeholder="0x..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Amount (USDC)</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={isPending || !to || !amount}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl font-medium transition"
            >
              {isPending ? "Sending..." : "Send Payment"}
            </button>
            {isSuccess && (
              <div className="bg-green-900/20 border border-green-800 rounded-xl p-4">
                <p className="text-green-400 font-medium">Payment sent!</p>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}