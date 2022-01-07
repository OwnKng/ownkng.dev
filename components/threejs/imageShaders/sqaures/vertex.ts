import { noise } from "../noise"

export const vertexSquares = /* glsl */ `
    precision highp float;

	uniform mat4 modelViewMatrix;
	uniform mat4 projectionMatrix;
	uniform float uTime;
    uniform vec2 uTextureSize; 


    uniform sampler2D uTexture;

	attribute vec3 position;
	attribute vec2 uv;
	attribute vec3 offset;
    attribute float pindex; 

    varying vec2 particleuv; 
    varying float vStrength; 
    varying float vTime; 

    ${noise}
 
    void main() {
        vec3 displaced = offset; 

        //_ particle uv coords
        particleuv = offset.xy / uTextureSize;

        //_ get the lighter image areas
        vec4 col = texture2D(uTexture, particleuv);
        float strength = col.r * 0.21 + col.g * 0.71 + col.b * 0.07;

        //_ particle position
        float time = sin(uTime * 0.5) * 0.5 + 0.5;
        displaced.z += strength * 20.0 * time;

        //_ size
        float pSize = strength; 
        pSize *= 0.6; 
        pSize = max(0.6, strength);

        //_ final position
        vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
        mvPosition.xyz += position * pSize;
        gl_Position = projectionMatrix * mvPosition;

        //_ pass the varyings
        vTime = uTime; 
        vStrength = strength; 
    }
`
