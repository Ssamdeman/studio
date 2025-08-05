"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ComponentList } from '@/components/component-list';
import { ListChecks, Wrench, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react'; 

export function HubNavigation() {
  // Zero Phase 0 Dummy checklist items - you'll replace these
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Login into CFIC Account in the Laptop [Not a Guess Account]", completed: false },
    { id: 2, text: "Ensure all computers are fully charged and updated", completed: false },
    { id: 3, text: "Ensure LEGO Education SPIKE app is installed", completed: false },
    { id: 4, text: "Ensure all LEGO modules are successfully connected to the Education SPIKE app", completed: false },
  ]);

  // Carousel state and images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    {
      src: "/models/spikeprime.jpg",
      //alt: "LEGO SPIKE Prime Set with colorful building elements"
    },
    {
      src: "/models/p-1-90328175-lego-spike.jpg",
      //alt: "Students coding and building with LEGO robotics"
    },
    {
      src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop",
     // alt: "LEGO vehicle obstacle course setup"
    },
    {
      src: "/models/9nfqz9rdnd2q-featured.webp",
      //alt: "Interactive drag-and-drop coding interface"
    },
    {
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop",
     // alt: "Students collaborating on LEGO robotics project"
    }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Handler for the zero phase check list (FIXED: Only defined once)
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

         {/* Image Carousel - Full Width, Top Aligned */}
      <div className="relative -mt-12 -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <div className="relative h-64 sm:h-80 overflow-hidden shadow-xl">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-hidden={index !== currentImageIndex}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-white text-sm font-medium drop-shadow-lg">
                    {image.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentImageIndex
                  ? 'bg-red-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Welcome to <strong className="font-semibold text-red-500" > LEGO </strong> Building & Coding</h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
        The LEGO® Education SPIKE™ Prime Set, combines colorful LEGO building elements, easy-to-use hardware, and an intuitive drag-and-drop coding language based on Scratch. 
        Students will be engaged through playful learning activities to think critically and solve complex problems, regardless of their learning level. Participants will build, upgrade, and code software for their own LEGO vehicle, and will compete against each other’s vehicles in an obstacle course.
        Participants will also have the option to explore coding with Python.
        </p>
        <p className="mt-4 text-muted-foreground md:text-xl">
        This guide outlines and provides details on what participants and their guardians can expect throughout the day. The day will be split into three phases: 1) Vehicle building, 2) Code and challenges  3) Obstacle course race.
        </p>
      </div>

      <div className="space-y-8">
        {/* Phase 0 Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-start gap-4 p-6">
            <div className="p-3 bg-muted rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Preperation (Instructor Only)</CardTitle>
              <CardDescription>Complete these steps before building.</CardDescription>
            </div>
            <img 
              src="/models/lego_teacher.png" 
              alt="Preparation icon" 
              className="w-25 h-20 rounded object-cover flex-shrink-1 ml-5"
            />
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
                <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-left">Phase 1. Build your vehicle</h2>
                      <p className="text-sm text-muted-foreground text-left">Check your components before you begin.</p>
                    </div>
                    <img 
                      src="/models/Lego_car copy.jpg" 
                      alt="Vehicle building icon" 
                      className="w-25 h-20 rounded object-cover flex-shrink-0 ml-4"
                    />
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
                      href="https://assets.education.lego.com/v3/assets/blt293eea581807678a/blt28cad37f1f002fd3/5f8801b982eaa522ca601c89/le_spike_prime_element_overview.pdf?locale=en-us" 
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
                      href="https://assets.education.lego.com/v3/assets/blt293eea581807678a/blte58422fa7d508a60/5f8802b882eaa522ca601c9f/driving-base-bi-pdf-book1of1.pdf?locale=en-us" 
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
                  <h2 className="text-xl font-semibold text-left">Phase 2. Code and challenges</h2>
                  <p className="text-sm text-muted-foreground text-left">
                  The Challenge Ground is an interactive space where students learn how robots work through hands-on design and coding. 
                  Each challenge introduces a new sensor, blending hardware with logic. 
                  Students choose Python or Word Blocks, building both coding and robotics skills.
                  </p>
                  <p className="text-sm text-muted-foreground text-left mt-2">
                    <strong>End State:</strong> Students emerge better prepared and more competitive for the main competition.
                  </p>
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
                      href="https://primelessons.org/en/ProgrammingLessons/SP3BlockGuide.pdf" 
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
                            <p className="font-medium">Start Coding Tutorial - Word Blocks</p>
                            <p className="text-sm text-muted-foreground">Learn basic word blocks concepts</p>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </AccordionContent>
                  

                  <AccordionContent className="px-6 pb-4">
                    <Link 
                      href="https://primelessons.org/en/ProgrammingLessons/SP3BlockGuide.pdf" 
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
                            <p className="font-medium">Start Coding Tutorial - Python Coding</p>
                            <p className="text-sm text-muted-foreground">Learn basic python programming concepts for the robot</p>
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
                        <h3 className="text-lg font-medium text-left">Challenge 1 - A Robot's First Steps</h3>
                        <p className="text-sm text-muted-foreground text-left">Basic movement challenge</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-4">
                      {/* Main Description */}
                      <div className="flex items-start space-x-3">
                        <p className="text-sm text-muted-foreground">
                          Challengers will program their robot to follow a guided line to guide their programming efforts. This will allow challengers to understand the basic movement capabilities of their robot: turn left, turn right, forward.
                        </p>
                      </div>

                      {/* Difficulty Levels */}
                      <div className="ml-6 space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">APPRENTICE</span> ~ Trace a Box pattern on the obstacle surface
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">TECHNICIAN</span> ~ Trace a Triangle pattern on the obstacle surface
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">MASTER</span> ~ Trace a Figure 8 pattern on the obstacle surface
                          </p>
                        </div>
                      </div>
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
                        <h3 className="text-lg font-medium text-left">Challenge 2 - Colors are Hard</h3>
                        <p className="text-sm text-muted-foreground text-left">Color sensor navigation</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-4">
                      {/* Main Description */}
                      <p className="text-sm text-muted-foreground">
                        Challengers will design their robot to use the color sensor. When their robot comes into contact with a certain color, it performs a certain movement (stop, turn left, turn right, forward, reverse, spin) which sets their robot up to come into contact with the next color.
                      </p>

                      {/* Difficulty Levels */}
                      <div className="ml-6 space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">APPRENTICE</span> ~ Navigate 2 Color Sensor Obstacles
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">TECHNICIAN</span> ~ Navigate 3 Color Sensor Obstacles
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">MASTER</span> ~ Navigate ALL Color Sensor Obstacles
                          </p>
                        </div>
                      </div>
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
                        <h3 className="text-lg font-medium text-left">Challenge 3 - I See You!</h3>
                        <p className="text-sm text-muted-foreground text-left">Distance sensor detection</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-4">
                      {/* Main Description */}
                      <p className="text-sm text-muted-foreground">
                        Challengers will come into contact with tall objects they will need to navigate around either dictated by what that obstacle says (example "stop 5cm before this object") or challengers discretion.
                      </p>

                      {/* Difficulty Levels */}
                      <div className="ml-6 space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">APPRENTICE</span> ~ Navigate 1 Distance Sensor Obstacles
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">TECHNICIAN</span> ~ Navigate 3 Distance Sensor Obstacles
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">MASTER</span> ~ Navigate ALL Distance Sensor Obstacles
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Sub-Accordion 5: Challenge 4 */}
                <AccordionItem value="challenge4" className="border-none">
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
                        <h3 className="text-lg font-medium text-left">Challenge 4 - Ouch! Did I just hit something?</h3>
                        <p className="text-sm text-muted-foreground text-left">Force sensor interaction</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-4">
                      {/* Main Description */}
                      <p className="text-sm text-muted-foreground">
                        This final challenge of the force sensor will enable challengers to gain familiarization when the sensor is "pressed, hard-pressed, released, or pressure has changed". There will be an obstacle for each action as stated above. Challengers will need to read what the obstacle is requiring them to do with their force sensor to be successful.
                      </p>

                      {/* Difficulty Levels */}
                      <div className="ml-6 space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">APPRENTICE</span> ~ Navigate 2 Force Sensor Obstacles
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">TECHNICIAN</span> ~ Navigate 3 Force Sensor Obstacles
                          </p>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 border border-foreground rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold text-foreground">MASTER</span> ~ Navigate ALL Force Sensor Obstacles
                          </p>
                        </div>
                      </div>
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