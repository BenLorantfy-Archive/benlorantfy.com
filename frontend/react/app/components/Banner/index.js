import React from 'react';

function Banner(props){
    var w = window.innerWidth;
    var h = window.innerHeight;

    return (
        <div>
            <div style={{ 
                position:"fixed",
                top:0,
                left:0,
                width: w, 
                height: h, 
                backgroundImage: "url(http://res.cloudinary.com/dnefq4yix/image/upload/v1495147258/me-smaller_lgresy.jpg)",  
                backgroundPosition: "50% 50%",
                zIndex:0
            }}></div>

            <div style={{zIndex:1}}>
                {props.children}
            </div>
        </div>
    );
}

export default Banner;