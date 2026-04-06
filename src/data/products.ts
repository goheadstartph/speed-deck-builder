import type { ProductData } from "@/components/ProductCard";

export const products: ProductData[] = [
  // Digital Banks
  {
    id: "gotyme",
    name: "GoTyme Bank",
    slot: "digital-bank",
    grade: 95,
    dataPoints: [
      { label: "Min. Deposit", value: "₱0" },
      { label: "Interest Rate", value: "Up to 5% p.a." },
    ],
    proTip: "Get your debit card at any GoTyme kiosk in Robinsons malls. Takes 10 minutes flat.",
    applyUrl: "#",
    logoEmoji: "🏦",
  },
  {
    id: "maya",
    name: "Maya (PayMaya)",
    slot: "digital-bank",
    grade: 92,
    dataPoints: [
      { label: "Min. Deposit", value: "₱0" },
      { label: "Interest Rate", value: "Up to 15% p.a." },
    ],
    proTip: "Maya's time-deposit promo rates are among the highest — lock in early for max returns.",
    applyUrl: "#",
    logoEmoji: "💚",
  },
  {
    id: "seabank",
    name: "SeaBank",
    slot: "digital-bank",
    grade: 90,
    dataPoints: [
      { label: "Min. Deposit", value: "₱0" },
      { label: "Interest Rate", value: "Up to 5% p.a." },
    ],
    proTip: "Linked to Shopee — great for cashback stacking if you're already a Shopee user.",
    applyUrl: "#",
    logoEmoji: "🌊",
  },
  // Local Broker
  {
    id: "col-financial",
    name: "COL Financial",
    slot: "local-broker",
    grade: 88,
    dataPoints: [
      { label: "Min. Investment", value: "₱5,000" },
      { label: "Trading Fee", value: "0.25%" },
    ],
    proTip: "The OG PH broker. Great educational resources for beginners. Requires PhilID or valid gov't ID.",
    applyUrl: "#",
    logoEmoji: "📈",
  },
  {
    id: "investa",
    name: "InvestaWatcher",
    slot: "local-broker",
    grade: 85,
    dataPoints: [
      { label: "Min. Investment", value: "Varies" },
      { label: "Screener", value: "Free & Premium" },
    ],
    proTip: "Not a broker itself but an essential companion tool for stock screening and analysis.",
    applyUrl: "#",
    logoEmoji: "🔍",
  },
  // Global Broker
  {
    id: "gotrade",
    name: "GoTrade",
    slot: "global-broker",
    grade: 93,
    dataPoints: [
      { label: "Min. Investment", value: "$1 (Fractional)" },
      { label: "Commission", value: "Free" },
    ],
    proTip: "Buy US stocks with as little as $1. Best entry point for global investing from PH.",
    applyUrl: "#",
    logoEmoji: "🌐",
  },
  {
    id: "etoro",
    name: "eToro",
    slot: "global-broker",
    grade: 82,
    dataPoints: [
      { label: "Min. Deposit", value: "$50" },
      { label: "Commission", value: "0% stocks" },
    ],
    proTip: "Copy-trading feature lets you mirror top investors. Great for passive learners.",
    applyUrl: "#",
    logoEmoji: "🐂",
  },
  // Credit Builder
  {
    id: "gcredit",
    name: "GCredit (GCash)",
    slot: "credit-builder",
    grade: 87,
    dataPoints: [
      { label: "Credit Limit", value: "Up to ₱30,000" },
      { label: "Interest", value: "5%/month" },
    ],
    proTip: "Use it, pay it off immediately. This builds your credit score for future loans. Don't carry a balance.",
    applyUrl: "#",
    logoEmoji: "💳",
  },
  // Long-term Goal
  {
    id: "mp2",
    name: "Pag-IBIG MP2",
    slot: "long-term-goal",
    grade: 96,
    dataPoints: [
      { label: "Min. Savings", value: "₱500" },
      { label: "Dividend", value: "~7% p.a. (tax-free)" },
    ],
    proTip: "Government-backed, tax-free dividends. One of the best low-risk investments in PH. Start ASAP.",
    applyUrl: "#",
    logoEmoji: "🏠",
  },
  {
    id: "gcash-ginvest",
    name: "GInvest (GCash)",
    slot: "long-term-goal",
    grade: 80,
    dataPoints: [
      { label: "Min. Investment", value: "₱50" },
      { label: "Fund Type", value: "UITF / Money Market" },
    ],
    proTip: "Easiest way to start investing in funds. Low minimums, right inside your GCash app.",
    applyUrl: "#",
    logoEmoji: "📊",
  },
];
