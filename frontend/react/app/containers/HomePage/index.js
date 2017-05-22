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
import ExperienceItem from '../../components/ExperienceItem';
import Banner from '../../components/Banner';
import Social from '../../components/Social';
import Footer from '../../components/Footer';

import BlogSection from '../BlogSection';
import ProjectsSection from '../ProjectsSection';
import ExperienceSection from '../ExperienceSection';
import EducationSection from '../EducationSection';
import AwardsSection from '../AwardsSection';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    var w = window.innerWidth;
    var h = window.innerHeight;

    return (
      <div>
        <Banner>

          <div style={{"height": h, position:"relative" }}>
            <div style={{ backgroundColor:"rgba(0,0,0,0.5)", width:"100%", height:"100%", position:"relative" }}>

              <div style={{ position:"absolute", left:0, right:0, bottom:0, top:0 }}>
                <div style={styles.name}><span style = {styles.ben}>ben</span><span style = {styles.lorantfy}><span style = {{ letterSpacing: '-6px' }}>lo</span><span style={{ letterSpacing: '5px' }}>r</span>antfy</span></div>
                <div style={styles.message}>Hey, I'm Ben, a software and web developer who likes solving problems<br/>with code, math, and design.</div>
                <div className="mt6">
                  <Social />
                </div>

                <div className="absolute w-100" style={{ "bottom":0 }}>
                  <div className="w4 h4 pointer grow-large relative center pa4">
                    <svg x="0px" y="0px" viewBox="0 0 1000 1000">
                      <g><path stroke="white" fill="none" strokeWidth="10" d="M0,500 500,1000 1000,500"/></g>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </Banner>

        <BlogSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <AwardsSection />

        <Footer />
      </div>
    );
  }
}
