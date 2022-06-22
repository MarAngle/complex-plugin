# 基本功能
- 深度封装请求函数,基于axios,实现请求规则的实现,cookie暂不考虑,根据需求改动
- 集成常见工具函数,快速实现基本功能

# 函数列表
## current当前时间

## data数据

## TYPE类型判断
### getTag
  > ### 说明
  > - 获取Object.prototype.toString.call的值
  > ### 参数
  > - value:any,需要进行判断的值
  > ### 返回值
  > - stringTag:string,返回Object.prototype.toString.call(value)
### isArray
  > ### 说明
  > - 是否是Array
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isArray:boolean,value is Array
### isBlob
  > ### 说明
  > - 是否是Blob
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isBlob:boolean,value is Blob
### isDate
  > ### 说明
  > - 是否是Date
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isDate:boolean,value is Date
### isError
  > ### 说明
  > - 是否是Error
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isError:boolean,value is Error
### isFile
  > ### 说明
  > - 是否是File
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isFile:boolean,value is File
### isRegExp
  > ### 说明
  > - 是否是RegExp
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isRegExp:boolean,value is RegExp
### isSymbol
  > ### 说明
  > - 是否是Symbol
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isSymbol:boolean,value is Symbol
### getType
  > ### 说明
  > - 获取value的数据类型
  > ### 参数
  > - value:any,需要获取类型的值
  > - complex?:boolean,复杂判断,为否则在typeof基础上额外判断null/array,为真则再额外判断file/blob/date/regexp,并准确判断symbol
  > ### 返回值
  > - stringTag:["string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "array" | "file" | "blob" | "regexp" | "date"],类型
### isPromise
  > ### 说明
  > - 是否是Pomise
  > ### 参数
  > - value:any,需要判断的值
  > ### 返回值
  > - isPomise:boolean,value is Pomise
### isExist
  > ### 说明
  > - 是否Exist
  > ### 参数
  > - value:any,需要判断的值
  > - existList?:any[\],为否但是需要判断为存在的值数组,默认为[false, 0]
  > - unExistList?:any[\],为真但是需要判断为不存在的值数组,默认为[\]
  > ### 返回值
  > - isExist:boolean,value is Exist
### isSame
  > ### 说明
  > - 是否相同=>对象则直接进行属性的依次对比
  > ### 参数
  > - value:any,需要判断的value
  > - other:any,需要判断的other
  > ### 返回值
  > - isSame:boolean,value and other is Same
### isComplex
  > ### 说明
  > - 是否是Complex:复杂对象object&array
  > ### 参数
  > - value:any,需要判断的类型值
  > ### 返回值
  > - isComplex:boolean,value is Complex
### checkComplex
  > ### 说明
  > - 通过getType获取对应的类型并判断此类型是否是复杂对象
  > ### 参数
  > - value:any,需要进行判断的值
  > ### 返回值
  > - isComplex:boolean,是否是复杂对象
### isEmptyArray
  > ### 说明
  > - 是否为空数组
  > ### 参数
  > - value:any,需要判断的值
  > - type:string,value的类型
  > ### 返回值
  > - isEmptyArray:boolean,value is EmptyArray
### isEmptyObject
  > ### 说明
  > - 是否为空对象
  > ### 参数
  > - value:any,需要判断的值
  > - type:string,value的类型
  > ### 返回值
  > - isEmptyObject:boolean,value is EmptyObject
### isEmpty
  > ### 说明
  > - 是否为空
  > ### 参数
  > - value:any,需要判断的值
  > - checkList?:string[],需要深入判断的数据类型,对象和数组可选,默认config.type.emptyCheckList,判断对象和数组
  > ### 返回值
  > - isEmpty:boolean,value is Empty
---

## NUMBER数字
### formatNum
  > ### 说明
  > - 将value转换为数字并返回
  > ### 参数
  > - value:any,需要转换的值
  > ### 返回值
  > - number:number
### getNum
  > ### 说明
  > - 格式化数字
  > ### 参数
  > - originNum:any,需要格式化的值
  > - type?:'origin' | 'round' | 'floor' | 'ceil',格式化的类型,默认为round
  > - radix?:number,保留小数点位数
  > - NANZERO?:boolean,NAN是否格式化为0,默认为true
  > ### 返回值
  > - number:number
### parseNum
  > ### 说明
  > - 解析数字,返回数组,第一位为整数,第二位为小数,数字格式
  > ### 参数
  > - value:number,需要解析的数据
  > ### 返回值
  > - list:[number, number]
### getDecimal
  > ### 说明
  > - 获取数字的小数部分
  > ### 参数
  > - value:any,需要获取小数的值
  > ### 返回值
  > - number:number
### getInteger
  > ### 说明
  > - 获取数字的整数部分
  > ### 参数
  > - value:any,需要获取整数的值
  > ### 返回值
  > - number:number
### getRandomNum
  > ### 说明
  > - 获取从start开始, 最大值为size - 1 的随机数,开始和结束的可能平均
  > ### 参数
  > - start:number,开始值
  > - size:number,总长度
  > ### 返回值
  > - number:number
---

## STRING字符串
### fillString
  > ### 说明
  > - 将目标字符串中指定未知填充指定字符串到指定长度
  > ### 参数
  > - str:string,目标字符串
  > - targetLength?:number,目标长度,默认为2
  > - padString?:string,填充字符串,默认为'0'
  > - to?:'start' | 'end',填充位置,默认为start
  > - unDivision?:boolean,是否分割填充字符串,默认分割
  > ### 返回值
  > - str:string
### findTargetInStr
  > ### 说明
  > - 查找target在目标字符串中的位置数组
  > ### 参数
  > - str:string,目标字符串
  > - target:string,需要查找的字符串
  > - option?:object,设置项
  > > - option.case?:boolean,是否忽略大小写,默认不忽略
  > > - option.limitNum?:false | number,限制数量,false不限制
  > ### 返回值
  > - list:number[]
### getRandomData
  > ### 说明
  > - 获取随机字符串
  > ### 参数
  > - size:number,长度
  > - letter?:object,字符串库
  > > - letter.small?:boolean,字符串库设置,小写字母,默认为真
  > > - letter.big?:boolean,字符串库设置,大写字母,默认为真
  > > - letter.number?:boolean,字符串库设置,整数,默认为真
  > ### 返回值
  > - str:string
### getRandomInList
  > ### 说明
  > - 从列表中随机取值
  > ### 参数
  > - list:any[]
  > ### 返回值
  > - res:any
### getRandomLetter
  > ### 说明
  > - 获取随机字符
  > ### 参数
  > - letter?:object,字符串库
  > > - letter.small?:boolean,字符串库设置,小写字母,默认为真
  > > - letter.big?:boolean,字符串库设置,大写字母,默认为真
  > > - letter.number?:boolean,字符串库设置,整数,默认为真
  > ### 返回值
  > - str:string
### strCodeNum
  > ### 说明
  > - 获取字符串每个字符的code值和
  > ### 参数
  > - str:string
  > ### 返回值
  > - num:number
---

## OBJECT对象
### deepClone
  > ### 说明
  > - 深拷贝
  > ### 参数
  > - origindata:any,需要进行深拷贝的对象
  > - option?:boolean | object,用户设置的设置项,根据此项调用不同方法,为否通过JSON.parse(JSON.stringify())进行深拷贝,为true通过循环deepCloneData,为对象则通过deepCloneDataWithOption进行深拷贝
  > > - option.type?:'total' | 'add',全更新/附加更新判断值
  > > - option.reset?:boolean,重置判断值,默认为真,类型不同且reset为真时,无法将以前的数据作为基准,将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth?:boolean | number,属性深度判断值
  > > - option.limitData?:LimitData,属性限制判断值
  > > - option.limit?:object,属性限制判断值limitData生成参数
  > > > - option.limit.type?:'forbid' | 'allow',属性限制判断值limitData生成参数-type
  > > > - option.limit.list?:string[],属性限制判断值limitData生成参数-list
  > ### 返回值
  > - copydata:any
### deepCloneData
  > ### 说明
  > - 基础版本的深拷贝
  > ### 参数
  > - origindata:any,需要进行深拷贝的对象
  > - map?:Map,循环引用缓存
  > ### 返回值
  > - copydata:any
### deepCloneDataWithOption
  > ### 说明
  > - updateDataWidthOption的深拷贝
  > ### 参数
  > - origindata:any,需要进行深拷贝的对象
  > - option?:object,用户设置的设置项,通过updateDataWidthOption进行深拷贝
  > > - option.type?:'total' | 'add',全更新/附加更新判断值
  > > - option.reset?:boolean,重置判断值,默认为真,类型不同且reset为真时,无法将以前的数据作为基准,将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth?:boolean | number,属性深度判断值
  > > - option.limitData?:LimitData,属性限制判断值
  > > - option.limit?:object,属性限制判断值limitData生成参数
  > > > - option.limit.type?:'forbid' | 'allow',属性限制判断值limitData生成参数-type
  > > > - option.limit.list?:string[],属性限制判断值limitData生成参数-list
  > ### 返回值
  > - copydata:any
### updateData
  > ### 说明
  > - 基于origindata更新targetdata数据,type默认为add
  > ### 参数
  > - targetdata:any,目标数据
  > - origindata:any,数据源,以此数据为准对targetdata进行更新
  > - option?:object,用户设置的设置项,通过updateDataWidthOption进行深拷贝
  > > - option.type?:'total' | 'add',全更新/附加更新判断值
  > > - option.reset?:boolean,重置判断值,默认为真,类型不同且reset为真时,无法将以前的数据作为基准,将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth?:boolean | number,属性深度判断值
  > > - option.limitData?:LimitData,属性限制判断值
  > > - option.limit?:object,属性限制判断值limitData生成参数
  > > > - option.limit.type?:'forbid' | 'allow',属性限制判断值limitData生成参数-type
  > > > - option.limit.list?:string[],属性限制判断值limitData生成参数-list
  > ### 返回值
  > - targetdata:any
### updateDataWidthOption
  > ### 说明
  > - 基于origindata更新targetdata数据,type默认为add
  > ### 参数
  > - targetdata:any,目标数据
  > - origindata:any,数据源,以此数据为准对targetdata进行更新
  > - option:object,用户设置的设置项,通过updateDataWidthOption进行深拷贝
  > > - option.type:'total' | 'add',全更新/附加更新判断值
  > > - option.reset:boolean,重置判断值,默认为真,类型不同且reset为真时,无法将以前的数据作为基准,将会对源数据的对应值根据类型重置后再进行深拷贝循环
  > > - option.depth:boolean | number,属性深度判断值
  > > - option.limitData:LimitData,属性限制判断值
  > - currentnum:number,当前深度,从1开始计算
  > - currentprop:string,当前属性,多级按.
  > - map:Map,循环引用缓存
  > ### 返回值
  > - targetdata:any
### mergeData
  > ### 说明
  > - 合并数据函数,可以理解为简化版本的add模式的updateData,基于源数据originData格式化目标数据targetData函数
  > ### 参数
  > - targetData:any,目标数据
  > - ...originList:any[],源数据列表
  > ### 返回值
  > - targetData:object
### updateList
  > ### 说明
  > - 基于originlist更新targetlist列表数据
  > ### 参数
  > - targetlist:object[],目标列表:需要进行更新的列表
  > - originlist:object[],源数据列表:最新数据,以此为基准对目标列表数据进行更新
  > - option:object,设置项
  > > - option.check:string | function | object,相同项检查,必传,object模式下取prop值进行对比,function时通过(targetItem, originItem)返回值对比,string时作为prop取值对比
  > > - option.check.prop?:string,prop取值对比
  > > - option.check.equal?:boolean,取值对比全等于判断
  > > - option.update?:object | function,更新数据的设置值,默认空对象,object模式下调用updateData进行更新,此为设置项,function模式下(targetItem, originItem)进行更新
  > > - option.destroy?:boolean | function,销毁函数,默认为真,targetlist中需要删除的数据会调用此方法,为否则不进行删除判断
  > > - option.format?:boolean | function,格式化函数,默认为真,targetlist中需要push的数据会调用此方法,format仅对对象数据做格式化,返回值为是否添加到数组中,为否不进行push判断
  > ### 返回值
  > - :void
### formatList
  > ### 说明
  > - 将originList中的值经过updateData后push到targetList中
  > ### 参数
  > - originList:object[],源数组
  > - option?:object,updateData设置项
  > - targetList?:object[],目标数组
  > ### 返回值
  > - targetList:object[]
### formatTree
  > ### 说明
  > - 格式化list为tree数组
  > ### 参数
  > - originList:object[],源数组
  > - option?:object,设置项
  > > - option.id?:string,id属性,默认值id
  > > - option.parentId?:string,parentId属性,默认值parentId
  > > - option.children?:string,树形接口的子列表属性,默认值children
  > > - option.type?:string,返回值类型,默认为list,map情况下将dataMap直接返回
  > > - option.format?:function,数据格式化函数
  > ### 返回值
  > - res:object[] | {object}
### appendProp
  > ### 说明
  > - 指定对象/FormData添加属性
  > ### 参数
  > - data:object | FormData,需要添加属性的对象
  > - propName:string,属性名
  > - propData:any,属性值
  > - type:'json' | 'formdata',需要添加对象的对应类型,默认为json
  > ### 返回值
  > - :void
### choiceProp
  > ### 说明
  > - 更改list列表中选择的prop属性为指定值target,存在item则item更改为itemTarget
  > ### 参数
  > - list:object[],目标数组
  > - prop:string,属性
  > - target:any,目标值
  > - item?:object,特殊对象
  > - itemTarget?:any,特殊对象值
  > ### 返回值
  > - :void
### defineProperty
  > ### 说明
  > - 设置属性描述
  > ### 参数
  > - origindata:object,对象
  > - prop:string,属性
  > - descriptor:object,属性描述
  > - descriptor.configurable?:boolean,可配置描述
  > - descriptor.enumerable?:boolean,可遍历描述
  > - descriptor.get?:function,getter
  > - descriptor.set?:function,setter
  > - descriptor.value?:any,值
  > - descriptor.writable?:boolean,可读写描述
  > ### 返回值
  > - isSuccess:boolean
### jsonToForm
  > ### 说明
  > - 将对象转换为FormData格式
  > ### 参数
  > - value:object,对象
  > ### 返回值
  > - formData:FormData
### hasProp
  > ### 说明
  > - 判断对象是否存在对应属性
  > ### 参数
  > - value:object,对象
  > - prop:string,属性
  > ### 返回值
  > - hasProp:value has prop
### formatDataByType
  > ### 说明
  > - 根据类型格式化对象,暂时只对number和boolean进行格式化
  > ### 参数
  > - value:any,需要格式化的值
  > - type?:string,需要格式化的类型,默认为string
  > ### 返回值
  > - typeValue:type
### getDefaultData
  > ### 说明
  > - 获取value\[prop],当value\[prop]不存在时获取默认值defaultData,判断条件是isExist
  > ### 参数
  > - value:object,值
  > - prop:string,属性
  > - defaultData:any,默认值
  > - existList?:any[\],存在列表
  > - unExistList?:any[\],不存在列表
  > ### 返回值
  > - res:any
### setDefaultData
  > ### 说明
  > - 当value\[prop]不存在时设置默认值defaultData,存在时不做操作
  > ### 参数
  > - value:object,值
  > - prop:string,属性
  > - defaultData:any,默认值
  > - exist?:object | any[],存在判断设置项，数组格式则为existList
  > - exist.existList?:any[],判断为否但需要判断为真的值列表
  > - exist.unExistList?:any[],判断为真但需要判断为否的值列表
  > ### 返回值
  > - :void
### setDataByDefault
  > ### 说明
  > - 根据defaultData默认值设置targetData
  > ### 参数
  > - targetData:object,目标值
  > - defaultData:object,默认值
  > ### 返回值
  > - :targetData
### getProp
  > ### 说明
  > - 根据'mainprop.prop'格式字符串获取对象值
  > ### 参数
  > - value:object,对应对象
  > - prop:string,对应属性
  > - intervalRepeat:boolean,分隔符.重复判断值, 默认为否;为真时连续.会全部删除,为否时连续和开始结束分隔符会保留,此时.视为属性,.a直接取[.a],a..b取\[.a]\[.b],理论上无法对\[a.]取值
  > - showError?:boolean,显示错误输出
  > ### 返回值
  > - res:any
### getPropByList
  > ### 说明
  > - 根据属性列表获取对象属性
  > ### 参数
  > - value:object,对应对象
  > - propList:string[],属性列表
  > - showError?:boolean,显示错误输出
  > ### 返回值
  > - res:any
### setProp
  > ### 说明
  > - 根据a.b字符串设置属性
  > ### 参数
  > - value:object,对应对象
  > - prop:string,属性字符串a.b,,父属性不存在时会创建对象
  > - propData:any,属性值
  > - useSetData?:boolean,为真时通过setData进行赋值操作,主要针对框架中直接赋值无法响应的操作
  > ### 返回值
  > - isSuccess:boolean
### setPropByList
  > ### 说明
  > - 根据属性列表设置属性值
  > ### 参数
  > - value:object,对应对象
  > - propList:string[],属性列表,父属性不存在时会创建对象
  > - propData:any,属性值
  > - useSetData?:boolean,为真时通过setData进行赋值操作,主要针对框架中直接赋值无法响应的操作
  > ### 返回值
  > - :void
### setPropByType
  > ### 说明
  > - 根据type设置对象属性值
  > ### 参数
  > - value:object,对应对象
  > - prop:string,属性字符串a.b,,父属性不存在时会创建对象
  > - propData:any,属性值
  > - type:string,属性值类型
  > - useSetData?:boolean,为真时通过setData进行赋值操作,主要针对框架中直接赋值无法响应的操作
  > ### 返回值
  > - isSuccess:boolean
### orderArrayByProp
  > ### 说明
  > - 根据rule数组顺序对list\[index]\[prop]的值进行排序
  > ### 参数
  > - list:object[],目标数组
  > - prop:string,对比属性
  > - ruleList:any[],对比属性值列表
  > ### 返回值
  > - targetData:object
### clearArray
  > ### 说明
  > - 清空数组
  > ### 参数
  > - list:any[],目标数组
  > ### 返回值
  > - :void
### arrayClearOther
  > ### 说明
  > - 数组清除其他对象
  > ### 参数
  > - list:array,目标数组
  > - index:number,清理到index
  > - startIndex:number,开始清理的startIndex
  > ### 返回值
  > - :void
### showArrayProp
  > ### 说明
  > - 数组属性快速输出到控制台
  > ### 参数
  > - list:object[],目标数组
  > - prop:string,属性字符串,.类型
  > ### 返回值
  > - :void
---

## REACTIVE响应式
### defineReactive
  > ### 说明
  > - 创建响应式数据
  > ### 参数
  > - origindata:object,对象
  > - prop:string,属性
  > - option:object,设置项
  > - option.get?:function,属性获取拦截器
  > - option.set?:function,属性设置拦截器
  > > - option.descriptor?:object,属性描述设置项
  > > - option.descriptor.configurable?:boolean,默认为真,指定对象的属性描述可配置(改变/删除)
  > > - option.descriptor.enumerable?:boolean,默认为真,指定对象的属性可枚举
  > - val:any,属性值
  > ### 返回值
  > - isSuccess:boolean
### defineWatch
  > ### 说明
  > - 创建响应式数据
  > ### 参数
  > - origindata:object,对象
  > - prop:string,属性
  > - option:function | object,回调函数或者回调设置项
  > - option.handler?:function,回调函数
  > - option.deep?:boolean,深度监控
  > - option.immediate?:boolean,立即调用
  > ### 返回值
  > - isSuccess:boolean
---

## OBSERVE观察者数据
### observe
  > ### 说明
  > - 将value设置为观察者数据
  > ### 参数
  > - value:any,需要设置的数据
  > ### 返回值
  > - ob:Observer
### Watcher:CLASS
  > ### 说明
  > - 创建watcher监控
  > ### 参数
  > - target:经过Observer包装的数据
  > - expression:属性.结构
  > - option:function | object,回调函数或者回调设置项
  > - option.handler?:function,回调函数
  > - option.deep?:boolean,深度监控
  > ### 返回值
  > - watcher:Watcher
---

## FUNCTION函数
### runFunction
  > ### 说明
  > - 触发函数,通过回调的形式触发函数,存在callback时则直接进行下一步操作,可接收同步函数和Promise函数
  > ### 参数
  > - func:function,函数
  > - args:any[],参数
  > - callback?:function,回调
  > ### 返回值
  > - :void
### triggerFunc
  > ### 说明
  > - 触发可能存在的函数
  > ### 参数
  > - func:function,函数
  > - args:any[],参数
  > ### 返回值
  > - isTrigger:boolean
### triggerPromise
  > ### 说明
  > - 触发Promise函数:接收func必须返回Promise或者promise为Promise对象
  > ### 参数
  > - option:object,设置项
  > - option.func?:function,返回Promise的函数
  > - option.args?:any[],函数参数
  > - option.promise?:Promise,Promise对象,不存在时则会通过func(..args)返回
  > - option.error?:function,错误回调=>不触发完成
  > - option.start?:function,开始回调
  > - option.success?:function,成功回调
  > - option.fail?:function,失败回调
  > - option.finish?:function,完成回调
  > ### 返回值
  > - :void
---

## UTILS工具
### getCurrentUrl
  > ### 说明
  > - 获取当前URL
  > ### 参数
  > - option?:object,设置项
  > - option.pathname?:boolean,是否添加pathname，默认添加，不添加false
  > ### 返回值
  > - url:string
### formatQueryUrl
  > ### 说明
  > - 设置queryUrl
  > ### 参数
  > - url:string
  > - data:object,值对象
  > ### 返回值
  > - queryUrl:string
### getQueryUrl
  > ### 说明
  > - 获取query字段
  > ### 参数
  > - url:string
  > ### 返回值
  > - queryStr:string
### getQueryData
  > ### 说明
  > - 解析query数据（#此处不做判断）
  > ### 参数
  > - url:string
  > ### 返回值
  > - queryData:object
### parseUrl
  > ### 说明
  > - 解析url为基本location对象
  > ### 参数
  > - url:string
  > ### 返回值
  > - location:object
### isOriginUrl
  > ### 说明
  > - 判断2个URL是否同源
  > ### 参数
  > - url:string
  > - otherUrl?:string 不存在时取当前url对应的location
  > ### 返回值
  > - isOrigin:boolean
### exportSelfMsg
  > ### 说明
  > - complex-func错误信息输出函数
  > ### 参数
  > - msg:string,错误信息内容
  > - type?:'error' | 'warn' | 'log',信息提示类型
  > - object?:object,额外信息设置项
  > - object.data?:string,额外信息内容
  > - object.type?:'error' | 'warn' | 'log',额外信息提示类型
  > ### 返回值
  > - :void
### exportMsg
  > ### 说明
  > - 错误信息输出函数
  > ### 参数
  > - msg:string | Error,错误信息内容
  > - type?:'error' | 'warn' | 'log',信息提示类型
  > - object?:object,额外信息设置项
  > - object.data?:string,额外信息内容
  > - object.type?:'error' | 'warn' | 'log',额外信息提示类型
  > ### 返回值
  > - :void
### localEncodeURIComponent
  > ### 说明
  > - encodeURIComponent字符转换
  > ### 参数
  > - str:string
  > ### 返回值
  > - :string
### showJson
  > ### 说明
  > - 控制台展示json数据
  > ### 参数
  > - value:object
  > ### 返回值
  > - :void
### trimData
  > ### 说明
  > - 清除开始结束空格，仅对字符串有效
  > ### 参数
  > - value:any
  > ### 返回值
  > - value:any
### getLimitData
  > ### 说明
  > - 获取限制对象
  > ### 参数
  > - option:object,limitData生成参数
  > - option.type?:'forbid' | 'allow',limitData生成参数-type
  > - option.list?:string[],limitData生成参数-list
  > - autoType?:'forbid' | 'allow',option.type不存在时的默认值,默认值为'forbid'
  > ### 返回值
  > - LimitData:LimitData
### promiseAllFinished
  > ### 说明
  > - Promise.allFinished
  > ### 参数
  > - list:Promise[],Promise列表
  > ### 返回值
  > - :Promise<{status:'success' | 'fail', data: any}[]>
### loadContents
  > ### 说明
  > - 加载require contents
  > ### 参数
  > - contents:requireContents对象
  > - fn?:function,回调函数，(moddata:模块(需要获取default), path: 模块路径, index: 顺序) => void
  > ### 返回值
  > - :void
### openAnchor
  > ### 说明
  > - 基于a标签打开文件
  > ### 参数
  > - url:string
  > - target?:string 窗口目标
  > - download?:string 下载名称
  > ### 返回值
  > - isSuccess:boolean
### openWindow
  > ### 说明
  > - 参照window.open
### downloadBlob
  > ### 说明
  > - 下载blob文件
  > ### 参数
  > - blobValue:blobValue
  > - type:string
  > - name:string
  > ### 返回值
  > - isSuccess:boolean
### downloadFileByAnchor
  > ### 说明
  > - 基于a标签下载文件
  > ### 参数
  > - url:string
  > - name?:string
  > - target?:string:_blank
  > ### 返回值
  > - isSuccess:boolean
### downloadFile
  > ### 说明
  > - 下载文件
  > ### 参数
  > - data:string | object
  > - data.url?:string
  > - data.name?:string
  > ### 返回值
  > - isSuccess:boolean
### transformFile
  > ### 说明
  > - 文件属性转换
  > ### 参数
  > - from:'BASE64' | 'FILE' | 'BLOB'
  > - to:'BASE64' | 'FILE' | 'BLOB'
  > - data?:string | File | Blob
  > - filename?:string
  > ### 返回值
  > - :Promise<{ data: string | File | Blob }>
### throttle
  > ### 说明
  > - 函数节流，就是指连续触发事件但是在 n 秒中只执行一次函数。 节流会稀释函数的执行频率
  > ### 参数
  > - func:function,函数
  > - wait:number,延迟执行毫秒数
  > - type?:1 | 2,默认为1,1 表时间戳版，2 表定时器版.时间戳版和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，而定时器版的函数触发是在时间段内结束的时候。
  > ### 返回值
  > - throttleFunction:function
### debounce
  > ### 说明
  > - 函数防抖，触发事件N秒后执行函数，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
  > ### 参数
  > - func:function,函数
  > - wait:number,延迟执行毫秒数
  > - immediate?:boolean,true 表立即执行，false 表非立即执行.非立即执行的意思是触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。立即执行的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果。
  > ### 返回值
  > - debounceFunction:function
---

## LOCAL本地缓存
### setLocalDataPre
  > ### 说明
  > - 设置本地缓存的名称前缀[config.local.pre]
  > ### 参数
  > - pre:string
  > ### 返回值
  > - :void
### getLocalData
  > ### 说明
  > - 获取缓存
  > ### 参数
  > - name:string
  > - time?:number,获取的时间间隔限制,按秒进行
  > - refresh?:boolean,重置缓存时间戳
  > ### 返回值
  > - localData:any | undefined
### setLocalData
  > ### 说明
  > - 设置缓存
  > ### 参数
  > - name:string
  > - value:any
  > ### 返回值
  > - :void
### removeLocalData
  > ### 说明
  > - 清除缓存
  > ### 参数
  > - name:string
  > ### 返回值
  > - :void
---

## TIME时间
### parseTime
  > ### 说明
  > - 将Date字符串转换为Date
  > ### 参数
  > - data:string,Date字符串
  > - option?:string | object,设置项
  > - option.format?:string,Date字符串格式YYYY-MM-DD HH:ss:mm
  > - option.current?:string,未传递参数是否按照当前时间为基准
  > ### 返回值
  > - :Date
### showTime
  > ### 说明
  > - 将Date对象转换为Date字符串
  > ### 参数
  > - data:Date
  > - format?:string,Date字符串格式YYYY-MM-DD HH:ss:mm
  > ### 返回值
  > - DateStr:string
### formatTime
  > ### 说明
  > - 将Date字符串根据格式转换为Date字符串
  > ### 参数
  > - data:string,Date字符串
  > - parseOption?:string | object,设置项
  > - parseOption.format?:string,Date字符串格式YYYY-MM-DD HH:ss:mm
  > - parseOption.current?:string,未传递参数是否按照当前时间为基准
  > - showFormat?:string,Date字符串格式YYYY-MM-DD HH:ss:mm
  > - complex?:boolean,是否复杂数据:复杂数据会先生成Date后再进行字符串化
  > ### 返回值
  > - DateStr:string
### getOffsetTime
  > ### 说明
  > - 获取时间间隔对象
  > ### 参数
  > - data:string,Date字符串
  > - unit?:'sec' | 'min' | 'hour' | 'date',时间间隔单位,默认为sec
  > - option?:object,设置项
  > - option.start?:'sec' | 'min' | 'hour' | 'date',最小单位,默认为unit
  > - option.end?:'sec' | 'min' | 'hour' | 'date',最大单位,默认为date
  > - option.complex?:boolean,是否返回复杂数据
  > ### 返回值
  > - offsetTime:object
### getOffsetTimeStr
  > ### 说明
  > - 获取时间间隔字符串
  > ### 参数
  > - data:string,Date字符串
  > - unit?:'sec' | 'min' | 'hour' | 'date',时间间隔单位,默认为sec
  > - option?:object,设置项
  > - option.start?:'sec' | 'min' | 'hour' | 'date',最小单位,默认为unit
  > - option.end?:'sec' | 'min' | 'hour' | 'date',最大单位,默认为date
  > - option.format?:function | object,格式化设置项或函数
  > - option.format.startShow?:boolean,开始为空是否显示
  > - option.format.endShow?:boolean,结束为空是否显示,默认为真
  > - option.format.middleShow?:boolean,中间为空是否显示,默认为真
  > - option.format.fixed?:boolean,前缀补0判断值,根据code长度或者dict中的unit.fixed补充
  > - option.format.dict?:object,字典对象
  > ### 返回值
  > - offsetTimeStr:string
---

## ENVIRONMENT环境变量和可用功能
### checkUseItem
  > ### 说明
  > - 检查全局函数是否可用
  > ### 参数
  > - Name:string,检查全局函数是否可用
  > - prop:string,需要挂载的属性
  > - showError?:boolean,是否显示错误信息
  > ### 返回值
  > - :void
### getCanUse
  > ### 说明
  > - 判断prop是否可用
  > ### 参数
  > - prop:string
  > ### 返回值
  > - canUse:boolean
### setCanUse
  > ### 说明
  > - 设置全局属性是否可用
  > ### 参数
  > - prop:string,属性
  > - data:boolean,可用
  > ### 返回值
  > - :void
### getEnv
  > ### 说明
  > - 获取环境变量
  > ### 参数
  > - prop:string,环境变量属性值,data为当前环境变量,real为当前真实的环境变量,默认为data
  > ### 返回值
  > - EnvData:string
### getEnvMode
  > ### 说明
  > - 获取环境数据
  > ### 参数
  > - prop:string,环境数据属性值,data为当前环境数据,real为当前真实的环境数据,默认为data
  > ### 返回值
  > - EnvData:any
### setEnv
  > ### 说明
  > - 设置环境变量
  > ### 参数
  > - data:string,环境变量
  > - prop:string,环境变量属性值,data为当前环境变量,real为当前真实的环境变量,默认为data
  > ### 返回值
  > - :void
### setEnvMode
  > ### 说明
  > - 设置环境数据
  > ### 参数
  > - data:string,环境数据
  > - prop:string,环境数据属性值,data为当前环境数据,real为当前真实的环境数据,默认为data
  > ### 返回值
  > - :void
### resetEnvData
  > ### 说明
  > - 真实环境为开发环境下数据变更函数
  > ### 参数
  > - fn:string,需要触发的函数
  > - info?:string,控制台输出
  > - ...args?:any[],函数参数
  > ### 返回值
  > - :void
---

## WORKER多线程
### setWorker
  > ### 说明
  > - 调用分支线程运行指定函数
  > ### 参数
  > - option:object,设置项
  > - option.func:function,函数体
  > - option.args?:any[],函数参数列表
  > - option.isSync?:boolean,同步异步判断
  > - option.log?:boolean,日志打印判断
  > ### 返回值
  > - :Promise<{ status: 'success' | 'fail', code: string, data: any }>
---

## RULE规则判断
### buildRule
  > ### 说明
  > - 创建规则
  > ### 参数
  > - ruleOption:object,RuleData initdata
  > - prop?:string,规则保存属性,不存在不保存
  > ### 返回值
  > - ruleItem:RuleData
### checkRule
  > ### 说明
  > - 规则检查
  > ### 参数
  > - data:any,需要检查的值
  > - prop:string,检查规则名称
  > - ...args:any[],参数
  > ### 返回值
  > - isCheck:boolean
---

## REQUIRE请求和TOKEN设置
### ajax
  > ### 说明
  > - 调用service进行axios请求,此请求不会进行本地化处理
  > ### 参数
  > - optionData:object,设置项,参照axios文档
  > ### 返回值
  > - ajax:Promise
### require
  > ### 说明
  > - 请求主函数,上传数据判断格式化,返回数据判断格式化
  > ### 参数
  > - optionData:object,设置项,其他项参照axios文档
  > - optionData.url:string,请求地址
  > - optionData.method?:string,请求方式,默认为get
  > - optionData.params?:object,url(query参数)
  > - optionData.data?:object,body参数
  > - optionData.headers?:object,header参数
  > - optionData.token?:string | object | any[],token设置项,不传根据token设置自动进行所有token的获取,传递string | string\[]根据string获取对应token,传递object | object[]则根据object生成token实例再进行获取
  > - optionData.responseType?:'arraybuffer', 'blob', 'document', 'json', 'text', 'stream',返回数据类型,仅返回json时对返回数据进行判断和格式化,默认值为json
  > - optionData.requestDataType?:'json' | 'formdata',接口需要的数据类型,默认值为json
  > - optionData.requestCurrentDataType?:'json' | 'formdata',当前data的数据类型,默认值为json
  > - optionData.responseFormat?:boolean,是否对返回数据进行分析和格式化,默认为true
  > - optionData.defaultOptionData?:object,默认参数重置method/requestDataType/requestCurrentDataType/responseType
  > ### 返回值
  > - :Promise
### get
  > ### 说明
  > - get/require,defaultOptionData = { method: 'get' }
  > ### 参数
  > - optionData:object,设置项
  > ### 返回值
  > - :Promise
### post
  > ### 说明
  > - post/require,defaultOptionData = { method: 'post' }
  > ### 参数
  > - optionData:object,设置项
  > ### 返回值
  > - :Promise
### postform
  > ### 说明
  > - post/require,defaultOptionData = { method: 'post', requestDataType: 'formdata' }
  > ### 参数
  > - optionData:object,设置项
  > ### 返回值
  > - :Promise
### postfile
  > ### 说明
  > - post/require,defaultOptionData = { method: 'post', requestDataType: 'formdata', requestCurrentDataType: 'formdata' }
  > ### 参数
  > - optionData:object,设置项
  > ### 返回值
  > - :Promise
### setToken
  > ### 说明
  > - 设置token
  > ### 参数
  > - tokenName:string,token名称
  > - data:any,token值
  > - prop:string,对应的rule.prop,默认为default
  > ### 返回值
  > - :void
### getToken
  > ### 说明
  > - 获取指定token的值
  > ### 参数
  > - tokenName:string,token名称
  > - prop:string,对应的rule.prop,默认为default
  > ### 返回值
  > - tokenData:any
### removeToken
  > ### 说明
  > - 删除token
  > ### 参数
  > - tokenName:string,token名称
  > - prop:string,对应的rule.prop,默认为default
  > ### 返回值
  > - isDelete:boolean
---

# 文件结构
> ## root
> - index: 模块输出和Vue插件加载
> - config: 全局设置项
> > ## src:主要目录
> > - main: 模块整合
> > > ## build
> > > - SimpleData: 基类
> > > - LimitData: 限制数据格式类
> > > - Require: 请求模块实现类
> > > - RequireRule: 请求规则实现类
> > > - RuleData: 规则校验数据
> > > - TokenRule: Token规则实现类
> > > - TimeData: 时间对象类ing
> > > ## data
> > > - current: 当前时间
> > > > ## environment: 环境判断
> > > > ## function: 函数相关
> > > > ## local: 本地缓存相关
> > > > ## number: 数字相关
> > > > ## object: 对象相关
> > > > ## observe: 观察者相关
> > > > ## reactive: 响应式相关
> > > > ## rule: 规则检查
> > > > ## string: 字符串相关
> > > > ## time: 时间相关
> > > > ## type: 类型相关
> > > > ## utils: 功能函数
> > > > ## worker: 多线程相关
> > > ## option
> > > - noticeData: 警告弹窗模块
> > > - setData: 设置数据模块,为兼容Vue
> > > ## test
> > > - index:测试相关
---
[更新历史](./history.md)