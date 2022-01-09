import { noise } from "../noise"

export const stripesVertex = /* glsl */ `
    precision highp float;

	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;
	uniform float uTime;
    uniform vec2 uTextureSize; 
    uniform vec2 uMouse; 

    uniform sampler2D uTexture;

	attribute vec3 position;
	attribute vec2 uv;
	attribute vec3 offset;
    attribute float pindex; 
    varying vec2 vParticleUv; 

    ${noise}
 
    void main() {
        vec3 displaced = offset; 

        //_ particle uv coords
        vec2 particleuv = offset.xy / uTextureSize;

        //_ get the lighter image areas
        vec4 col = texture2D(uTexture, particleuv);
        float strength = col.r * 0.21 + col.g * 0.71 + col.b * 0.07;
        
        //_ particle position
        displaced.z += strength * 20.0;

        //_ size
        float pSize = strength; 
        pSize *= 0.4; 
        pSize = max(0.2, strength);

        //_ final position
        vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
        mvPosition.xyz += position * pSize;
        gl_Position = projectionMatrix * mvPosition;

        //_ pass the varyings
        vParticleUv = particleuv; 
    }
`
