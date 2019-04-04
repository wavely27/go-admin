const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
  "@babel/preset-react",
];
const plugins = [
  // "@babel/plugin-transform-runtime",
  "@babel/plugin-proposal-class-properties",
  ["import", {
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": "css" // `style: true` 会加载 less 文件
  }]
]

module.exports = { presets, plugins };