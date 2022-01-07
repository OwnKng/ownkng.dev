import { hsl2rgb } from "../hsl2rgb"
import { noise } from "../noise"

export const fragmentSquares = /* glsl */ `
    precision highp float;
    varying vec2 particleuv; 
    varying float vStrength; 
    varying float vTime; 
    varying vec2 vMouse; 

    ${noise}
    ${hsl2rgb}

    float random(float n) {
	    return fract(sin(n) * 43758.5453123);
    }

    void main() {
        float time = sin(vTime * 0.8) * 0.5 + 0.5;
        vec2 grid = particleuv * 10.0;
        vec2 ipos = ceil(grid); 

        float checks = cnoise(vec3(ipos * 10.0 + time, 0.1));
        checks *= 5.0;
    
        vec3 color = hsl2rgb(0.9 + checks * 0.05, 0.8, vStrength);

        gl_FragColor = vec4(color, checks);
    }
`
