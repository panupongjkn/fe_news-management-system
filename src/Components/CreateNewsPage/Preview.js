import React from 'react'
import styled from 'styled-components'
import { NotificationFilled, FileAddFilled } from '@ant-design/icons';
import PreviewComponent from '../../Pages/News'

const Button = styled.button`
    background-color: #050042;
    color: white;
    &:hover {
        color: white;
    }
`
class ReviewComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    render(props) {
        this.scrollToTop()
        return (
            <div>
                <h3>Preview</h3>
                <div className="mx-3 px-5 pt-5 border rounded">
                    <PreviewComponent {...this.props} />
                </div>
                <div className="d-flex justify-content-between pt-5 mx-3">
                    <div className="d-inine-block">
                        <button onClick={this.props.onForm} className="btn btn-danger">Back</button>
                    </div>
                    <div className="d-inine-block">
                        <div className="d-flex">
                            <div className="d-inine-block">
                                <Button onClick={this.props.onDraft} className="btn ml-2 d-flex">
                                    <FileAddFilled className="mr-2 " style={{ fontSize: "20px", paddingTop: "3px" }} />
                                    <span>Draft</span>
                                </Button>
                            </div>
                            <div className="d-inine-block">
                                <Button onClick={this.props.onPublish} className="btn ml-2 d-flex">
                                    <NotificationFilled className="mr-2 " style={{ fontSize: "20px", paddingTop: "3px" }} />
                                    <span>Publish</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ReviewComponent