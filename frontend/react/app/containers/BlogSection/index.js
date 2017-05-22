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

export class BlogSection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount(){
    this.props.dispatch(actions.loadArticles());
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <ContentSection title="Blog" hideTriangle={true}>
        {this.props.loading && 
          <div className="w-100 tc">
            <Spinner className="dib" spinnerName="double-bounce" noFadeIn />
          </div>
        }
        {this.props.articles.map((article, i) => {
          return <BlogArticle 
            key={i} 
            title={article.title}
            description={article.description} 
            date={article.date}
          />;
        })}
      </ContentSection>  
    );
  }
}

BlogSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articles: selectors.selectArticles(),
  loading: selectors.selectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogSection);
