import Link from 'next/link';
import { ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppShell } from './app-shell';

export function EmptySectionPage({ title }: { title: string }) {
  return (
    <AppShell>
      <div className="grid min-h-[calc(100dvh-46px)] place-items-center p-6">
        <section className="panel max-w-md p-8 text-center">
          <span className="mx-auto grid size-10 place-items-center rounded-full bg-accent text-primary"><Construction className="size-5" /></span>
          <h1 className="mt-4 text-lg font-bold">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">This module is ready for backend integration. No live records are available in the demo dataset yet.</p>
          <Button className="mt-5" variant="outline" render={<Link href="/dashboard" />}><ArrowLeft />Back to Dashboard</Button>
        </section>
      </div>
    </AppShell>
  );
}
