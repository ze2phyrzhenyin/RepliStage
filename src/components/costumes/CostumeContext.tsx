"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CostumeVariant } from "@/types/script";

const COSTUME_STORAGE_KEY = "replistage_costumes_v1";
const LEGACY_COSTUME_STORAGE_KEY = "stagecue_costumes_v1";

type CostumeMap = Record<string, CostumeVariant>;

type CostumeContextValue = {
  costumes: CostumeMap;
  setCostume: (actorId: string, variant: CostumeVariant | null) => void;
  getCostume: (actorId: string) => CostumeVariant | null;
};

const CostumeContext = createContext<CostumeContextValue>({
  costumes: {},
  setCostume: () => {},
  getCostume: () => null,
});

function loadCostumes(): CostumeMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(COSTUME_STORAGE_KEY) ?? localStorage.getItem(LEGACY_COSTUME_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CostumeMap) : {};
  } catch {
    return {};
  }
}

export function CostumeProvider({ children }: { children: React.ReactNode }) {
  const [costumes, setCostumes] = useState<CostumeMap>(() => loadCostumes());

  useEffect(() => {
    try {
      localStorage.setItem(COSTUME_STORAGE_KEY, JSON.stringify(costumes));
    } catch {
      // quota exceeded — ignore
    }
  }, [costumes]);

  function setCostume(actorId: string, variant: CostumeVariant | null) {
    setCostumes((prev) => {
      if (variant === null) {
        const next = { ...prev };
        delete next[actorId];
        return next;
      }
      return { ...prev, [actorId]: variant };
    });
  }

  function getCostume(actorId: string): CostumeVariant | null {
    return costumes[actorId] ?? null;
  }

  return (
    <CostumeContext.Provider value={{ costumes, setCostume, getCostume }}>
      {children}
    </CostumeContext.Provider>
  );
}

export function useCostumes() {
  return useContext(CostumeContext);
}
