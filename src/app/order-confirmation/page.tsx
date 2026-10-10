"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getOrderByNumber } from "@/services/order.service";
import type { Order } from "@/types/order";
import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";

export default function OrderConfirmationPage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <OrderConfirmationContent />
      </Suspense>
    </RequireAuth>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

const NEXT_STEPS = [
  { title: "Order Confirmed", body: "We've received your order and it's in our queue." },
  { title: "Handcrafted & Packed", body: "Each piece is quality-checked and gift-wrapped in Vylore packaging." },
  { title: "Shipped", body: "You'll get a tracking link as soon as your parcel is on its way." },
  { title: "Delivered", body: "Your jewellery arrives at your doorstep, ready to be worn." },
];

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order_number");
  const [order, setOrder] = useState<Order | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    Promise.resolve(orderNumber ? getOrderByNumber(orderNumber) : undefined).then((result) =>
      setOrder(result ?? null),
    );
  }, [orderNumber]);

  if (order === undefined) return <ConfirmationSkeleton />;

  if (!order) {
    return (
      <main className="flex flex-1 flex-col py-16 lg:py-24">
        <Container>
          <EmptyState
            title="No order found"
            description="We couldn't find that order. If you just paid, it may take a moment to confirm."
            action={
              <Button href="/account/orders" variant="primary" size="md">
                View Your Orders
              </Button>
            }
          />
        </Container>
      </main>
    );
  }

  return <Confirmation order={order} />;
}

