import React from "react";
import {Cascader, DatePicker, Input} from "antd";
import PropTypes from "prop-types";


const getItem = ({component, itemProps}) => {
  const options = {
    style: {
      flex: 1,
    },
    placeholder: "请输入内容",
    ...itemProps,
  }
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
  itemProps: {},
}

getItem.propTypes = {
  component: PropTypes.string,
  itemProps: PropTypes.object,
}

export default getItem