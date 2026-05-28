import { Suspense } from 'react';
import TicketsListPage from '@/components/TicketsListPage';

export default function Page() {
  return (
    <Suspense>
      <TicketsListPage />
    </Suspense>
  );
}
