import React from 'react';
import Spinner from 'react-spinkit';

function ContentSection(props){
    return (
        <div style={{"minHeight": "100%", "width":"100%", "backgroundColor": props.color || "white", zIndex:1, position:"relative" }}>
            <div className="w-100" style={{
                transform:"rotate(-3deg) translateY(-70px) scale(1)",
                backgroundColor: props.color || "white" ,
                height:"200px",
                zIndex:0,
                position:"relative",
            }}></div>
            <div className="pa3 w-100 pb6" style={{ marginTop:"-250px", zIndex:1, position:"relative" }}>
                {props.title && 
                    <div>
                        <div className="fl w-100 tc">
                            <h1 className="f1 dib fw3">{props.title}</h1>
                        </div>
                        <div className="cf"></div>
                    </div>
                }

                {props.loading && 
                    <div className="w-100 tc">
                        <Spinner className="dib" spinnerName="double-bounce" noFadeIn />
                    </div>
                }

                {!props.title && 
                    <div className="w-100 pt4"></div>
                }

                {!props.loading && 
                    props.children
                }
                    
            </div>
        </div>    
    );
}

export default ContentSection;