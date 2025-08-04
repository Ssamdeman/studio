import type { CodeStep } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CodeGuideProps {
  step: CodeStep;
}

export function CodeGuide({ step }: CodeGuideProps) {
    if (!step) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Code Complete</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>All coding steps for this build are complete.</p>
                </CardContent>
            </Card>
        );
    }
  return (
    <Card>
       <CardHeader>
        <CardTitle className="font-headline text-3xl">{step.step}. {step.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Explanation</h3>
            <p className="text-muted-foreground">{step.explanation}</p>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">Code</h3>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto border">
                <pre><code className="font-code text-sm text-foreground">{step.code}</code></pre>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
