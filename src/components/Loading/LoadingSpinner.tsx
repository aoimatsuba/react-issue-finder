import * as React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
    return (
        <div className="text-center">
            <Spinner animation="border" className="m-5" variant="secondary" />
        </div>
    )
}

export default LoadingSpinner