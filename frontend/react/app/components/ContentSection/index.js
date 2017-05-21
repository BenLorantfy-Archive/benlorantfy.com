import React from 'react';

function ContentSection(props){
    return (
        <div className="pa3" style={{"minHeight": "100%", "width":"100%", "backgroundColor": "white" }}>
            <div className="fl w-100 tc">
              <h1 className="f1 dib fw1">{props.title}</h1>
            </div>
            <div className="cf"></div>

            {props.children}
        </div>    
    );
}

export default ContentSection;