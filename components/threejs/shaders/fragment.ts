import { hsl2rgb } from "../imageShaders/hsl2rgb"
import { noise } from "../imageShaders/noise"

export const fragment = `
    varying float vStrength; 
    varying vec2 vUv; 
    varying vec2 vTexture; 
    varying float vScroll; 

    ${noise}
    ${hsl2rgb}
    
    void main() {
        if(vStrength < 0.1) discard; 

        float distanceToBottom = distance(vec2(0.5, vTexture.y), vec2(0.5, 0.0)); 
        float noiseFrequency = 50.0; 
        float noiseAmplitude = 0.2;
        vec3 noiseCoords = vec3(1.0, 123.0, vTexture.x); 
        float noise = cnoise(sin(noiseCoords * noiseFrequency)) * noiseAmplitude;

        noise = step(vTexture.y, noise);

        if(vTexture.y < noise || vTexture.y < 0.03) discard;

        float dist = length(vUv - vec2(0.5));
        float alpha = 1.0 - smoothstep(0.35, 0.5, dist);

        //* convert to angle
        float PI = 3.142; 
        float angle = atan(vTexture.x - 0.5, vTexture.y) / (PI * 2.0) + 0.5;

        float baseColor = 0.4 * step(angle, vScroll);
        vec3 color = hsl2rgb(0.6 + baseColor, 1.0, 0.2 + vStrength * 0.8); 

        gl_FragColor = vec4(color, alpha); 
    }
`
