import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls, Html, Preload, useGLTF,  } from "@react-three/drei";


import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <>
     <PresentationControls global polar={[-0.4, 0.2]} azimuth={[-0.4, 0.2]}>
        <primitive object={computer.scene} position-y={-1.2} scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}>
          <Html wrapperClass="computer" position={[0, 1.5, -1.5]} transform distanceFactor={1.16} rotation-x={-0.25}>
            <iframe src='https://www.gsmkarot.com/'></iframe>
          </Html>
        </primitive>
      </PresentationControls>
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
        
      />
      <pointLight intensity={1} />
    
    </mesh>
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas frameloop="demand" shadows dpr={[1, 2]} camera={{ position: [20, 3, 5], fov: 15 }} gl={{ preserveDrawingBuffer: true }}>
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 36}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 36} // Y ekseni etrafında maksimum dönme açısı (45 derece)
        minAzimuthAngle={-Math.PI / 36} // Y ekseni etrafında minimum dönme açısı (-45 derece)
      />

      <Computers isMobile={isMobile} />
    </Suspense>

    <Preload all />
  </Canvas>
  );
};

export default ComputersCanvas;
