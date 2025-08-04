import { Progress } from '@/components/ui/progress';

interface GuideHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function GuideHeader({ currentStep, totalSteps }: GuideHeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="border-b bg-card sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
                 <h1 className="font-headline text-2xl font-bold">Driving Base</h1>
                 <span className="text-sm font-medium text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                 </span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
        </div>
    </div>
  );
}
