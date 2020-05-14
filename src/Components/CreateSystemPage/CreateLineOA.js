import React from 'react'
import { Input, Checkbox } from 'antd'
class CreateLineOA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div {...this.props}>
                <Checkbox
                    onChange={this.props.onCheckLineOA}
                    checked={this.props.system.checkLineOA}
                >
                    LineOA
                </Checkbox>
                <div className="ml-5" >
                    {this.props.system.lineOA.map((lineoa, key) => {
                        return (
                            <div className="pt-2">
                                <p>Line OA ({key + 1})</p>
                                <Input
                                    disabled={this.props.system.checkLineOA ? false : true}
                                    onChange={(e) => this.props.onChangeLineOA(e, key)}
                                    name="lineoaname"
                                    value={lineoa.lineoaname}
                                    required
                                    placeholder="Channel Name" type="text" />
                                <Input
                                    minlength="10" maxlength="10"
                                    disabled={this.props.system.checkLineOA ? false : true}
                                    onChange={(e) => this.props.onChangeLineOA(e, key)}
                                    name="channelid"
                                    value={lineoa.channelid}
                                    className="mt-1"
                                    required
                                    placeholder="Channel ID"
                                    type="text" />
                                <Input
                                    minlength="172" maxlength="172"
                                    disabled={this.props.system.checkLineOA ? false : true}
                                    onChange={(e) => this.props.onChangeLineOA(e, key)}
                                    name="channeltoken"
                                    value={lineoa.channeltoken}
                                    className="mt-1"
                                    required
                                    placeholder="Channel Access Token"
                                    type="text" />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default CreateLineOA

