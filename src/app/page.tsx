import TotalsTable from '@/components/TotalsTable/TotalsTable';
import { fetchTotals } from '@/supabase/fetchTotals';

export default async function Home() {
  const totals = await fetchTotals();

  return (
    <div className="shadow-sm overflow-hidden my-8">
      <TotalsTable totals={totals} />
    </div>
  );
}
