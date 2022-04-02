import { noise } from "../imageShaders/noise"

export const vertex = `
    attribute vec3 offset;
    attribute vec3 pixelColor; 

    uniform vec2 uTextureSize; 
    uniform sampler2D uTexture; 
    uniform float uTime; 
    uniform float uNumberColumns; 
    uniform float uNumberRows; 
    uniform float uScroll; 

    varying float vStrength; 
    varying vec2 vTexture; 
    varying vec2 vUv; 
    varying float vScroll; 

    ${noise}

    void main() {
        vec2 particleuv = offset.xy / uTextureSize;

        //_ calculate the frame position
        //* normalise the value of the frame resolution
        vec2 fRes = uTextureSize / vec2(uNumberColumns, uNumberRows);
        vec2 nRes = uTextureSize / fRes; 

        vec2 _coords = particleuv / nRes; 
 
        //* scale the coords to a single frame
        float frameOffset = uScroll * uNumberColumns * uNumberRows; 
        frameOffset = min(frameOffset, 7.0);

        //* extract this frame and the next one
        float currentRow = 1.0 - floor(floor(frameOffset / uNumberColumns)) / nRes.y;
        float nextRow = 1.0 - floor((floor(frameOffset + 1.0) / uNumberColumns)) / nRes.y;

        vec2 currentFrameOffset = vec2(floor(frameOffset) / nRes.x, currentRow); 
        vec2 nextFrameOffset = vec2((floor(frameOffset) + 1.0) / nRes.x, nextRow); 

        vec2 currentFrame = fract(_coords + currentFrameOffset);
        vec2 nextFrame = fract(_coords + nextFrameOffset);

        vec4 textureOne = texture2D(uTexture, currentFrame); 
        vec4 textureTwo = texture2D(uTexture, nextFrame); 

        //* mix the two frames together
        vec4 _texture = mix(textureOne, textureTwo, fract(frameOffset)); 

        //_  calculate z positions and size
        float strength = _texture.r * 0.21 + _texture.g * 0.71 + _texture.b * 0.07;

        //* z position
        vec3 displacement = offset; 
        displacement.z += strength * 10.0;

        //* make some noise
        float noiseAmplitude = 5.0;
        float noiseFrequency = 1.0; 
        vec3 noiseCoords = vec3(displacement.xz, uTime * 0.1); 

        float noise = cnoise(noiseCoords * noiseFrequency) * noiseAmplitude; 
        displacement.z += noise; 

        //* size 
        vec4 particlePosition = modelViewMatrix * vec4(displacement, 1.0);
        float pSize = strength;
        pSize *= 1.2; 
        particlePosition.xyz += position * pSize;

        gl_Position = projectionMatrix * particlePosition;
         
        vTexture = particleuv; 
        vStrength = strength;
        vUv = uv;  
        vScroll = uScroll; 
    }
`
