/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Parallax, Background } from 'react-parallax';
import * as styles from './styles';

import ContentSection from '../../components/ContentSection';
import BlogArticle from '../../components/BlogArticle';
import BlogSection from '../BlogSection';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    return (
      <div>
        <Parallax strength={600}>
          <Background>
            <div style={{ 
              width: w, 
              height: h, 
              backgroundImage: "url(http://res.cloudinary.com/dnefq4yix/image/upload/v1495147258/me-smaller_lgresy.jpg)",  
              backgroundPosition: "50% 50%"
            }}></div>
          </Background>
          <div style={{"height": h, position:"relative" }}>
            <div style={{ backgroundColor:"rgba(0,0,0,0.5)", width:"100%", height:"100%", position:"relative" }}>

              <div style={{ position:"absolute", left:0, right:0, bottom:0, top:0 }}>
                <div style={styles.name}><span style = {styles.ben}>ben</span><span style = {styles.lorantfy}><span style = {{ letterSpacing: '-6px' }}>lo</span><span style={{ letterSpacing: '5px' }}>r</span>antfy</span></div>
                <div style={styles.message}>Hey, I'm Ben, a software and web developer who likes solving problems<br/>with code, math, and design.</div>
              </div>
            </div>
          </div>
        </Parallax>
        <BlogSection />

        <ContentSection title="Projects"></ContentSection>   
        <ContentSection title="Experience"></ContentSection>   
        <ContentSection title="Hire Me"></ContentSection>   
      </div>
    );
  }
}
