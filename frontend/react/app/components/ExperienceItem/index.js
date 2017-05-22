import React from 'react';

function ExperienceItem(props){
    return (
    <article className="bt bb b--black-10 helvetica">
        <a className="db pv4 ph3 ph0-l no-underline black dim" href="#0">
        <div className="flex flex-column flex-row-ns">
            <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
            <img src={props.imageUrl} className="db" alt={props.company} />
            </div>
            <div className="w-100 w-60-ns pl3-ns">
            <h1 className="f3 fw1 mt0 lh-title pb1 mb0 fw3">{props.company}</h1>
            <h2 className="f4 fw1 mt0 lh-title pt0 mt0">{props.title}</h2>
            <p className="f6 f5-l lh-copy helvetica">
                {props.description}
                {props.descriptionImage &&
                    <img className="w-100 mt3" src={props.descriptionImage} />
                }
            </p>
            </div>
        </div>
        </a>
    </article>
    );
}

export default ExperienceItem;