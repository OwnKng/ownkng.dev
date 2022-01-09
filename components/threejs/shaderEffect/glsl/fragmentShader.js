import { hsl2rgb } from "../../imageShaders/hsl2rgb"

export const fragmentShader = `
    uniform vec2 uBaseCol;

    varying float vDistortion;
    varying vec2 vUv;

    ${hsl2rgb}

    void main() {
        vec3 color = hsl2rgb(uBaseCol.x * 0.5 + vDistortion * 0.5, 0.6, 0.6 + (uBaseCol.y * 0.10));
        
        float alpha = smoothstep(0.05, 0.0475, abs(distance(vUv, vec2(0.5)) - 0.4));

        gl_FragColor = vec4(color, alpha);
    }
`
