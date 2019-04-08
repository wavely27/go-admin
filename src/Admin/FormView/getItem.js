import React from "react";
import {Cascader, DatePicker, Input} from "antd";
import PropTypes from "prop-types";


const getItem = ({component, innerProps}, formFlag) => {
  console.log('formFlag', formFlag)
  const options = {
    style: {
      flex: 1,
      width: formFlag && 200
    },
    placeholder: "请输入内容",
    ...innerProps,
  }
  console.log('options', options)
  switch (component) {
    case 'Cascader':
      return <Cascader {...options} />
    case 'Input':
      return <Input {...options} />
    case 'DatePicker':
      return <DatePicker {...options} />
    default:
      return <Input {...options} />
  }
}

getItem.defaultProps = {
  component: 'Input',
  innerProps: {},
}

getItem.propTypes = {
  component: PropTypes.string,
  innerProps: PropTypes.object,
}

export default getItem