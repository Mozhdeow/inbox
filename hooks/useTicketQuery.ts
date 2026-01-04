"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type TicketStatusFilter = "all" | "open" | "pending" | "closed";
export type TicketSort = "newest" | "oldest";

export function useTicketQuery() {
    const router = useRouter();
    const pathname = usePathname();
    const sp = useSearchParams();

    const query = useMemo(() => {
        const q = sp.get("q") ?? "";
        const status = (sp.get("status") ?? "all") as TicketStatusFilter;
        const sort = (sp.get("sort") ?? "newest") as TicketSort;
        const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10) || 1);

        return { q, status, sort, page };
    }, [sp]);

    const setParams = useCallback(
        (patch: Partial<{ q: string; status: TicketStatusFilter; sort: TicketSort; page: number }>, opts?: { resetPage?: boolean }) => {
            const params = new URLSearchParams(sp.toString());

            const apply = (key: string, value?: string) => {
                if (!value || value === "all" || value === "newest") params.delete(key);
                else params.set(key, value);
            };

            if (patch.q !== undefined) apply("q", patch.q.trim() || "");
            if (patch.status !== undefined) apply("status", patch.status === "all" ? "" : patch.status);
            if (patch.sort !== undefined) apply("sort", patch.sort === "newest" ? "" : patch.sort);

            const shouldReset = opts?.resetPage ?? false;
            if (patch.page !== undefined) {
                if (patch.page <= 1) params.delete("page");
                else params.set("page", String(patch.page));
            } else if (shouldReset) {
                params.delete("page");
            }

            const qs = params.toString();
            router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
        },
        [router, pathname, sp]
    );

    const clearFilters = useCallback(() => {
        router.replace(pathname, { scroll: false });
    }, [router, pathname]);


    return { ...query, setParams,clearFilters };
}
