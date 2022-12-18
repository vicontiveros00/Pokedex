import React from "react";
import './Pagination.css';

function Pagination(props) {
    const { goToNextPage, goToPreviousPage } = props;
    return (
        <div className="buttons">
            {goToPreviousPage && <button onClick={goToPreviousPage}>
            <img src="https://www.pngitem.com/pimgs/m/163-1634065_master-ball-sprite-png-png-download-pokeball-pixel.png" />
                Previous
            </button>}
           {goToNextPage && <button onClick={goToNextPage}>
                Next
                <img src="https://www.pngitem.com/pimgs/m/163-1634065_master-ball-sprite-png-png-download-pokeball-pixel.png" />
            </button>}
        </div>
    )
}

export default Pagination;