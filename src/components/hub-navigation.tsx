"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ComponentList } from '@/components/component-list';
import { ListChecks, Wrench, ArrowRight, CheckCircle2, BookOpen, TrendingUpDown, Code} from 'lucide-react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react'; 
import { Trophy } from 'lucide-react'; 



//python code shell. 
const pythonStarterCode = `# LEGO SPIKE Prime Robot - Python Starter Code
import motor
import motor_pair
from hub import port, sound, light_matrix, light, button, motion_sensor, port
import time
import runloop
import color
import color_sensor
import force_sensor
import distance_sensor
import color_matrix
import device


# Constants
force_threshold = 50
speed = 720
degrees = 360


# Simplified Movement Function
def move_motors(a_speed, b_speed, value):
    motor.run(port.A, a_speed)
    motor.run(port.B, b_speed)
    time.sleep((value * degrees) / speed)
    motor.stop(port.A)
    motor.stop(port.B)


# Move Forward
def move_forward(value):
    move_motors(speed, speed, value)


# Move Backward
def move_backward(value):
    move_motors(-speed, -speed, value)


# Turn Left
def turn_left(value):
    move_motors(-speed, speed, value)


# Turn Right
def turn_right(value):
    move_motors(speed, -speed, value)




# Sensor Handlers
#_______ Button Sensor_______________________________
def Button():
    force = force_sensor.force(port.C)
    if force > force_threshold:
         # Add your code here:
        move_forward(1)


    else:
         # Add your code here:
        motor.stop(port.A)
        motor.stop(port.B)






#_______Color Sensor_______________________________


def check_color():
    detected_color = color_sensor.color(port.D)
    if detected_color == color.RED: # You can change the color or add more colors.
       
         # Add your code here:
        move_forward(1)


    else:
        # Add your code here:
        motor.stop(port.A)
        motor.stop(port.B)




#_______ Distance Sensor_______________________________
def Distance(threshold_cm=10):
    distance_cm = distance_sensor.distance(port.E)
    if distance_cm < threshold_cm:
        motor.stop(port.A)
        motor.stop(port.B)




#________________ Dummy functions to use all imports ___________________
def use_sound():
    sound.beep()


def use_light_matrix():
    light_matrix.show_image('HAPPY')


def use_light():
    light.on('blue')


def use_button():
    if button.pressed():
        print("Button pressed!")


def use_motion_sensor():
    angle = motion_sensor.tilt_angle()
    print(f"Tilt angle: {angle}")


def use_color_matrix():
    color_matrix.show([[color.RED]*5]*5)


def use_device():
    info = device.info()
    print("Device info:", info)


# ______________________________________________________


# _______________________Main Function___________________________________
async def main():
    motor_pair.pair(1, port.A, port.B)




# Add your code here:


    #Example:
    move_forward(1)
    await runloop.sleep_ms(1000) # 'await' tells the robot to wait before doing the next function


    move_backward(1)
    await runloop.sleep_ms(1000)


    turn_left(1)
    await runloop.sleep_ms(1000)


    turn_right(1)
    await runloop.sleep_ms(1000)


# Call dummy usage functions here to make them 'used'
    use_sound()
    use_light_matrix()
    use_light()
    use_button()
    use_motion_sensor()
    use_color_matrix()
    use_device()


# Run loop for sensor checks.
# The "while true" method allows for a function to stay 'alive' during the running of the program.
    while True:
        Button()
        check_color()
        Distance()
        await runloop.sleep_ms(100)
#________________________________________ End of Main function ________________________________________________




# Run the async main function using runloop
runloop.run(main)`;


// PythonTutorialExpandable component - place this outside your HubNavigation component
function PythonTutorialExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pythonStarterCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <>
      {/* Clickable trigger */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="relative h-14 w-10">
                {/* Bottom LEGO brick (stationary) - Blue */}
                <div className="absolute bottom-0 left-0 w-10 h-6 bg-pink-400 rounded border-2 border-pink-600">
                  {/* Bottom brick studs */}
                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                </div>
                
                {/* Top LEGO brick (animated) - Pink */}
                <div className="absolute top-0 left-0 w-10 h-6 bg-blue-500 rounded border-2 border-blue-700 transition-transform duration-700 ease-in-out group-hover:translate-y-7">
                  {/* Top brick studs */}
                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium">Start Coding Tutorial - Python Coding</p>
              <p className="text-sm text-muted-foreground">Learn basic Python programming concepts for the robot</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
      </div>

      {/* Expandable code section */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Python Starter Code</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
            <code>{pythonStarterCode}</code>
          </pre>
        </div>
      )}
    </>
  );
}



 


