import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ComponentList } from '@/components/component-list';
import { ListChecks, Wrench, ArrowRight } from 'lucide-react';

export function HubNavigation() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Main Hub</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Prepare your kit and then start your building adventure.
        </p>
      </div>

      <div className="space-y-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border rounded-lg shadow-sm">
            <AccordionTrigger className="p-6 hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                    <ListChecks className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-left">1. Prepare Your Kit</h2>
                  <p className="text-sm text-muted-foreground text-left">Check your components before you begin.</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ComponentList />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-start gap-4 p-6">
             <div className="p-3 bg-muted rounded-full">
                <Wrench className="h-6 w-6 text-primary" />
             </div>
              <div>
                <CardTitle className="text-xl">2. Start Building</CardTitle>
                <CardDescription>Follow the interactive guide to build your robot.</CardDescription>
              </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="mb-4 text-muted-foreground">
              Ready to bring your creation to life? Jump into our step-by-step interactive guide.
            </p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/guide">
                Go to Build & Code Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
