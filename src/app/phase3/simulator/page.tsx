'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default function SimulatorPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  const vehicleRef = useRef<THREE.Object3D | null>(null);
  const vehicleBodyRef = useRef<CANNON.Body | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // Movement state
  const keysPressed = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!mountRef.current) return;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    sceneRef.current = scene;

    // Basic Cannon.js physics setup
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    worldRef.current = world;

    // Basic camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 20);
    cameraRef.current = camera;

    // Basic renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Load models
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    // Load Ground - no rotations, see how it appears naturally
    mtlLoader.load('/models/ground.mtl', (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('/models/ground.obj', (groundObject) => {
        scene.add(groundObject);
        console.log('Ground loaded - position:', groundObject.position);
        
        // Simple ground physics - large flat box
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.addBody(groundBody);
        console.log('Ground physics added');
      });
    });

    // Load Vehicle - no rotations, see how it appears naturally  
    mtlLoader.load('/models/vehicle.mtl', (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('/models/vehicle.obj', (vehicleObject) => {
        // Start at center, high up
        vehicleObject.position.set(0, 10, 0);
        vehicleRef.current = vehicleObject;
        scene.add(vehicleObject);
        console.log('Vehicle loaded - no rotations applied');
        
        // Simple vehicle physics - basic box
        const vehicleShape = new CANNON.Box(new CANNON.Vec3(1, 1, 2));
        const vehicleBody = new CANNON.Body({ mass: 1 });
        vehicleBody.addShape(vehicleShape);
        vehicleBody.position.set(0, 10, 0);
        vehicleBodyRef.current = vehicleBody;
        world.addBody(vehicleBody);
        console.log('Vehicle physics added');
      });
    });

    // Basic keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Basic animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Simple physics step
      world.step(1/60);
      
      // Sync visual with physics
      if (vehicleRef.current && vehicleBodyRef.current) {
        vehicleRef.current.position.copy(vehicleBodyRef.current.position as any);
        vehicleRef.current.quaternion.copy(vehicleBodyRef.current.quaternion as any);
        
        // Basic camera follow
        camera.position.set(
          vehicleRef.current.position.x,
          vehicleRef.current.position.y + 5,
          vehicleRef.current.position.z + 10
        );
        camera.lookAt(vehicleRef.current.position);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />
      <div className="absolute top-4 left-4 bg-white/80 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Fresh Start - Testing Phase</h3>
        <p>Vehicle should drop and land on ground</p>
        <p>No movement controls yet - just physics test</p>
      </div>
    </div>
  );
}