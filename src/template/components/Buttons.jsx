import React from "react";

const Buttons = ({children}) => {
    return (
        <div className="card rounded-md bg-white shadow">
            <div className="card-header border-b flex justify-between items-center px-5">
                <h3 className="card-title">Buttons</h3>
                <div className="card-actions flex items-center">
                    <button className="btn bg-primary text-white rounded btn-sm">Action</button>
                </div>
            </div>
            <div className="card-body p-5">
                <div className="flex gap-3 mb-5">
                    <button className="btn btn-primary">
                        Button
                    </button>
                    <button className="btn btn-info">
                        Button
                    </button>
                    <button className="btn btn-success">
                        Button
                    </button>
                    <button className="btn btn-warning">
                        Button
                    </button>
                    <button className="btn btn-danger">
                        Button
                    </button>
                    <button className="btn btn-dark">
                        Button
                    </button>
                </div>
                <div className="flex gap-3 mb-5">
                    <button className="btn btn-primary" disabled={true}>
                        Button
                    </button>
                    <button className="btn btn-info" disabled={true}>
                        Button
                    </button>
                    <button className="btn btn-success" disabled={true}>
                        Button
                    </button>
                    <button className="btn btn-warning" disabled={true}>
                        Button
                    </button>
                    <button className="btn btn-danger" disabled={true}>
                        Button
                    </button>
                    <button className="btn btn-dark" disabled={true}>
                        Button
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Buttons
