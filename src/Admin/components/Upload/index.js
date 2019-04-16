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

  componentDidMount() {
    const {options, core, itemKey} = this.props
    if (options) {
      const {setInitialValue, } = options
      const value = core.formCore.getFieldValue(itemKey)
      value && setInitialValue && setInitialValue(value, this)
    }
  }

  componentWillReceiveProps(nextProps) {
    const {options, core, itemKey} = nextProps
    if (options) {
      const {setInitialValue, } = options
      const value = core.formCore.getFieldValue(itemKey)
      value && setInitialValue && setInitialValue(value, this)
    }
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
    const {core, itemKey} = this.props
    console.log('info1', info)
    // console.log('info.file', info.file)
    const {file} = info
    this.setState({
      fileList: [file]
    })
    if (info.file.status === 'done') {
      const {response = {}} = info.file
      console.log('info-done', info)
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

  handleRemove = () => {
    const {core, itemKey} = this.props

    this.setState({
      fileList: []
    })
    core.formCore.setFieldsValue({
      [itemKey]: undefined
    })
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
      <div className="clearfix bug_fix">
        <Upload
          // action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
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
