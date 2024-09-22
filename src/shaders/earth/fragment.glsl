uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform  vec3 uSunDirection;
uniform vec3 uatmosphereDayColour;
uniform vec3 uatmosphereTwilightColour;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    float sunOrientation = dot (uSunDirection,normal);

    //Day /night color
    float dayMix = smoothstep(-0.25,0.5,sunOrientation);
    vec3 dayColor = texture(uDayTexture,vUv).rgb;
    vec3 nightColor = texture(uNightTexture,vUv).rgb;
    color = mix(nightColor,dayColor,dayMix);

    // specular clouds color
    vec2 specularCloudsColor = texture(uSpecularCloudsTexture,vUv).rg;


    //Clouds
    float cloudsMix = smoothstep(0.3,1.0, specularCloudsColor.g);
    cloudsMix *= dayMix;
    color = mix(color,vec3(1.0),cloudsMix);


    //Fresnel
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);
  

    // Atmosphere
    float atmosphereMix = smoothstep(-0.5,1.0, sunOrientation);
    vec3 atmospherecolor = mix( uatmosphereTwilightColour,uatmosphereDayColour, atmosphereMix);
    color = mix(color, atmospherecolor, fresnel*atmosphereMix);
    
    //Speculare
    vec3 reflection = reflect(-uSunDirection, normal);
    float specular = -dot(reflection, viewDirection);
    specular = max(specular, 0.0);
    specular = pow(specular, 32.0);
    specular *= specularCloudsColor.r;
    vec3 specularColor = mix(vec3(1.0),atmospherecolor,fresnel);

    color += specular*specularColor;
    // color = specularColor;
    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}