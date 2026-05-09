import { useLocalStorage } from "@mantine/hooks";
import { useCallback, useMemo } from "react";
import { kitsById } from "../data/kits";

export type CartItem = {
  id: string;
  amount: number;
};

const STORAGE_KEY = "druz144.cart.v1";

function sanitize(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];
  const seen = new Set<string>();
  const result: CartItem[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;
    const candidate = raw as Partial<CartItem>;
    if (typeof candidate.id !== "string") continue;
    if (!(candidate.id in kitsById)) continue;
    if (seen.has(candidate.id)) continue;
    const amount = Math.floor(Number(candidate.amount));
    if (!Number.isFinite(amount) || amount <= 0) continue;
    seen.add(candidate.id);
    result.push({ id: candidate.id, amount });
  }
  return result;
}

export function useCart() {
  const [rawItems, setItems] = useLocalStorage<CartItem[]>({
    key: STORAGE_KEY,
    defaultValue: [],
    getInitialValueInEffect: false,
  });

  const items = useMemo(() => sanitize(rawItems), [rawItems]);

  const getAmount = useCallback(
    (id: string) => items.find((it) => it.id === id)?.amount ?? 0,
    [items],
  );

  const setAmount = useCallback(
    (id: string, amount: number) => {
      const next = Math.max(0, Math.floor(amount));
      setItems((prev) => {
        const cleaned = sanitize(prev);
        const existing = cleaned.findIndex((it) => it.id === id);
        if (next === 0) {
          if (existing === -1) return cleaned;
          return cleaned.filter((it) => it.id !== id);
        }
        if (existing === -1) {
          if (!(id in kitsById)) return cleaned;
          return [...cleaned, { id, amount: next }];
        }
        const copy = [...cleaned];
        copy[existing] = { id, amount: next };
        return copy;
      });
    },
    [setItems],
  );

  const addItem = useCallback(
    (id: string, n: number = 1) => {
      const delta = Math.max(0, Math.floor(n));
      if (delta === 0) return;
      setItems((prev) => {
        const cleaned = sanitize(prev);
        const existing = cleaned.findIndex((it) => it.id === id);
        if (existing === -1) {
          if (!(id in kitsById)) return cleaned;
          return [...cleaned, { id, amount: delta }];
        }
        const copy = [...cleaned];
        copy[existing] = { id, amount: copy[existing].amount + delta };
        return copy;
      });
    },
    [setItems],
  );

  const incrementItem = useCallback(
    (id: string) => addItem(id, 1),
    [addItem],
  );

  const decrementItem = useCallback(
    (id: string) => {
      setItems((prev) => {
        const cleaned = sanitize(prev);
        const existing = cleaned.findIndex((it) => it.id === id);
        if (existing === -1) return cleaned;
        const nextAmount = cleaned[existing].amount - 1;
        if (nextAmount <= 0) {
          return cleaned.filter((it) => it.id !== id);
        }
        const copy = [...cleaned];
        copy[existing] = { id, amount: nextAmount };
        return copy;
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => sanitize(prev).filter((it) => it.id !== id));
    },
    [setItems],
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const totalCount = useMemo(
    () => items.reduce((sum, it) => sum + it.amount, 0),
    [items],
  );

  return {
    items,
    totalCount,
    getAmount,
    setAmount,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clear,
  };
}
