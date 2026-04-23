import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useSlugAvailability(slug: string) {
  const debouncedSlug = useDebounce(slug, 500);

  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedSlug) return;

    const check = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/check-slug?slug=${debouncedSlug}`
        );
        const data = await res.json();
        setAvailable(data.available);
      } catch {
        setAvailable(null);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [debouncedSlug]);

  const finalAvailable = debouncedSlug ? available : null;

  return { available: finalAvailable, loading };
}