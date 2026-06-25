import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { seedStashes, seedUnstashed } from "./data";

// Fresh ids each time we re-seed the demo inbox so React keys stay unique.
// Doubled (two copies) so there are plenty of cards to sort while testing.
function freshInbox(): UnstashedItem[] {
  const now = Date.now();
  return [...seedUnstashed, ...seedUnstashed].map((item, i) => ({ ...item, id: `${item.id}-${now}-${i}` }));
}

export type Stash = { id: string; name: string; count: number; color: string };
// bg is a [start, end] gradient pair so items render as vibrant cards.
export type UnstashedItem = { id: string; label: string; source: string; bg: [string, string] };

type StoreValue = {
  ready: boolean;
  stashes: Stash[];
  unstashed: UnstashedItem[];
  addStash: (name: string, color: string) => void;
  /** Move an inbox item into a stash: removes the item and bumps the stash count. */
  sortItem: (itemId: string, stashId: string) => void;
  /** Dev helpers to flip the inbox between populated and empty on device. */
  seedInbox: () => void;
  clearInbox: () => void;
};

const KEY_STASHES = "@stash/stashes";
const KEY_UNSTASHED = "@stash/unstashed";

const StoreContext = createContext<StoreValue | null>(null);

export function StashProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [stashes, setStashes] = useState<Stash[]>([]);
  const [unstashed, setUnstashed] = useState<UnstashedItem[]>([]);
  const loaded = useRef(false);

  // Load from storage once, seeding defaults on first launch.
  useEffect(() => {
    (async () => {
      try {
        const [rawStashes, rawUnstashed] = await Promise.all([
          AsyncStorage.getItem(KEY_STASHES),
          AsyncStorage.getItem(KEY_UNSTASHED),
        ]);
        setStashes(rawStashes ? JSON.parse(rawStashes) : seedStashes);
        setUnstashed(rawUnstashed ? JSON.parse(rawUnstashed) : seedUnstashed);
      } catch {
        setStashes(seedStashes);
        setUnstashed(seedUnstashed);
      } finally {
        loaded.current = true;
        setReady(true);
      }
    })();
  }, []);

  // Persist after initial load whenever data changes.
  useEffect(() => {
    if (loaded.current) AsyncStorage.setItem(KEY_STASHES, JSON.stringify(stashes));
  }, [stashes]);
  useEffect(() => {
    if (loaded.current) AsyncStorage.setItem(KEY_UNSTASHED, JSON.stringify(unstashed));
  }, [unstashed]);

  const addStash = (name: string, color: string) => {
    const stash: Stash = { id: Date.now().toString(), name: name.trim(), count: 0, color };
    setStashes((prev) => [stash, ...prev]);
  };

  const sortItem = (itemId: string, stashId: string) => {
    setUnstashed((prev) => prev.filter((i) => i.id !== itemId));
    setStashes((prev) =>
      prev.map((s) => (s.id === stashId ? { ...s, count: s.count + 1 } : s)),
    );
  };

  const seedInbox = () => setUnstashed(freshInbox());
  const clearInbox = () => setUnstashed([]);

  return (
    <StoreContext.Provider value={{ ready, stashes, unstashed, addStash, sortItem, seedInbox, clearInbox }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StashProvider");
  return ctx;
}
