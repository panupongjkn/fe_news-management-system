import React from 'react'
import PreviewComponent from '../../Pages/News'

class ReviewComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render() {
        this.scrollToTop()
        return (
            <div>
                <h3>Preview</h3>
                <div className="mx-3 p-5 border rounded">
                    <PreviewComponent {...this.props} />
                </div>
                <div className="d-flex justify-content-between py-5 mx-3">
                    <div className="d-inine-block">
                        <button onClick={this.props.onForm} className="btn btn-danger">Back</button>
                    </div>
                    <div className="d-inine-block">
                        <button onClick={this.props.onDraft} className="btn btn-primary ml-2">Draft</button>
                        <button onClick={this.props.onPublish} className="btn btn-primary ml-2">Publish</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ReviewComponent