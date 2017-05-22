/*
 *
 * BlogSection
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Spinner from 'react-spinkit';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import * as actions from './actions';
import ContentSection from '../../components/ContentSection';
import BlogArticle from '../../components/BlogArticle';
import * as Carousel from '../../components/Carousel';

// @import "~slick-carousel/slick/slick.css";
// @import "~slick-carousel/slick/slick-theme.css";

export class ProjectsSection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  index = 0;

  componentWillMount(){
    this.props.dispatch(actions.loadProjects());

    this.setState({ index: 0 });
  }


  onChange (direction) {
    this.index += direction;
    if(this.index < 0){
      this.index = this.props.projects.length - 1;
    }else if(this.index > (this.props.projects.length - 1)){
      this.index = 0;
    }

    this.setState({ index:this.index });
  }

  render() {
    if(this.props.projects && this.props.projects.length > 0){
      var title = this.props.projects[this.state.index].title;
      var message = this.props.projects[this.state.index].message;
    }else{
      var title = "";
      var message = "";
    }

    var projects = [];
    if(this.props.projects){
      projects = this.props.projects;
    }
    
    return (
      <ContentSection title="Projects" color="#F1F3F2" loading={this.props.loading}>
        {this.props.projects.length > 0 && 
          <div>
            <h3 className="f2 w-100 tc pt0 mt0 pb4 fw3">{title}</h3>
            <div className="center" style={{"width":"900px", "height":"400px"}}>
              <Carousel 
                layout="prism"
                width="900"
                height="300"
                duration="0"
                ease="linear"
                images={projects.map((project) => {
                  return project.image;
                })}
                onChange={(direction) => { this.onChange(direction); }}
              />
            </div>

            <p className="center w-40 tc helvetica f4 lh-copy">{message}</p>
          </div>
        }

      </ContentSection>  
    );
  }
}

ProjectsSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  projects: selectors.selectProjects(),
  loading: selectors.selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSection);
