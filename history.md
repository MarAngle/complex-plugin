### TODOLIST
- !函数说明持续完成优化！
- setDataByDefault循环引用判断添加

### 2.3.5-beta
- 优化
- getType使用修正

### 2.3.4
- deepClone hasOwnPropertyBUG修正

### 2.3.3
- 代码优化
- exportMsg优化
- 下载和url解析优化

### 2.3.2
- getPropByList输出优化

### 2.3.1
- require传递form数据时的Content-Type不强制设置为multipart/form-data，而是根据config.Require.formContentType赋值，且存在时不进行强制切换赋值

### 2.3.0
- 优化setData逻辑

### 2.2.16
- resetEnvData将fn的返回值返回
- require代码优化
- 兼容Vue3

### 2.2.15
- 优化parseTime
- formatTime逻辑优化:简化时间字符串的格式化
- BUG修正:日期格式化时之前不存在month生成时的offset未参与计算
- 删除formatUpdateDataOption输出,优化formatUpdateDataOption位置

### 2.2.14
- 优化下载逻辑
- 整体代码优化，添加trycatch

### 2.2.13
- 优化下载逻辑

### 2.2.12
- 扩展同源相关判断，优化下载逻辑

### 2.2.11
- 内部函数更新为$开头
- 优化相关类，继承优化，输出优化
- setLocalData中对JSON.stringify进行错误catch
- require扩展delete/put方法

### 2.2.10
- formatTree错误修正
- 响应式数据相关不默认输出
- Worker优化: url自动销毁，同步判断修正，逻辑优化
- revokeObjectURL优化

### 2.2.9
- git地址切换
- downloadFileByAnchor下载默认新建窗口进行

### 2.2.8
- warn BUG 修复

### 2.2.7
- 通过Vue.observable将complex-func转换为响应式数据，仅对根属性存在的对象进行构建

### 2.2.6
- 拷贝数据相关添加原型判断和hasOwnProperty判断

### 2.2.5
- page模块优化

### 2.2.4
- 添加page模块
- require
- - exportSelfMsg => $exportMsg
- - _selfName => $selfName

### 2.2.3
- printMsgAct => exportMsg
- printMsg => exportSelfMsg

### 2.2.2
- 添加resetEnvData函数
- 优化Promise

### 2.2.1
- formatTree删除childrenFormat配置项，添加format配置项

### 2.2.0
- require相关调用方式调整
- require相关实现token的delete/remove方法
- TokenRule优化remove方法，实现remove的回调以及是否删除的判断值传递
- 删除requiredata相关暴露接口

### 2.1.24
- 挂载到Vue的原型时使用Vue.set将func设置为响应式数据
- install添加toGlobal选项，可直接挂载到window根属性下，默认不挂载

### 2.1.23
- orderArrayByProp参数调整

### 2.1.22
- 同步完成函数的函数说明
- setDefaultData存在判断升级

### 2.1.21
- 添加setDataByDefault函数

### 2.1.20
- 添加getCurrentUrl
- axios依赖调整

### 2.1.19
- axios依赖调整

### 2.1.18
- !updateList函数调整，将各个操作添加判断值进行可操作判断
- 函数说明完成
- 梳理函数输出，删除没必要的函数

### 2.1.17
- 添加函数说明，进行中
- !getRandomData参数调整
- getRandomLetter默认值调整

### 2.1.16
- appendPropBUG修复，从append修改为set方法
- 添加关键词
- 引用顺序修正
- BUG修复停止测试
- 代码优化

### 2.1.15
- 更新time测试用例
- offsetTime中的数字计算优化，减少非预期小数的出现

### 2.1.14
- 实现getOffsetTimeStr

### 2.1.12
- jsonToForm函数中的getType需要complex

### 2.1.11
- required中的params中的数组使用join(,)默认格式化,BUG修复

### 2.1.10
- required中的params中的数组使用join(,)默认格式化

### 2.1.9
- 实现promiseAllFinished
- axios会对query字段做处理，但是数组格式会处理错误，暂时不做处理等待是否全局进行单独处理

### 2.1.8
- 修复require未对params做localEncodeURIComponent格式化的BUG
- 扩展config设置项，考虑加载时进行设置

### 2.1.7
- 暴露新函数

### 2.1.6
- Require中failMsg设置添加check，可定义是否覆盖非后端错误信息自动提示

### 2.1.5
- 添加isExist/getDefaultData

### 2.1.4
- isPromise和isSame优化
- openWindow优化
- axios依赖调整

### 2.1.3
- 暴露observe模块
- require相关注释添加
- 关闭自动test

### 2.1.2
- 创建reactive模块
- 创建observe模块
- getPropByList不使用trim

### 2.1.1
- axios依赖调整
- 添加isSame
- 测试相关函数添加，逻辑优化
- 添加defineProperty
- defineReactive逻辑优化
- 删除defineDeepReactive和defineDeepWatch
- defineWatch实现

### 2.1.0
- 版本逻辑更新，非兼容更新将会在第二位表现

### 2.0.19
- 测试结构更新
- formatTree逻辑优化，删除formatTreeNext,测试用例添加
- updateList中option.format不返回需要push的数据，因为此时需要的对象都是复杂格式，内存指针形式，因此format仅对对象数据做格式化，返回值为是否添加到数组中
- updateDataWidthOption实现total模式
- updateDataWidthOption参数顺序调整
- 添加isSymbol/formatNum，优化getType的symbol判断
- getType逻辑优化，二参数为真时进行额外判断，基础判断添加array，基础中不对symbol做额外的可能性判断

### 2.0.18
- current注释
- jsonToForm无法递归,使用JSON字符串实现逻辑
- exportMsg为引用isError的错误
- tokenRule的类实现
- SimpleData类实现
- requiredata结构调整
- Require相关注释添加

### 2.0.17
- 不进行测试,测试和加载在开发环境下进行
- 文件优化

### 2.0.16
- rule文件拆分,注释添加

### 2.0.15
- environment/worker文件拆分,注释添加
- updateData BUG修复
- LoadContents => loadContents

### 2.0.14
- hasProp逻辑优化，错误修复
- exportMsg优化，添加Error判断
- isError
- utils代码格式优化
- 暴露requiredata
- 优化复制/更新数据相关方法
- 添加loadContents函数
- utils文件拆分,注释添加

### 2.0.13
- 创建current当前时间相关函数，直接挂载到跟属性中，通过属性调用对应的方法，鉴于性能直接加载
- 添加runFunction，触发函数，通过回调的形式触发函数，存在callback时则直接进行下一步操作，可接收同步函数和Promise函数
- downloadBlob优化

### 2.0.12
- analyze=>parse作为分析相关字段名称
- getProp函数的优化，实现[.prop]属性的获取
- buildWatch=>defineWatch
- 添加defineReactive
- fillStr=>fillString，优化使用ES6语法
- 添加worker线程模块，基本实现线程操作，接受函数和传参，Promise的形式返回函数运行结果
- downloadFileByAnchor延时删除dom
- 挂载到Vue原型链设置方法添加，可指定属性

### 2.0.11
- 优化整体的本地缓存相关函数，后缀由LocalTemp更改为LocalData
- getPropByStr/setPropByStr/setStrPropByType => getProp/setProp/setPropByType
- reBuildProp => setDefaultData
- 函数变量语义化
- 代码结构优化

### 2.0.10
- 优化exportSelfMsg函数，添加exportMsg函数，优化整体错误输出相关
- 全局类的_selfName函数逻辑统一，实现类实例的名称输出
- 优化全局类的toString函数，统一调用_selfName函数输出