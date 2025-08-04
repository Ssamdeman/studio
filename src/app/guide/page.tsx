'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { buildSteps, codeSteps } from '@/lib/build-data';
import { BuildGuide } from '@/components/build-guide';
import { CodeGuide } from '@/components/code-guide';
import { GuideHeader } from '@/components/guide-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, Home } from 'lucide-react';
import Link from 'next/link';

export default function GuidePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = buildSteps.length;
  const isFinished = currentStep === totalSteps;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleReset = () => {
    setCurrentStep(0);
  }

  if (isFinished) {
    return (
      <div className="flex-1">
        <div className="container mx-auto px-4 py-12 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
            <h1 className="mt-8 font-headline text-4xl font-bold">Congratulations!</h1>
            <p className="mt-4 text-muted-foreground md:text-xl">You've completed the build and code guide.</p>
            <div className="mt-8 flex justify-center gap-4">
                <Button onClick={handleReset} variant="outline">Build Again</Button>
                <Button asChild>
                    <Link href="/hub"><Home className="mr-2 h-4 w-4" /> Back to Hub</Link>
                </Button>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <GuideHeader currentStep={currentStep + 1} totalSteps={totalSteps} />
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="build" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="build">Build Mode</TabsTrigger>
            <TabsTrigger value="code">Code Mode</TabsTrigger>
          </TabsList>
          <TabsContent value="build" className="mt-6">
            <BuildGuide step={buildSteps[currentStep]} />
          </TabsContent>
          <TabsContent value="code" className="mt-6">
            <CodeGuide step={codeSteps[currentStep]} />
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between items-center">
          <Button onClick={handlePrev} disabled={currentStep === 0} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNext} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {currentStep === totalSteps - 1 ? 'Finish' : 'Next Step'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
