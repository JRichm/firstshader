precision mediump float;

const int num_circles = 100;
uniform vec2 resolution;
uniform float millis;
uniform vec4 grad_a;
uniform vec4 grad_b;
uniform vec4 grad_c;
uniform vec4 grad_d;

varying vec2 pos;

// vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
//     return a + b * cos (6.28318 * (c * t * d));
// }

vec3 palette(float t) {
    vec3 a = vec3(grad_a);
    vec3 b = vec3(grad_b);
    vec3 c = vec3(grad_c);
    vec3 d = vec3(grad_d);
    return a + b * cos (6.28318 * (c * t * d));
}

void main() {

    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + millis / 1000.0);

        d = sin(d * 8.0 + millis / 4000.0) / 8.0;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }

    gl_FragColor = vec4(finalColor, 1.0);




    // // draw circle with shader
    // vec3 circle = vec3(.5, .5, 0.);
    // float d = length(pos - circle.xy);

    // d = sin(d*8. - millis/1000.)/8.;
    // d=abs(d);


    // // d = smoothstep( 0.005, 0.01, d);
    
    // gl_FragColor = vec4(d,d,d, 1.);


    // // random dots
    // float color = 1.;
    // for (int i = 0; i < num_circles; i++) {
    //     float d = length(pos - circles[i].xy) - circles[i].z;
    //     d = smoothstep(0.,0.001, d);
    //     color *= d;
    // }

    // gl_FragColor = vec4(color, color, color, 1.);

    // // draw circle with shader
    // vec3 circle = vec3(0.5, 0.5, 0.3);
    // float d = length(pos - circle.xy) - circle.z;

    // d = smoothstep(0., 0.005, d);

    // gl_FragColor = vec4(d,d,d, 1.);

    // // use background image
    // vec2 newPos = pos;
    // newPos.y = 1. - newPos.y;
    // vec4 col = texture2D(background, newPos);
    // if (col.x > 0.9) {
    //     col = vec4(1.);
    // }
    // gl_FragColor = vec4(col);


    // // moving gradient over time
    // float c = (sin(pos.x * 16. + millis/1000.) + 1.) / 2.;
    // gl_FragColor = vec4(c, 0., 1., 1.);


    // // 2d gradient using mix
    // vec4 tl = vec4(.5, .1, .9, 1.);
    // vec4 tr = vec4(.3, 1., .8, 1.);
    // vec4 bl = vec4(.8, .6, .1, 1.);
    // vec4 br = vec4(.7, .1, .2, 1.);

    // vec4 top = mix(tl, tr, pos.x);
    // vec4 bottom = mix(bl, br, pos.x);

    // vec4 c = mix(bottom, top, pos.y);

    // gl_FragColor = c;
}