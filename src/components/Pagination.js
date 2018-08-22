import React, { Component } from 'react';


class Pagination extends Component {
    getPageList = (action) => {
        const { currentPage } = this.props;
        let page;
        page = currentPage % 10 === 0 ? currentPage/10 -1 : Math.floor(currentPage/10);

        if(action === "next") {
            page = (page + 1) * 10;
        }
        else {
            page = (page - 1) * 10;
        }

        this.props.getNext(page);
    }

    render() {
        const { total, currentPage, limit, pageCount } = this.props;
        const pageIndex = currentPage % pageCount === 0 ? currentPage / pageCount - 1 : Math.floor(currentPage / pageCount);
        const paginationCount = total - pageIndex * limit * pageCount < limit * pageCount ? Math.ceil((total % ( limit * pageCount )) / pageCount) : pageCount;
        const pagination = Array(paginationCount).fill(0).map((e, i) => pageIndex * pageCount + i );
        const maxCount = (pagination[pagination.length-1] + 1) * pageCount;

        return (
            <div className="pagination">
                {currentPage > pageCount && (
                    <div  className="pagination_item" onClick={() => this.getPageList("preview")}>
                        Preview
                    </div>
                )}

                {pagination.map(page => (
                    <div className={`pagination_item ${currentPage === page + 1 ? 
                    "active" : ""}`} onClick={() => this.props.getNext(page)} key={page + 1}>
                        {page + 1}
                    </div>
                ))}

                {maxCount < total && (
                    <div className="pagination_item" onClick={() => this.getPageList("next")}>
                        Next
                    </div>
                )}
            </div>
        );
    };
};

Pagination.defaultProps = {
    pageCount: 10,
    limit: 10
};

export default Pagination;

