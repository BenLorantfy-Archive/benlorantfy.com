import React from 'react';

function BlogArticle(props){
    return (
        <article className="w-50 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
            <div className="">
            <div>
                <h1 className="f3 mb2 dib fw4">{props.title}</h1><h1 className="f3 mb2 gray dib fw1 ml3">{props.date}</h1>
            </div>
            <h2 className="f5 fw4 gray mt0" dangerouslySetInnerHTML={{__html: props.description}}></h2>
            </div>
        </article>
    );
}

export default BlogArticle;