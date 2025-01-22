'use client'

import { ProductsModule } from "@/modules";
import { useAudit } from "@/shared/tools/auditMonit";

export default function Home() {
  const { addAuditLog } = useAudit()

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-2 p-2 rounded bg-white">
        <ProductsModule />
    </section>
  );
}