import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import PropTypes from "prop-types";

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  static defaultProps = {
    core: {},
    itemKey: {},
    options: {},
  }

  static propTypes = {
    core: PropTypes.object,
    itemKey: PropTypes.string,
    options: PropTypes.object,
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // handleChange = ({ fileList }) => this.setState({ fileList })

  handleChange = (info) => {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    const {core, itemKey} = this.props
    // console.log('info', info)
    // console.log('info.file', info.file)
    const {file} = info
    this.setState({
      fileList: [file]
    })
    if (info.file.status === 'done') {
      const {response = {}} = info.file
      if (response.status === 1) {
        core.formCore.setFieldsValue({
          [itemKey]: response.url
        })
        message.success('上传成功')
      }
      // if (response.status !== 1) {
      //   message.error(`文件数据校验失败: ${response.message}`);
      //   self.setState({
      //     fileList: []
      //   })
      // } else {
      //   message.success('文件数据校验正常')
      //   self.setState({
      //     originFileObj: info.file.originFileObj,
      //   })
      // }
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {options} = this.props
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          // action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          {...options}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall
