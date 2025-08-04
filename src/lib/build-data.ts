import type { LegoPart, BuildStep, CodeStep } from './types';

export const allLegoParts: LegoPart[] = [
  { id: '1', name: 'Hub', quantity: 1, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego hub' },
  { id: '2', name: 'Medium Motor', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego motor' },
  { id: '3', name: 'Distance Sensor', quantity: 1, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego sensor' },
  { id: '4', name: 'Force Sensor', quantity: 1, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego sensor' },
  { id: '5', name: '3x5 L-Shape Beam', quantity: 4, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego beam' },
  { id: '6', name: 'Axle 4', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego axle' },
  { id: '7', name: 'Connector Peg', quantity: 8, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego peg' },
  { id: '8', name: 'Wheel', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego wheel' },
];

export const buildSteps: BuildStep[] = [
  {
    step: 1,
    title: 'Assemble the Base Frame',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'lego frame',
    instructions: 'Connect the two 3x5 L-Shape beams using connector pegs to form the main chassis of your robot.',
    parts: [
      { id: '5', name: '3x5 L-Shape Beam', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego beam' },
      { id: '7', name: 'Connector Peg', quantity: 4, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego peg' },
    ],
  },
  {
    step: 2,
    title: 'Attach the Motors',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'lego motor assembly',
    instructions: 'Secure the two medium motors to the sides of the base frame. Ensure they are aligned and firmly attached.',
    parts: [
      { id: '2', name: 'Medium Motor', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego motor' },
      { id: '7', name: 'Connector Peg', quantity: 4, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego peg' },
    ],
  },
  {
    step: 3,
    title: 'Mount the Hub',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'lego hub assembly',
    instructions: 'Place the Hub on top of the chassis. Connect it to the motors using the cables provided.',
    parts: [{ id: '1', name: 'Hub', quantity: 1, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego hub' }],
  },
    {
    step: 4,
    title: 'Add Wheels and Sensors',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'lego robot wheels',
    instructions: 'Attach the wheels to the motor axles. Mount the distance and force sensors to the front of the robot.',
    parts: [
      { id: '8', name: 'Wheel', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego wheel' },
      { id: '6', name: 'Axle 4', quantity: 2, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego axle' },
      { id: '3', name: 'Distance Sensor', quantity: 1, imageUrl: 'https://placehold.co/100x100.png', aiHint: 'lego sensor' },
    ],
  },
];

export const codeSteps: CodeStep[] = [
    {
        step: 1,
        title: 'Initialize Program',
        code: `from spike import PrimeHub, MotorPair

hub = PrimeHub()
motors = MotorPair('A', 'B')`,
        explanation: 'Start by importing necessary libraries and initializing the Hub and motor pair. This sets up communication with your robot\'s hardware.'
    },
    {
        step: 2,
        title: 'Move Forward',
        code: `motors.move(10, 'cm')`,
        explanation: 'This simple command tells the robot to move forward for a distance of 10 centimeters. You can change the distance and units.'
    },
    {
        step: 3,
        title: 'Turn Right',
        code: `motors.move(90, 'degrees', steering=100)`,
        explanation: 'Use the move command with "degrees" to make precise turns. A steering value of 100 makes it a sharp right turn.'
    },
    {
        step: 4,
        title: 'Stop on Obstacle',
        code: `from spike import DistanceSensor

distance_sensor = DistanceSensor('C')

while distance_sensor.get_distance_cm() > 5:
    motors.start()
motors.stop()`,
        explanation: 'This program makes the robot move forward until it detects an obstacle within 5 cm, at which point it stops.'
    }
];
