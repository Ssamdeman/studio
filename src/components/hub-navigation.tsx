"use client";


import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ComponentList } from '@/components/component-list';
import { ListChecks, Wrench, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { useState } from 'react';

export function HubNavigation() {
  // Zero Phase 0 Dummy checklist items - you'll replace these
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Read safety guidelines", completed: false },
    { id: 2, text: "Prepare workspace", completed: false },
    { id: 3, text: "Download required app", completed: false },
    { id: 4, text: "Review building basics", completed: false },
  ]);


  //Phase 2 check list 
const [phase2ChecklistItems, setPhase2ChecklistItems] = useState([
  { id: 1, text: "Learn basic programming concepts", completed: false },
  { id: 2, text: "Practice with sensors", completed: false },
  { id: 3, text: "Master motor controls", completed: false },
  { id: 4, text: "Complete practice challenges", completed: false },
  ]);

    //phase 2 calculation 
  // Add these calculations
  const phase2CompletedCount = phase2ChecklistItems.filter(item => item.completed).length;
  const phase2TotalCount = phase2ChecklistItems.length;
  const phase2ProgressPercentage = (phase2CompletedCount / phase2TotalCount) * 100;
  const phase2AllCompleted = phase2CompletedCount === phase2TotalCount;

  // Handler for the phase 2  list 
  const handlePhase2ChecklistChange = (id: number, checked: boolean) => {
    setPhase2ChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: checked } : item
      )
    );
  };





  //Handler for the zero phase check list 
  const handleChecklistChange = (id: number, checked: boolean) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: checked } : item
      )
    );
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const totalCount = checklistItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;
  const allCompleted = completedCount === totalCount;

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Welcome to LEGO Building</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Prepare your kit and then start your building adventure.
        </p>
      </div>

      <div className="space-y-8">
        {/* Phase 1 Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-start gap-4 p-6">
            <div className="p-3 bg-muted rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl"> Preperation(Instructor Only)</CardTitle>
              <CardDescription>Complete these steps before building.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`checklist-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={(checked) => handleChecklistChange(item.id, checked as boolean)}
                  />
                  <label
                    htmlFor={`checklist-${item.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      item.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {item.text}
                  </label>
                </div>
              ))}
              
              {/* Progress Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Progress: {completedCount}/{totalCount}
                  </span>
                  {allCompleted && (
                    <div className="flex items-center text-green-600 animate-bounce">
                      <CheckCircle2 className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Complete!</span>
                    </div>
                  )}
                </div>
                <Progress 
                  value={progressPercentage} 
                  className={`h-2 ${allCompleted ? 'bg-green-100' : ''}`}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 1 Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border rounded-lg shadow-sm">
            <AccordionTrigger className="p-6 hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                    <ListChecks className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-left">Phase 1. Build your vehicle</h2>
                  <p className="text-sm text-muted-foreground text-left">Check your components before you begin.</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Sub-Accordion 1: Inventory */}
                <AccordionItem value="inventory" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
                          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-1">
                            <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                          </div>
                          <div className="w-6 h-6 bg-primary/80 rounded-sm flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-x-1">
                            <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-left">Inventory</h3>
                        <p className="text-sm text-muted-foreground text-left">View all components</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <Link 
                      href="/inventory" 
                      className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
                              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-2">
                                <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                              </div>
                              <div className="w-8 h-8 bg-primary/80 rounded flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-x-2">
                                <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Go to Inventory</p>
                            <p className="text-sm text-muted-foreground">Check all available components</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Sub-Accordion 2: Build */}
                <AccordionItem value="build" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
                          <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-1">
                            <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                          </div>
                          <div className="w-6 h-6 bg-primary/80 rounded-sm flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-x-1">
                            <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-left">Build</h3>
                        <p className="text-sm text-muted-foreground text-left">Start building process</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <Link 
                      href="/build" 
                      className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="flex items-center gap-1 transition-transform duration-300 group-hover:scale-110">
                              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-2">
                                <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                              </div>
                              <div className="w-8 h-8 bg-primary/80 rounded flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-x-2">
                                <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Go to Build</p>
                            <p className="text-sm text-muted-foreground">Start your building journey</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Phase 2 Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-start gap-4 p-6">
            <div className="p-3 bg-muted rounded-full">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Phase 2.Testing and Redesign </CardTitle>
              <CardDescription>Level up your robot and beat the challenges </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {phase2ChecklistItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={`phase3-checklist-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={(checked) => handlePhase2ChecklistChange(item.id, checked as boolean)}
                  />
                  <label
                    htmlFor={`phase3-checklist-${item.id}`}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      item.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {item.text}
                  </label>
                </div>
              ))}
              
              {/* Progress Bar */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Progress: {phase2CompletedCount}/{phase2TotalCount}
                  </span>
                </div>
                <Progress 
                  value={phase2ProgressPercentage} 
                  className={`h-2 ${phase2AllCompleted ? 'bg-green-100' : ''}`}
                />
                
                {/* Completion Message - Below and Centered */}
                {phase2AllCompleted && (
                  <div className="flex flex-col items-center justify-center mt-4 space-y-2">
                    <div className="flex items-center text-green-600 animate-bounce">
                      <CheckCircle2 className="h-6 w-6 mr-2" />
                      <span className="text-lg font-semibold">You're Ready for the Competition!</span>
                    </div>
                    <p className="text-sm text-green-600 text-center">
                      You've mastered the basics and tools. Time to take on the challenge!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>



        
        {/* Phase 3 Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-start gap-4 p-6">
             <div className="p-3 bg-muted rounded-full">
                <Wrench className="h-6 w-6 text-primary" />
             </div>
              <div>
                <CardTitle className="text-xl">Phase 3. Obstacle course race.</CardTitle>
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