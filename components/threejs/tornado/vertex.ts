import { noise } from "../imageShaders/noise"

const vertex = /*glsl*/ `
        uniform float uTime; 
        uniform float uDistance; 
        attribute vec3 translate;
        attribute float offset; 
        attribute float scale; 
        attribute float cIndex; 

        varying vec2 vUv; 
        varying float vOffset; 

        ${noise}

        void main() {
            float noise = cnoise(vec3(cIndex, uTime * 0.5, 123.0)) * 0.5 + 0.5;
            noise *= 5.0;
            
            vec3 transformedPosition = position + translate; 
            transformedPosition += noise;  
            transformedPosition *= scale + uDistance * 0.25;; 
            
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(transformedPosition, 1.0);
            vUv = uv; 
            vOffset = offset; 
        }  
`

export default vertex
