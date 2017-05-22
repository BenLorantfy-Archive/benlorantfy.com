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

export class AwardsSection extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount(){
    this.props.dispatch(actions.loadAwards());
  }

  render() {
    var awards = this.props.awards || [];
    
    return (
      <ContentSection title="Awards" loading={this.props.loading}>
        <section className="mw7 center helvetica">
          {awards.map((item,i) => {
            return <ExperienceItem 
                key={i}
                company={item.name} 
                title={item.organization} 
                description={item.description} 
                imageUrl={item.logo} 
                descriptionImage={item.descriptionImage} 
              />
          })}
        </section>
      </ContentSection>  
    );
  }
}

AwardsSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  awards: selectors.selectAwards(),
  loading: selectors.selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AwardsSection);
