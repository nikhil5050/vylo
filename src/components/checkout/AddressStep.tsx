"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api";
import { createAddress, listAddresses, type SavedAddress } from "@/services/address.service";
import { AddressForm } from "./AddressForm";

const NEW_ADDRESS = "new";

interface AddressStepProps {
  // the address already chosen in this checkout, if the customer came back to edit it
  selectedId?: number;
  onSubmit: (address: SavedAddress) => void;
}

// Checkout's address step. Returning customers pick from their address book
// (default preselected) instead of retyping it every order; a new address is
// saved to the book right here, so placing the order always references a saved
// address by id — before this, every order re-created the same address,
// filling the book with duplicates.
export function AddressStep({ selectedId, onSubmit }: AddressStepProps) {
  const [saved, setSaved] = useState<SavedAddress[] | null>(null);
  const [selected, setSelected] = useState<string>(NEW_ADDRESS);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listAddresses()
      .then((addresses) => {
        // default first, then newest — the likeliest choices at the top
        const ordered = [...addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || b.id - a.id);
        setSaved(ordered);
        const initial = ordered.find((a) => a.id === selectedId) ?? ordered[0];
        if (initial) setSelected(String(initial.id));
      })
      // couldn't load the book — the new-address form still works
      .catch(() => setSaved([]));
  }, [selectedId]);

  async function handleNewAddress(value: Parameters<typeof createAddress>[0]) {
    setSaving(true);
    setError(null);
    try {
      onSubmit(await createAddress(value));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't save this address. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleUseSaved(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = saved?.find((a) => String(a.id) === selected);
    if (address) onSubmit(address);
  }

  if (saved === null) {
    return <p className="text-sm text-muted">Loading your saved addresses…</p>;
  }

  const newForm = (
    <>
      <AddressForm submitLabel={saving ? "Saving…" : "Continue to Delivery"} onSubmit={handleNewAddress} />
      {error && <p className="mt-3 text-sm text-burgundy">{error}</p>}
    </>
  );

  if (saved.length === 0) return newForm;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleUseSaved} className="flex flex-col gap-3">
        {saved.map((address) => (
          <label
            key={address.id}
            className="flex cursor-pointer items-start gap-3 border border-silver/50 p-4 has-[:checked]:border-burgundy"
          >
            <input
              type="radio"
              name="saved-address"
              value={address.id}
              checked={selected === String(address.id)}
              onChange={() => setSelected(String(address.id))}
              className="mt-1 h-4 w-4 accent-burgundy"
            />
            <span className="text-sm">
              <span className="block text-charcoal">
                {address.fullName}
                {address.isDefault && <span className="ml-2 text-xs text-burgundy">Default</span>}
              </span>
              <span className="block text-xs text-muted">
                {[address.line1, address.line2, address.city].filter(Boolean).join(", ")}, {address.state}{" "}
                {address.postalCode}
              </span>
              <span className="block text-xs text-muted">{address.phone}</span>
            </span>
          </label>
        ))}
        <label className="flex cursor-pointer items-center gap-3 border border-silver/50 p-4 has-[:checked]:border-burgundy">
          <input
            type="radio"
            name="saved-address"
            value={NEW_ADDRESS}
            checked={selected === NEW_ADDRESS}
            onChange={() => setSelected(NEW_ADDRESS)}
            className="h-4 w-4 accent-burgundy"
          />
          <span className="text-sm text-charcoal">Use a new address</span>
        </label>
        {selected !== NEW_ADDRESS && (
          <Button type="submit" variant="primary" size="md" className="mt-2 w-fit">
            Deliver Here
          </Button>
        )}
      </form>
      {selected === NEW_ADDRESS && newForm}
    </div>
  );
}
