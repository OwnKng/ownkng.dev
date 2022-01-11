import { hsl2rgb } from "../hsl2rgb"

export const stripesFragment = /* glsl */ `
    precision highp float;
    varying vec2 vParticleUv; 
    varying float vStrength; 
    varying float vTime; 
    varying vec2 vMouse; 
    uniform sampler2D uTexture; 
    uniform vec2 uTextureSize; 
    uniform float uTime; 

    ${hsl2rgb}

    float random (in float x) { return fract(sin(x)*1e4); }
    
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
    }
    
    float pattern(vec2 st, vec2 v, float t) {
        vec2 p = floor(st+v);
        return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
    }

    void main() {
        //_ generate a grid
        vec2 transUV = vParticleUv; 
        float cells = 40.0; 
        vec2 grid = vec2(cells);
        transUV *= grid;

        vec2 ipos = floor(transUV);  
        vec2 fpos = fract(transUV);  

        //_ get the lighter image areas
        //* over the grid
        vec4 cellColor = texture2D(uTexture, ipos / cells);
        float cellStrength = 1.0 - (cellColor.r * 0.21 + cellColor.g * 0.71 + cellColor.b * 0.07);

        //* for each particle
        vec4 col = texture2D(uTexture, vParticleUv);
        float strength = col.r * 0.21 + col.g * 0.71 + col.b * 0.07;

        //* speed
        vec2 vel = vec2(uTime * 0.5 * max(grid.x, grid.y)); 
        vel *= vec2(0.0, 1.0) * random(0.0 + ipos.x); 

        //* Assign a random value base on the integer coord
        float light = pattern(transUV, vel, 0.5 + cellStrength * 0.5);
        light = 1.0 - light; 

        //_ color
        vec3 color = hsl2rgb(0.45 + strength * 0.1, 0.7, light * strength);

        //* Margins
        float alpha = step(0.2, fpos.x);

        gl_FragColor = vec4(color, alpha);
    }
`
