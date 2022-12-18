import React from "react";

function Pagination(props) {
    const { goToNextPage, goToPreviousPage } = props;
    return (
        <div className="buttons">
            {goToPreviousPage && <button onClick={goToPreviousPage}>◀</button>}
            {goToNextPage && <button onClick={goToNextPage}>▶</button>}
        </div>
    )
}

export default Pagination;