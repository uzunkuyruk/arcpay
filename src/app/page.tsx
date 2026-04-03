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
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold">ArcPay</span>
        <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" className="ml-8 text-sm text-gray-300 hover:text-white transition">
          Faucet
        </a>
        </div>
        {isConnected ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button
              onClick={() => disconnect()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={() => connect({ connector: injected() })}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Connect Wallet
          </button>
        )}
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-blue-900/40 text-blue-400 text-sm px-3 py-1 rounded-full mb-6">
          Live on Arc Testnet
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Global Payments &<br />
          <span className="text-blue-400">Stablecoin Swap</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Send USDC instantly on Arc blockchain for ~$0.01. Swap USDC ↔ EURC in seconds.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/send" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-medium transition">
            Send Payment
          </Link>
          <Link href="/swap" className="border border-gray-700 hover:border-gray-500 px-8 py-3 rounded-xl font-medium transition">
            Swap Now
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24 grid grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-bold mb-2">Instant Finality</h3>
          <p className="text-gray-400 text-sm">Transaction confirmed in under 1 second</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-3xl mb-3">💸</div>
          <h3 className="font-bold mb-2">~$0.01 Fees</h3>
          <p className="text-gray-400 text-sm">Stable, predictable gas paid in USDC</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="text-3xl mb-3">🔄</div>
          <h3 className="font-bold mb-2">FX Swap</h3>
          <p className="text-gray-400 text-sm">Instant USDC ↔ EURC conversion</p>
        </div>
      </section>

      {isConnected && (
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="bg-green-900/20 border border-green-800 rounded-2xl p-6 text-center">
            <div className="text-green-400 font-bold text-lg mb-1">Wallet Connected!</div>
            <div className="text-gray-400 text-sm">{address}</div>
          </div>
        </section>
      )}
    <footer className="border-t border-gray-800 mt-12 px-6 py-8">
        <div className="max-w-4xl mx-auto flex justify-end">
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="https://docs.arc.network/arc/concepts/welcome-to-arc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Docs</a>
            <a href="https://x.com/arc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">X</a>
            <a href="https://discord.gg/buildonarc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Discord</a>
            <a href="https://community.arc.network/home" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Arc House</a>
          </div>
        </div>
      </footer>
            
          </div>
          <p className="text-gray-600 text-xs">Built on Arc Testnet</p>
        </div>
      </footer>
    </main>
  );
}