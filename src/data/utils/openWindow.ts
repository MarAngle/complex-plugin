
/**
 * window.open
 * @param {string} url
 * @param {string} name 指定target属性或窗口的名称
 * [ _blank - URL加载到一个新的窗口:默认 ]
 * [ _parent - URL加载到父框架 ]
 * [ _self - URL替换当前页面 ]
 * [ _top - URL替换任何可加载的框架集 ]
 * [ name - 窗口名称 ]
 * @param {string} [features] 一个逗号分隔的项目列表。支持以下值：
 * [ channelmode=yes|no|1|0	是否要在影院模式显示 window。默认是没有的。仅限IE浏览器 ]
 * [ directories=yes|no|1|0	是否添加目录按钮。默认是肯定的。仅限IE浏览器 ]
 * [ fullscreen=yes|no|1|0	浏览器是否显示全屏模式。默认是没有的。在全屏模式下的 window，还必须在影院模式。仅限IE浏览器 ]
 * [ height=pixels	窗口的高度。最小.值为100 ]
 * [ left=pixels	该窗口的左侧位置 ]
 * [ location=yes|no|1|0	是否显示地址字段.默认值是yes ]
 * [ menubar=yes|no|1|0	是否显示菜单栏.默认值是yes ]
 * [ resizable=yes|no|1|0	是否可调整窗口大小.默认值是yes ]
 * [ scrollbars=yes|no|1|0	是否显示滚动条.默认值是yes ]
 * [ status=yes|no|1|0	是否要添加一个状态栏.默认值是yes ]
 * [ titlebar=yes|no|1|0	是否显示标题栏.被忽略，除非调用HTML应用程序或一个值得信赖的对话框.默认值是yes ]
 * [ toolbar=yes|no|1|0	是否显示浏览器工具栏.默认值是yes ]
 * [ top=pixels	窗口顶部的位置.仅限IE浏览器 ]
 * [ width=pixels	窗口的宽度.最小.值为100 ]
 */
 function openWindow(url: string, name = '_blank', features: any) {
  return window.open(url, name, features)
}

export default openWindow
