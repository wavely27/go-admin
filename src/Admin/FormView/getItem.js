/* eslint-disable */
import React from "react";
import {Cascader, DatePicker, Input, Select, Checkbox, Radio} from "antd";
import PropTypes from "prop-types";
import PicturesWall from '../components/Upload'

const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group

const getItem = ({label, component, componentType, innerProps={}, render, setValue}, fixWidth, core, itemKey) => {
  /*let mixWidth = ''
  let style = {
    display: 'inline-block'
  }
  console.log('fixWidth', fixWidth)
  if (fixWidth) {
    mixWidth = 200
    style = {
      flex: 1,
      width: mixWidth,
    }
  }*/
  let style = {
    width: 220,
    ...innerProps.style
  }
  // status fix
  let placehandle = '请输入'
  if (component === 'Select' || component === 'Cascader') {
    placehandle = '请选择'
  }
  const placeholder = (typeof label === "string") ? `${placehandle}${label}` : `${placehandle}内容`


  const options = {
    style,
    placeholder,
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
    case 'Radio':
      return <Radio {...options} />
    case 'RadioGroup':
      return <RadioGroup {...options} />
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
    case 'Any':
      return render && render(setValue)
    default:
      return <Input {...options} />
  }
}

getItem.defaultProps = {
  component: 'Input',
  componentType: null,
  innerProps: {},
  render: undefined,
  setValue: undefined,
  label: 'label',
}

getItem.propTypes = {
  component: PropTypes.string,
  componentType: PropTypes.string,
  innerProps: PropTypes.object,
  render: PropTypes.func,
  setValue: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
}

export default getItem