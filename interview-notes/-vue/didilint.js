// • 项目：didi-lint 静态合规扫描插件 `JavaScript`

// • 职责描述：

// 	◦ 升级插件 ESLint 版本至 v8，解决 16 处 AST 解析兼容问题；

//   • 针对小程序 MPX 框架自定义指令和 DRN 跨端框架 API 调用风险，新增 28 条静态检测规则，拦截敏感权限调用等隐患，周均扫描风险代码项目 15+ 例。


// 'use strict'

/**
 • 识别小程序隐私api

 • api依据： https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/miniprogram-intro.html

 • 识别语法类型：

 • 1. wx.xxx

 • 2. RecorderManager.xxx

 • 3. 指定标签语法

 •    <button open-type="userInfo">       收集你的微信昵称、头像

 •    <button open-type="getPhoneNumber"> 收集你的手机号

 •    <live-pusher>                       访问你的麦克风

 •    <camera>                            访问你的摄像头

 •    <voip-room>                         访问你的摄像头

 */
/* 
type: 
1 used_list
2 privacy_list
3 encrypt_data
4 dimina_list
7 sensitive_list
8 P0_list

level: 
0 无风险
1 高位
2 普通
*/
const { WXAuthorizeMap, ExpressionMap, sensitiveInfoMap } = require('./rule-key-maps')
module.exports = {
  meta: {
    docs: {
      description: '最多参数',
    },
  },
  
  create: function (context) {
    /**
     ◦ 获取函数的参数的开始、结束位置

     ◦ @param {node} node AST Node

     */
    return {
      Program: (node) => {
        const descObj = {
          getPhoneNumber: {
            desc: '手机号信息',
            key: 'getPhoneNumber',
            type: 2,
            level: 1
          }
        }
        if(!(node && node.templateBody)) return
        function getChildTag(child) {
          child.forEach(item => {
            if(item.name === 'button') {
              item.startTag.attributes.forEach(attr => {
                if(attr.type === 'VAttribute' && attr.key.name === 'open-type' && attr.value.value === 'getPhoneNumber') {
                  const {desc, type, level, key} = descObj[attr.value.value]
                  context.report({ node, message: `${desc};${attr.value.value};${type};${level};${key};${item.loc.start.line}`})
                }
              })
            } else if (item.children && item.children.length) {
              getChildTag(item.children)
            }
          })
        }
        if (node.templateBody.children && node.templateBody.children.length) {
          getChildTag(node.templateBody.children)
        }
      },
      Identifier: (node) => {
        const nodeName = node && node.name
        if(nodeName && sensitiveInfoMap[nodeName] && node.parent && node.parent.type === 'Property') {
          const { type, level, key, desc } = sensitiveInfoMap[nodeName]
          context.report({ node, message: `${desc};${nodeName};${type};${level};${key}`})
        }
      },
      /**
       ◦ 对象方法

       ◦ @param {*} node 节点

       ◦ @returns 

       */
      MemberExpression: (node) => {
        const isObjectIndetifier =
          node.object && node.object.type === 'Identifier'
        if (!isObjectIndetifier) return
        const isPropertyIdentifier =
          node.property && node.property.type === 'Identifier'
        if (!isPropertyIdentifier) return
        const objectName = node.object.name
        const propertyName = node.property.name
        if(objectName === 'wx' || objectName === 'mpx' || objectName === 'dd' || objectName === 'uni') {
          // 识别wx.authorize()
          if(propertyName === 'authorize') {
            if (node.parent.type === 'CallExpression' && node.parent.arguments.length > 0) {
              const argumentNode = node.parent.arguments[0]
              if (argumentNode.type === 'ObjectExpression') {
                const propertyNode = argumentNode.properties[0]
                if (propertyNode.key.name == 'scope') {
                  const {value} = propertyNode.value
                  if(WXAuthorizeMap[value]) {
                    const { type, level, key, desc } = WXAuthorizeMap[value]
                    context.report({ node, message: `${desc};${objectName}.authorize({scope: ${value}});${type};${level};${key}`})
                  }
                }
              } else if (argumentNode.type === 'Literal') {
                const {value} = argumentNode
                if(WXAuthorizeMap[value]) {
                  const { type, level, key, desc } = WXAuthorizeMap[value]
                  context.report({ node, message: `${desc};${objectName}.authorize({scope: ${value}});${type};${level};${key}`})
                }
              }
            }
          }
          // 识别wx.xxx || mpx.xxx
          if(ExpressionMap[propertyName]) {
            const { type, level, key, desc } = ExpressionMap[propertyName]
            context.report({ node, message: `${desc};${objectName}.${propertyName};${type};${level};${key}`})
          }
        }
      }
    }
  },
}