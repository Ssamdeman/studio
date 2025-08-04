import Image from 'next/image';
import type { BuildStep } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BuildGuideProps {
  step: BuildStep;
}

export function BuildGuide({ step }: BuildGuideProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">{step.step}. {step.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center">
            <Image
                src={step.imageUrl}
                alt={step.title}
                width={600}
                height={400}
                className="w-full rounded-lg border object-cover aspect-[3/2] shadow-md"
                data-ai-hint={step.aiHint}
            />
        </div>
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Instructions</h3>
                <p className="text-muted-foreground">{step.instructions}</p>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Parts Needed for this Step</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {step.parts.map(part => (
                        <div key={part.id} className="flex items-center gap-2 p-2 rounded-md bg-muted border">
                            <Image src={part.imageUrl} alt={part.name} width={40} height={40} data-ai-hint={part.aiHint} className="object-contain" />
                            <div>
                                <p className="text-sm font-medium leading-tight">{part.name}</p>
                                <p className="text-xs text-muted-foreground">x{part.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
