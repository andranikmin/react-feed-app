import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleList from '../components/ArticleList';
import Pagination from '../components/Pagination';
import TagList from '../components/TagList';
import { getArticlesData, setFavorite } from '../store/articleList/actions';
import { getTagsData } from '../store/tag/actions';

class Home extends Component {
    componentDidMount() {
        this.props.getArticlesData();
        this.props.getTagsData();
    }

    render() {
        const { data, tagData, fetching, filterTag, currentPage } = this.props;

        return (
            <div className="homepage">
                <div className="homepage_banner">
                    <h1>Test project</h1>
                </div>
                <div className="container">
                    <div className="articles_container">
                        <div className="articlesGroup">
                            <div className="articles_filter">
                                <span className={`filter_item ${!filterTag ? "active" : ""}`} 
                                    onClick={() => this.props.getArticlesData()}>
                                    All articles
                                </span>
                                {filterTag && <span className="filter_item active">#{filterTag}</span>}
                            </div>
                            <ArticleList articles={data.articles} onSetFavorite={this.props.setFavorite}/>
                        </div>
                        <div className="tagsGroup">
                            <TagList selectedTag={filterTag} tagData={tagData} fetching={fetching} 
                            onTagClick={this.props.getArticlesData} />
                        </div>
                    </div>
                    {data.articlesCount > 10 && 
                        <Pagination currentPage={currentPage} total={data.articlesCount}
                        getNext={(page) => this.props.getArticlesData(filterTag, page)} />
                    }
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    const { articleList, tag } = state;
    const { data, tag: filterTag, page: currentPage } = articleList;
    const { data: tagData, fetching } = tag;

    return {
        data,
        tagData,
        fetching,
        filterTag,
        currentPage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getArticlesData: bindActionCreators(getArticlesData, dispatch),
        getTagsData: bindActionCreators(getTagsData, dispatch),
        setFavorite: bindActionCreators(setFavorite, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);