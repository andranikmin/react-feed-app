import React, { Component } from 'react';

class TagList extends Component {

    handleTagClick = tag => (
        this.props.onTagClick(tag)
    );

    render(){
        
        const { tagData, onTagClick, selectedTag } = this.props;
        return (
            <div className="tag_list">
                <h3>Popular tags</h3>
                <div className="tags">
                    {tagData.map(tag => (
                        <span className={`tag ${tag === selectedTag ? "active" : ""}`} onClick={() => this.handleTagClick(tag)} key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        );
    }
    
}

export default TagList;