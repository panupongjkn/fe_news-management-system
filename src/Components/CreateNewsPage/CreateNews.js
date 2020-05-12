import React from 'react'
import styled from 'styled-components'
import { Input, Checkbox, DatePicker, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewsType = styled.div`
    border-radius: 20px;
    cursor: pointer;
    background-color: ${props => props.selected ? "#050042" : "white"};
    color: ${props => props.selected ? "white" : "rgb(0,0,0,0.65)"};
`

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class ComponentForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
        }
    }

    componentDidMount() {
        this.setState({
            fileList: this.props.news.images
        })
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList })
        this.props.onChangeForm("images", fileList)
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <Input
                    name="title"
                    value={this.props.news.title}
                    onChange={this.props.onChangeNews}
                    placeholder="Title" />
                <div className="pt-3">
                    <CKEditor
                        editor={ClassicEditor}
                        config={{ placeholder: "Content..." }}
                        data={this.props.news.body}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data });
                            this.props.onChangeForm("body", data)
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </div>
                <div className="pt-3">
                    <Checkbox
                        onChange={this.props.onChageChecked}
                        checked={this.props.news.checkExpiredate}>
                        Expiredate
                        </Checkbox>
                    <DatePicker
                        disabled={!this.props.news.checkExpiredate}
                        onChange={(dateString) => this.props.onChangeForm("expiredate", dateString)} />
                </div>
                <div className="pt-3">
                    <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            multiple
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={this.handleCancel}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </div>
                <div className="pt-1">
                    Select news type
                    <div className="pt-2">
                        {this.props.news.newstypes.map((newstype, key) => {
                            return (
                                <NewsType onClick={() => this.props.onSelectNewsType(key)} selected={newstype.selected} className="border shadow-sm d-inline-block py-2 px-4 mr-2">
                                    {newstype.newstype}
                                </NewsType>
                            )
                        })}
                    </div>
                </div>
                <div className="text-right pt-3">
                    <button onClick={() => this.props.onPreview(this.state.fileList)} className="btn btn-success">Preview</button>
                </div>
            </div>
        )
    }
}
class CreateNewsComponent extends React.Component {
    render() {
        return (
            <div>
                <ComponentForm {...this.props} />
            </div>
        )
    }
}

export default CreateNewsComponent