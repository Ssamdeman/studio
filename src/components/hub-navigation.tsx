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
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Welcome to LEGO Building & Coding</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
        The LEGO® Education SPIKE™ Prime Set, combines colorful LEGO building elements, easy-to-use hardware, and an intuitive drag-and-drop coding language based on Scratch. 
        Students will be engaged through playful learning activities to think critically and solve complex problems, regardless of their learning level. Participants will build, upgrade, and code software for their own LEGO vehicle, and will compete against each other’s vehicles in an obstacle course.
        Participants will also have the option to explore coding with Python.
        </p>
        <p className="mt-4 text-muted-foreground md:text-xl">
        This guide outlines and provides details on what participants and their guardians can expect throughout the day. The day will be split into three phases: 1) Vehicle building, 2) Code & Challenge  3) Obstacle course race.
        </p>
      </div>

      <div className="space-y-8">
        {/* Phase 0 Card */}
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

        {/* Phase 2 Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="phase2" className="border rounded-lg shadow-sm">
            <AccordionTrigger className="p-6 hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-full">
                    <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-left">Phase 2. Code and Challenge</h2>
                  <p className="text-sm text-muted-foreground text-left">Learn coding and take on exciting challenges.</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Sub-Accordion 1: Learn to Code */}
                <AccordionItem value="learn-code" className="border-none">
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
                        <h3 className="text-lg font-medium text-left">Let's learn to code your robot</h3>
                        <p className="text-sm text-muted-foreground text-left">Start programming your creation</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <Link 
                      href="/coding-tutorial" 
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
                            <p className="font-medium">Start Coding Tutorial</p>
                            <p className="text-sm text-muted-foreground">Learn basic programming concepts</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                {/* Sub-Accordion 2: Challenge 1 */}
                <AccordionItem value="challenge1" className="border-none">
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
                        <h3 className="text-lg font-medium text-left">Challenge 1</h3>
                        <p className="text-sm text-muted-foreground text-left">Basic movement challenge</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        Your first challenge is to program your robot to move forward, turn left, and stop. This challenge will test your understanding of basic motor controls and sequential programming. You'll need to use the movement blocks to create a simple path for your robot to follow.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Sub-Accordion 3: Challenge 2 */}
                <AccordionItem value="challenge2" className="border-none">
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
                        <h3 className="text-lg font-medium text-left">Challenge 2</h3>
                        <p className="text-sm text-muted-foreground text-left">Sensor-based navigation</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        In this challenge, you'll program your robot to use sensors to detect obstacles and navigate around them. This introduces you to conditional programming and sensor integration. Your robot should move forward until it detects an obstacle, then turn and continue moving.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Sub-Accordion 4: Challenge 3 */}
                <AccordionItem value="challenge3" className="border-none">
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
                        <h3 className="text-lg font-medium text-left">Challenge 3</h3>
                        <p className="text-sm text-muted-foreground text-left">Advanced programming task</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground">
                        The final challenge combines everything you've learned. Program your robot to complete a complex obstacle course using loops, conditions, and multiple sensors. This challenge will prepare you for competition-level programming and advanced robotics concepts.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* You can easily add more challenges here following the same pattern */}
                
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>


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