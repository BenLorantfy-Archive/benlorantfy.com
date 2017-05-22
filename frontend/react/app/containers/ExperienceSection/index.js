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
import ExperienceItem from '../../components/ExperienceItem';

export class ExperienceSection extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount(){
    this.props.dispatch(actions.loadExperience());
  }

  render() {
    var experience = this.props.experience || [];
    
    return (
      <ContentSection title="Experience" loading={this.props.loading}>
        <section className="mw7 center helvetica">
        {experience.map((item,i) => {
          return <ExperienceItem 
              key={i}
              company={item.company} 
              title={item.title} 
              description={item.description} 
              imageUrl={item.logo} 
            />
        })}
        </section>
      </ContentSection>  
    );
  }
}

ExperienceSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  experience: selectors.selectExperience(),
  loading: selectors.selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceSection);
