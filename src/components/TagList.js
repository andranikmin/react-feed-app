import React from 'react';

const TagList = ({ tagData, fetching, onTagClick }) => {
    const handleTagClick = tag => (
        onTagClick(tag)
    );

    if(fetching) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className="tag_list">
            <h3>Popular tags</h3>
            <div className="tags">
                {tagData.map(tag => (
                    <span className="tag" onClick={() => handleTagClick(tag)} key={tag}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default TagList;