export function HubNavigation() {
  // Zero Phase 0 Dummy checklist items - you'll replace these
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "Log into CFIC account on the laptop [not a guest account]", completed: false },
    { id: 2, text: "Ensure all computers are fully charged and updated", completed: false },
    { id: 3, text: "Ensure LEGO Education SPIKE app is installed via Microsoft Store", completed: false },
    { id: 4, text: "Ensure all LEGO modules are successfully connected to the Education SPIKE app", completed: false },
  ]);

  // Carousel state and images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselImages = [
    {
      src: "/models/spikeprime.jpg",
      //alt: "LEGO SPIKE Prime Set with colorful building elements"
      position: "center 10%" // shifts this image up
    },
    {
      src: "/models/p-1-90328175-lego-spike.jpg",
      //alt: "Students coding and building with LEGO robotics"
      position: "center 10%" // shifts this image up
    },
    {
      src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop",
     // alt: "LEGO vehicle obstacle course setup"
    },
    // {
    //   //src: "/models/9nfqz9rdnd2q-featured.webp",
    //   //alt: "Interactive drag-and-drop coding interface"
    // },
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

  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);



  //python shell. 
  // Add these state variables inside your HubNavigation component

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pythonStarterCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };


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
                backgroundPosition: image.position || 'center',
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
          <CardHeader className="flex flex-row items-center gap-4 p-6">
            <div className="p-3 bg-muted rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Preparation (Instructor Only)</CardTitle>
              <CardDescription>Complete these steps before building.</CardDescription>
            </div>
            <img 
              src="/models/lego_teacher.png" 
              alt="Preparation icon" 
              className="w-25 h-20 rounded object-cover flex-shrink-0"
            />
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
                <div className="flex items-center gap-4 w-full">
                  <div className="p-3 bg-muted rounded-full">
                    <ListChecks className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-left">Phase 1. Build Your Vehicle</h2>
                    <p className="text-sm text-muted-foreground text-left">Check your inventory before you start building.</p>
                  </div>
                  <img 
                    src="/models/g-image_12315824.png" 
                    alt="Vehicle building icon" 
                   className="w-[19%] h-[9%] rounded object-cover flex-shrink-0"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Sub-Accordion 1: Inventory */}
                  <AccordionItem value="inventory" className="border-none">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="relative group">
                          <div className="relative h-12 w-8">


                            {/* Bottom LEGO brick (stationary) - Yellow */}
                            <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600">
                              {/* Bottom brick studs */}
                              <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                              <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            </div>
                            
                            {/* Top LEGO brick (animated) - Red */}
                            <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-transform duration-700 ease-in-out group-hover:translate-y-6">
                              {/* Top brick studs */}
                              <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                              <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="relative h-14 w-10">

                                {/* Bottom LEGO brick (stationary) - Blue */}
                                <div className="absolute bottom-0 left-0 w-10 h-6 bg-pink-400 rounded border-2 border-pink-600">
                                  {/* Bottom brick studs */}
                                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                </div>
                                
                                {/* Top LEGO brick (animated) - Pink */}
                                <div className="absolute top-0 left-0 w-10 h-6 bg-blue-500 rounded border-2 border-blue-700 transition-transform duration-700 ease-in-out group-hover:translate-y-7">
                                  {/* Top brick studs */}
                                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
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
                          <div className="relative h-12 w-8">
                            {/* Bottom LEGO brick (stationary) - Yellow */}
                            <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600">
                              {/* Bottom brick studs */}
                              <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                              <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            </div>
                            
                            {/* Top LEGO brick (animated) - Red */}
                            <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-transform duration-700 ease-in-out group-hover:translate-y-6">
                              {/* Top brick studs */}
                              <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                              <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="relative h-14 w-10">
                               
                               {/* Bottom LEGO brick (stationary) - Blue */}
                               <div className="absolute bottom-0 left-0 w-10 h-6 bg-pink-400 rounded border-2 border-pink-600">
                                  {/* Bottom brick studs */}
                                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                </div>
                                
                                {/* Top LEGO brick (animated) - Pink */}
                                <div className="absolute top-0 left-0 w-10 h-6 bg-blue-500 rounded border-2 border-blue-700 transition-transform duration-700 ease-in-out group-hover:translate-y-7">
                                  {/* Top brick studs */}
                                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
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
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-muted rounded-full">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-left">Phase 2. Code and Challenges</h2>
                  <p className="text-sm text-muted-foreground text-left">Learn programming and complete sensor challenges.</p>
                </div>
                <img 
                  src="/models/14418063.png" 
                  alt="Code and challenges icon" 
                  className="w-[17%] h-[14%] rounded object-cover flex-shrink-0"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Accordion type="single" collapsible className="w-full">
                {/* Sub-Accordion 1: Learn to Code */}
                <AccordionItem value="learn-code" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="relative h-12 w-8">
                          
                          {/* Bottom LEGO brick (stationary) - Yellow */}
                          <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600 transition-all duration-700 ease-in-out group-hover:rotate-0">
                            {/* Bottom brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                          </div>
                          
                          {/* Top LEGO brick (animated) - Red */}
                          <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-all duration-700 ease-in-out group-hover:rotate-0 group-hover:translate-y-6">
                            {/* Top brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-left">Code your robot</h3>
                        <p className="text-sm text-muted-foreground text-left">Start programming your creation</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <Link 
                      href="https://primelessons.org/en/ProgrammingLessons/SP3BlockGuide.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group"
                    >
                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="relative h-14 w-10">
                              {/* Bottom LEGO brick (stationary) - Blue */}
                              <div className="absolute bottom-0 left-0 w-10 h-6 bg-pink-400 rounded border-2 border-pink-600">
                                  {/* Bottom brick studs */}
                                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                </div>
                                
                                {/* Top LEGO brick (animated) - Pink */}
                                <div className="absolute top-0 left-0 w-10 h-6 bg-blue-500 rounded border-2 border-blue-700 transition-transform duration-700 ease-in-out group-hover:translate-y-7">
                                  {/* Top brick studs */}
                                  <div className="absolute -top-1 left-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                                  <div className="absolute -top-1 right-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>

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
                      <div 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="block p-4 rounded-lg border border-muted bg-card hover:bg-accent hover:text-accent-foreground transition-colors duration-200 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="relative h-14 w-10">
                              {/* Bottom LEGO brick (stationary) - Blue */}
                                  <div className="absolute bottom-0 left-0 w-10 h-6 bg-pink-400 rounded border-2 border-pink-600">
                                    {/* Bottom brick studs */}
                                    <div className="absolute -top-1 left-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                    <div className="absolute -top-1 right-1.5 w-2 h-2 bg-pink-600 rounded-full"></div>
                                  </div>
                                  
                                  {/* Top LEGO brick (animated) - Pink */}
                                  <div className="absolute top-0 left-0 w-10 h-6 bg-blue-500 rounded border-2 border-blue-700 transition-transform duration-700 ease-in-out group-hover:translate-y-7">
                                    {/* Top brick studs */}
                                    <div className="absolute -top-1 left-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                                    <div className="absolute -top-1 right-1.5 w-2 h-2 bg-blue-700 rounded-full"></div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Start Coding Tutorial - Python Coding</p>
                              <p className="text-sm text-muted-foreground">Learn basic Python programming concepts for the robot</p>
                            </div>
                          </div>
                          {isExpanded ? <ChevronUp className="h-5 w-5 transition-transform duration-200" /> : <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />}
                        </div>
                      </div>

                      {/* Expandable code section */}
                      {isExpanded && (
                        <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-white">Python Starter Code</h3>
                            <button
                              onClick={handleCopy}
                              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                            >
                              {copied ? (
                                <>
                                  <Check className="h-4 w-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4" />
                                  Copy Code
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                            <code>{pythonStarterCode}</code>
                          </pre>
                        </div>
                      )}
                    </AccordionContent>


                </AccordionItem>

                {/* Sub-Accordion 2: Challenge 1 */}
                <AccordionItem value="challenge1" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="relative group">
                        <div className="relative h-12 w-8">
                          {/* Bottom LEGO brick (stationary) - Yellow */}
                          <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600 transition-all duration-700 ease-in-out group-hover:rotate-0">
                            {/* Bottom brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                          </div>
                          
                          {/* Top LEGO brick (animated) - Red */}
                          <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-all duration-700 ease-in-out group-hover:rotate-0 group-hover:translate-y-6">
                            {/* Top brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
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
                        <div className="relative h-12 w-8">
                          {/* Bottom LEGO brick (stationary) - Yellow */}
                          <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600 transition-all duration-700 ease-in-out group-hover:rotate-0">
                            {/* Bottom brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                          </div>
                          
                          {/* Top LEGO brick (animated) - Red */}
                          <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-all duration-700 ease-in-out group-hover:rotate-0 group-hover:translate-y-6">
                            {/* Top brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
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
                        <div className="relative h-12 w-8">
                          {/* Bottom LEGO brick (stationary) - Yellow */}
                          <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600  transition-all duration-700 ease-in-out group-hover:rotate-0">
                            {/* Bottom brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                          </div>
                          
                          {/* Top LEGO brick (animated) - Red */}
                          <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-all duration-700 ease-in-out group-hover:rotate-0 group-hover:translate-y-6">
                            {/* Top brick studs */}
                            <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                            <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
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
                          <div className="relative h-12 w-8">
                            {/* Bottom LEGO brick (stationary) - Yellow */}
                            <div className="absolute bottom-0 left-0 w-8 h-5 bg-yellow-400 rounded-sm border-2 border-yellow-600 transition-all duration-700 ease-in-out">
                              {/* Bottom brick studs */}
                              <div className="absolute -top-1 left-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                              <div className="absolute -top-1 right-1 w-2 h-2 bg-yellow-600 rounded-full"></div>
                            </div>
                            
                            {/* Top LEGO brick (animated) - Red */}
                            <div className="absolute top-0 left-0 w-8 h-5 bg-red-500 rounded-sm border-2 border-red-700 transition-all duration-700 ease-in-out group-hover:translate-y-6">
                              {/* Top brick studs */}
                              <div className="absolute -top-1 left-1 w-2 h-2 bg-red-700 rounded-full"></div>
                              <div className="absolute -top-1 right-1 w-2 h-2 bg-red-700 rounded-full"></div>
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

              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

       {/* Phase 3 Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="phase3" className="border rounded-lg shadow-lg">
            <AccordionTrigger className="p-6 hover:no-underline">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-muted rounded-full">
                  <TrendingUpDown className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-left">Phase 3. Obstacle Course Race</h2>
                  <p className="text-sm text-muted-foreground text-left">Follow the interactive guide to build your robot.</p>
                </div>
                <img 
                  src="/models/mage_6720689.png" 
                  alt="Obstacle course race icon" 
                  className="w-[17%] h-[18%]rounded object-cover flex-shrink-0"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <p className="mb-4 text-muted-foreground">
                Ready to bring your creation to life? Jump into our step-by-step interactive guide.
              </p>
              
              <img
                src="/models/OC_F_V.2.jpeg"
                alt="Go to Build & Code Guide"
                className="w-full h-auto cursor-pointer"
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>


       {/* Phase 4 Card */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-4 p-6">
            <div className="p-3 bg-muted rounded-full">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl">Phase 4. Awards and Celebration</CardTitle>
              <CardDescription>Celebrate your achievements and showcase your robot.</CardDescription>
            </div>
            <img 
              src="/models/-free.png" 
              alt="Awards and celebration icon" 
              className="w-[15%] h-16 rounded object-cover flex-shrink-0"
            />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="mb-6 text-muted-foreground">
              Congratulations on completing all challenges! Time to celebrate your accomplishments and show off your amazing robot creations.
            </p>
            
            <div className="space-y-8">
              {/* Winners Podium Section */}
              <div className="p-6 rounded-lg bg-yellow-50 border-2 border-yellow-300 shadow-md">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  <span className="font-bold text-lg text-yellow-800">Competition Winners!</span>
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                
                <div className="flex justify-center items-end gap-8">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-2 shadow-lg">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <span className="font-semibold text-gray-700">2nd Place</span>
                  </div>
                  
                  {/* 1st Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-2 shadow-lg border-2 border-yellow-500">
                      <span className="text-3xl">🥇</span>
                    </div>
                    <span className="font-bold text-yellow-800 text-lg">1st Place</span>
                  </div>
                  
                  {/* 3rd Place */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                      <span className="text-2xl">🥉</span>
                    </div>
                    <span className="font-semibold text-amber-700">3rd Place</span>
                  </div>
                </div>
              </div>
              
              {/* Award Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-1">🏆 Top Performer</h4>
                  <p className="text-sm text-muted-foreground">Best overall execution across all phases</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-1">🔁 Fewest Attempts</h4>
                  <p className="text-sm text-muted-foreground">Successfully completed all tasks with the least number of tries</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-1">🎨 Wackiest Design</h4>
                  <p className="text-sm text-muted-foreground">Most creative and visually unique robot design</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-1">🧠 Future Developer</h4>
                  <p className="text-sm text-muted-foreground">Simplest and most efficient script<br/>(Least code or data used to achieve functionality)</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-1">⚡ Speed Demon</h4>
                  <p className="text-sm text-muted-foreground">Fastest robot to complete the obstacle course</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-1">🛠️ Best Engineering</h4>
                  <p className="text-sm text-muted-foreground">Most mechanically sound and well-built robot<br/>(Emphasis on structural stability, clever mechanics, or modularity)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}