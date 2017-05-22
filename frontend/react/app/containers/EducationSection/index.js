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
import ExperienceItem from '../../components/ExperienceItem';

export class EducationSection extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount(){
    this.props.dispatch(actions.loadEducation());
  }

  render() {
    var education = this.props.education || [];
    
    return (
      <ContentSection title="Education" color="#F1F3F2" loading={this.props.loading}>
        <section className="mw7 center helvetica">
        {education.map((item,i) => {
          return <ExperienceItem 
              key={i}
              company={item.school} 
              title={item.program} 
              description={item.description} 
              imageUrl={item.logo} 
            />
        })}
        </section>
      </ContentSection>  
    );
  }
}

EducationSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  education: selectors.selectEducation(),
  loading: selectors.selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EducationSection);
