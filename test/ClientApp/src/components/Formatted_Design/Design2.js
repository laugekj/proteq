import React, { useState } from 'react';
import './Design2.css';

export default function Design2() {
    const [title, setTitle] = useState("Få styr på din GDPR - helt enkelt")
    const [subTitle, setSubTitle] = useState("Fakta")
    const [body, setBody] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non tristique est. In blandit sapien vitae nisl suscipit, fringilla cursus odio interdum. Donec at neque elit. Sed velit nunc, aliquet eget bibendum nec, mattis ultrices nunc. Donec viverra diam ut tellus ultricies rhoncus. Vivamus sed viverra nibh, a malesuada magna. Maecenas lobortis, turpis eu auctor ullamcorper, mauris arcu feugiat tortor, eget condimentum sapien elit eu erat. Ut sem lacus, tristique eu laoreet eu, lobortis nec nibh. Sed sit amet est vehicula, euismod metus in, fringilla massa.")
    const [video, setVideo] = useState("https://www.youtube.com/embed/u2lsSaDrjfA")

    return (
       <div>
        <h1 class="overskrift">{title}</h1>
        <h2 class="design2underoverskrift">{subTitle}</h2>
        <h3 class="design2text">{body}</h3>
        <iframe class="video" width="600" height="350" src={video} title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

       </div>
            
           
                   
    );
}