import Image from 'next/image';
import { allLegoParts } from '@/lib/build-data';
import { Card, CardContent } from '@/components/ui/card';

export function ComponentList() {
  return (
    <div className="border-t">
        <div className="p-6 bg-muted/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {allLegoParts.map((part) => (
                <Card key={part.id} className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <Image
                        src={part.imageUrl}
                        alt={part.name}
                        width={80}
                        height={80}
                        className="aspect-square object-contain"
                        data-ai-hint={part.aiHint}
                    />
                    <div className="flex-grow flex flex-col justify-center">
                        <p className="text-sm font-medium leading-tight">{part.name}</p>
                        <p className="text-xs text-muted-foreground">x{part.quantity}</p>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
