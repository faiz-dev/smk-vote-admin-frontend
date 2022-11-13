import React from "react";

const Card = ({children}) => {
    return (
        <div className="card rounded-md bg-white shadow">
            <div className="card-header border-b flex justify-between items-center px-5">
                <h3 className="card-title">This is Title</h3>
                <div className="card-actions flex items-center">
                    <button className="btn bg-primary text-white rounded btn-sm">Action</button>
                </div>
            </div>
            <div className="card-body  p-5">
                this is the body of the card
            </div>
        </div>
    )
}

export default Card
