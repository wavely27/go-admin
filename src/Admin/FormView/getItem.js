import React from "react";
import {Cascader, DatePicker, Input, Select, Checkbox} from "antd";
import PropTypes from "prop-types";
import PicturesWall from '../components/Upload'

const {CheckboxGroup} = Checkbox

const getItem = ({component, componentType, innerProps}, formFlag, core, itemKey) => {
  const options = {
    style: {
      flex: 1,
      width: formFlag && 200
    },
    placeholder: "请输入内容",
    ...innerProps,
  }
  switch (component) {
    case 'Cascader':
      return <Cascader {...options} />
    case 'Input':
      return <Input {...options} />
    case 'DatePicker':
      return <DatePicker {...options} />
    case 'Checkbox':
      return <Checkbox {...options} />
    case 'CheckboxGroup':
      return <CheckboxGroup {...options} />
    case 'Upload':
      if (componentType) {
        return <PicturesWall options={options} core={core} itemKey={itemKey} />
      }
      return <PicturesWall options={options} core={core} itemKey={itemKey} />
    case 'Select':
      return (
        <Select {...options}>
          {
            options.options.map(opt => (
              <Select.Option key={opt.key} value={opt.key}>{opt.value}</Select.Option>
            ))
          }
        </Select>
      )
    default:
      return <Input {...options} />
  }
}

getItem.defaultProps = {
  component: 'Input',
  componentType: null,
  innerProps: {},
}

getItem.propTypes = {
  component: PropTypes.string,
  componentType: PropTypes.string,
  innerProps: PropTypes.object,
}

export default getItem