function Confirmation({ order }: { order: Order }) {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const isCod = order.paymentStatus === "cod_pending";
  const firstName = order.shippingRecipientName.trim().split(/\s+/)[0];
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const placedOn = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function rise(delay: number) {
    return reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };
  }

  async function copyOrderNumber() {
    try {
      await navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context / permissions) — the number stays visible either way.
    }
  }

  const meta = [
    { label: "Order Date", value: placedOn },
    { label: "Items", value: `${itemCount} ${itemCount === 1 ? "piece" : "pieces"}` },
    { label: "Payment", value: isCod ? "Cash on Delivery" : "Paid Online" },
    { label: "Total", value: formatPrice(order.total) },
  ];

  return (
    <main className="flex flex-1 flex-col pb-16 lg:pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden bg-burgundy text-ivory">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, color-mix(in srgb, var(--gold) 35%, transparent), transparent 70%), radial-gradient(40% 60% at 100% 100%, color-mix(in srgb, var(--cherry) 70%, transparent), transparent 70%)",
          }}
        />
        <Sparkles disabled={!!reduceMotion} />

        <Container className="relative flex max-w-3xl flex-col items-center pt-14 pb-28 text-center sm:pt-20 sm:pb-36">
          <SuccessBadge animate={!reduceMotion} />

          <motion.p {...rise(0.5)} className="eyebrow mt-8 text-xs text-ivory/70">
            {isCod ? "Order Placed" : "Payment Successful"}
          </motion.p>
          <motion.h1 {...rise(0.6)} className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">
            Thank you{firstName ? `, ${firstName}` : ""}.
          </motion.h1>
          <motion.p {...rise(0.7)} className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80 sm:text-base">
            Your Vylore piece is now being prepared with care. We&apos;ll keep you updated at every step.
          </motion.p>

          <motion.button
            {...rise(0.8)}
            type="button"
            onClick={copyOrderNumber}
            className="group mt-7 inline-flex items-center gap-3 rounded-full border border-ivory/30 bg-ivory/10 px-5 py-2.5 text-sm backdrop-blur-sm transition-colors hover:bg-ivory/20"
          >
            <span className="text-ivory/70">Order</span>
            <span className="font-medium tracking-wide">#{order.orderNumber}</span>
            <span className="text-xs text-ivory/70 group-hover:text-ivory" aria-live="polite">
              {copied ? "Copied ✓" : "Copy"}
            </span>
          </motion.button>
        </Container>
      </section>

      <Container className="relative -mt-16 max-w-5xl sm:-mt-20">
        {/* Order meta strip */}
        <motion.div
          {...rise(0.9)}
          className="grid grid-cols-2 overflow-hidden rounded-lg bg-white shadow-[0_18px_50px_-20px_rgba(24,25,22,0.35)] sm:grid-cols-4"
        >
          {meta.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "px-5 py-5 sm:px-6 sm:py-6",
                i % 2 === 1 && "border-l border-silver/30",
                i >= 2 && "border-t border-silver/30 sm:border-t-0",
                i === 2 && "sm:border-l",
              )}
            >
              <p className="eyebrow text-[10px] text-muted sm:text-xs">{item.label}</p>
              <p className={cn("mt-1.5 text-sm text-charcoal sm:text-base", item.label === "Total" && "font-serif text-lg text-burgundy sm:text-xl")}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        {isCod && (
          <motion.div
            {...rise(1)}
            className="mt-5 flex items-start gap-3 rounded-lg border border-gold/40 bg-moonlight/60 px-5 py-4 text-sm text-charcoal"
          >
            <span aria-hidden="true" className="mt-0.5 text-gold">✦</span>
            <p>
              Please keep <span className="font-medium">{formatPrice(order.total)}</span> ready to pay in cash when
              your order arrives.
            </p>
          </motion.div>
        )}

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8">
          {/* Order summary */}
          <motion.section {...rise(1.05)} className="rounded-lg border border-silver/30 bg-white p-5 sm:p-8">
            <h2 className="font-serif text-2xl text-charcoal">Order Summary</h2>

            <ul className="mt-5 divide-y divide-silver/25">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-moonlight font-serif text-lg text-burgundy"
                  >
                    {item.productName.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-charcoal sm:text-base">{item.productName}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Qty {item.quantity} · {formatPrice(item.unitPrice)} each
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-charcoal sm:text-base">{formatPrice(item.total)}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-2 space-y-2.5 border-t border-silver/30 pt-5 text-sm">
              <SummaryRow label="Subtotal" value={formatPrice(order.subtotal)} />
              {order.discount > 0 && (
                <SummaryRow label="Discount" value={`− ${formatPrice(order.discount)}`} valueClassName="text-burgundy" />
              )}
              <SummaryRow label="Shipping" value={order.shippingFee > 0 ? formatPrice(order.shippingFee) : "Free"} />
              {order.tax > 0 && <SummaryRow label="Tax" value={formatPrice(order.tax)} />}
              <div className="flex items-baseline justify-between border-t border-silver/30 pt-4">
                <dt className="text-base text-charcoal">Total</dt>
                <dd className="font-serif text-2xl text-burgundy">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </motion.section>

          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Shipping address */}
            <motion.section {...rise(1.15)} className="rounded-lg border border-silver/30 bg-white p-5 sm:p-8">
              <p className="eyebrow text-xs text-muted">Shipping To</p>
              <p className="mt-3 font-serif text-xl text-charcoal">{order.shippingRecipientName}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {order.shippingAddressLine1}
                {order.shippingAddressLine2 ? `, ${order.shippingAddressLine2}` : ""}
                <br />
                {order.shippingCity}, {order.shippingState} {order.shippingPostalCode}
                <br />
                {order.shippingCountry}
              </p>
              {order.shippingPhone && <p className="mt-3 text-sm text-charcoal">{order.shippingPhone}</p>}
            </motion.section>

            {/* What's next */}
            <motion.section {...rise(1.25)} className="rounded-lg bg-moonlight/60 p-5 sm:p-8">
              <h2 className="font-serif text-xl text-charcoal">What happens next</h2>
              <ol className="mt-5">
                {NEXT_STEPS.map((step, i) => {
                  const done = i === 0;
                  const last = i === NEXT_STEPS.length - 1;
                  return (
                    <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                      {!last && (
                        <span
                          aria-hidden="true"
                          className={cn("absolute top-7 left-[13px] h-[calc(100%-1.75rem)] w-px", done ? "bg-burgundy" : "bg-silver/60")}
                        />
                      )}
                      <span
                        className={cn(
                          "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs",
                          done ? "bg-burgundy text-ivory" : "border border-silver bg-white text-muted",
                        )}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      <div className="pt-0.5">
                        <p className={cn("text-sm", done ? "font-medium text-burgundy" : "text-charcoal")}>{step.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">{step.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </motion.section>
          </div>
        </div>

        <motion.div
          {...rise(1.35)}
          className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Button href={`/account/orders/view?id=${order.id}`} variant="primary" size="lg">
            View Order Details
          </Button>
          <Button href="/shop" variant="secondary" size="lg">
            Continue Shopping
          </Button>
        </motion.div>

        <p className="mt-8 text-center text-sm text-muted">
          Need help with your order?{" "}
          <Link href="/contact" className="text-burgundy underline underline-offset-4 hover:text-cherry">
            Contact us
          </Link>
        </p>
      </Container>
    </main>
  );
}

function SummaryRow({ label, value, valueClassName }: { label: string; value: string; valueClassName?: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={cn("text-charcoal", valueClassName)}>{value}</dd>
    </div>
  );
}

function SuccessBadge({ animate }: { animate: boolean }) {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
      {animate && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-ivory/40"
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, repeatDelay: 0.6, ease: "easeOut" }}
        />
      )}
      <motion.div
        className="flex h-full w-full items-center justify-center rounded-full bg-ivory shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
        initial={animate ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <svg viewBox="0 0 52 52" className="h-12 w-12 sm:h-14 sm:w-14" aria-hidden="true">
          <motion.path
            d="M14 27 l8 8 l16 -18"
            fill="none"
            stroke="var(--maroon)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={animate ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
      <span className="sr-only">Order confirmed</span>
    </div>
  );
}

// Fixed positions (not Math.random) so server and client markup match.
const SPARKLES = [
  { left: "8%", top: "22%", size: 10, delay: 0.2 },
  { left: "18%", top: "68%", size: 6, delay: 0.9 },
  { left: "30%", top: "12%", size: 7, delay: 1.4 },
  { left: "70%", top: "16%", size: 9, delay: 0.5 },
  { left: "82%", top: "58%", size: 12, delay: 1.1 },
  { left: "92%", top: "26%", size: 6, delay: 1.8 },
  { left: "60%", top: "78%", size: 7, delay: 0.7 },
  { left: "40%", top: "82%", size: 5, delay: 1.6 },
];

function Sparkles({ disabled }: { disabled: boolean }) {
  if (disabled) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-gold"
          style={{ left: s.left, top: s.top, fontSize: s.size * 2 }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90, 180] }}
          transition={{ duration: 2.6, delay: s.delay, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

function ConfirmationSkeleton() {
  return (
    <main className="flex flex-1 flex-col pb-16" aria-busy="true">
      <div className="h-[360px] animate-pulse bg-burgundy/80 sm:h-[420px]" />
      <Container className="-mt-16 max-w-5xl">
        <div className="h-24 animate-pulse rounded-lg bg-moonlight" />
        <div className="mt-8 h-72 animate-pulse rounded-lg bg-moonlight/60" />
      </Container>
    </main>
  );
}
