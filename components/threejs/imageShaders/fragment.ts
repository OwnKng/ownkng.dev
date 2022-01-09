import { hsl2rgb } from "./hsl2rgb"
import { noise } from "./noise"

export const fragmentShader = /* glsl */ `
    precision highp float;
    varying vec2 particleuv; 
    varying float vWave; 
    varying float vWaveEdge; 
    varying float vStrength; 

    ${noise}
    ${hsl2rgb}

    void main() {
   
        //_  circular patterns
        float bigNoise = cnoise(vec3(particleuv.y, particleuv.x, 0.1)) * 8.0;
        float details = cnoise(vec3(bigNoise, 8.0, 8.0)); 
        details = floor(details);

        float y = abs(vWave - 1.0); 

        float x = max(0.25, y);
        float direction = (x + details) * 0.4; 
 
        //_ color
        vec3 color = hsl2rgb(0.6 + direction * x, vStrength, vStrength + vWaveEdge);
        gl_FragColor = vec4(color, 1.0);
    }
`
