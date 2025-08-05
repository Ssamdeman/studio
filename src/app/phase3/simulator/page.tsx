'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

export default function SimulatorPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const vehicleRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  
  // Movement state
  const keysPressed = useRef<Set<string>>(new Set());
  const vehicleSpeed = 0.5;
  const vehicleRotationSpeed = 0.05;


    const turnAngle = Math.PI / 2; // 90 degrees
    const canTurn = useRef(true); // Prevent multiple turns while holding key

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue
    sceneRef.current = scene;

    // Camera setup - 3rd person view
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000 // Increased far plane for large scene
    );
    camera.position.set(0, 50, 100); // Higher and further back
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    scene.add(directionalLight);

    // Load Ground
    const mtlLoader = new MTLLoader();
    const objLoader = new OBJLoader();

    // IMPORTANT: Update these paths to match your file locations
    // Put your ground.obj and ground.mtl files in the public folder
    mtlLoader.load('/models/ground.mtl', (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('/models/ground.obj', (object) => {
        object.receiveShadow = true;
        
        // Rotate ground to lay flat
        object.rotation.x = -Math.PI / 2; // Rotate 90 degrees to make it horizontal
        
        scene.add(object);
        console.log('Ground loaded');
        
        // Debug: Check the size and position
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        console.log('Ground size:', size);
        console.log('Ground center:', center);
      });
    });

    // Load Vehicle
    mtlLoader.load('/models/vehicle.mtl', (materials) => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load('/models/vehicle.obj', (object) => {
        object.castShadow = true;
        object.receiveShadow = true;
        
        // Scale down the vehicle to reasonable size
        object.scale.set(0.1, 0.1, 0.1);
        
        // Rotate vehicle to correct orientation - flip it right side up
        object.rotation.x = Math.PI / 2; // Changed from negative to positive
        object.rotation.z = Math.PI; // Rotate 180 degrees to flip upside-down
        
        // Position at corner of ground and ON the ground
        object.position.set(-90, 2, -90); // Raised Y a bit more
        
        vehicleRef.current = object;
        scene.add(object);
        console.log('Vehicle loaded');
        
        // Debug: Check the size and position AFTER scaling
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        console.log('Vehicle size after scaling:', size);
        console.log('Vehicle position:', object.position);
        
        // Position camera behind vehicle
        camera.position.set(
          object.position.x,
          object.position.y + 30,
          object.position.z + 50
        );
        camera.lookAt(object.position);
      });
    });

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current.add(key);
      
      // Handle 90-degree turns on key press (not hold)
      if (vehicleRef.current && canTurn.current) {
        if (key === 'a' || key === 'arrowleft') {
          vehicleRef.current.rotation.z += turnAngle;  // Changed from Y to Z
          canTurn.current = false;
        }
        if (key === 'd' || key === 'arrowright') {
          vehicleRef.current.rotation.z -= turnAngle;  // Changed from Y to Z
          canTurn.current = false;
        }
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current.delete(key);
      
      // Allow turning again when key is released
      if (key === 'a' || key === 'arrowleft' || key === 'd' || key === 'arrowright') {
        canTurn.current = true;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update vehicle movement
      if (vehicleRef.current && cameraRef.current) {
        const vehicle = vehicleRef.current;
        
        // Movement - straight forward/backward in the direction vehicle is facing
        if (keysPressed.current.has('w') || keysPressed.current.has('arrowup')) {
          vehicle.position.x -= Math.sin(vehicle.rotation.z) * vehicleSpeed;
          vehicle.position.z -= Math.cos(vehicle.rotation.z) * vehicleSpeed;
        }
        if (keysPressed.current.has('s') || keysPressed.current.has('arrowdown')) {
          vehicle.position.x += Math.sin(vehicle.rotation.z) * vehicleSpeed;
          vehicle.position.z += Math.cos(vehicle.rotation.z) * vehicleSpeed;
        }
        
        // Update camera to follow vehicle
        const cameraOffset = new THREE.Vector3(0, 30, 50);
        const rotatedOffset = cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), vehicle.rotation.z);
        cameraRef.current.position.copy(vehicle.position).add(rotatedOffset);
        cameraRef.current.lookAt(vehicle.position);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <div 
        ref={mountRef} 
        style={{ width: '100vw', height: '100vh' }}
      />
      <div className="absolute top-4 left-4 bg-white/80 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Controls:</h3>
        <p>W/↑ - Forward</p>
        <p>S/↓ - Backward</p>
        <p>A/← - Turn Left</p>
        <p>D/→ - Turn Right</p>
      </div>
    </div>
  );
}