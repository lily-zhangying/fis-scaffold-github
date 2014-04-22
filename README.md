## fis-scaffold-github

介绍：fis默认脚手架仓库为lightsjs.duapp.com。这里提供从github下载的脚手架功能。
可以参考此处代码来实现其他repos的下载。

## 使用

### 安装
1. npm intall fis-scaffold-github -g
2. npm intall fis-command-init -g

## fisp init

fisp init -h

```bash
  Usage: init <command> [options]

  Commands:

    module                 create a module
    widget                 create a widget

  Options:

    -h, --help                 output usage information
    -s, --scaffold <scaffold>
    -d, --dir <name>           create to dir
    --with-plugin              if create a module, whether include `plugin`
    --repos <url>              repository
    --verbose                  output verbose help
    --list [query]             list component from the repos
```

### 安装module
1.  fisp init module -s github -d ../

### 安装 widget
2.  fisp init widget -s github -d ../

### 下载github上项目

3.  fisp init :owner/:repos/:ref -s github -d ../

* :owner/:repos/:ref 是github的项目地址
* 例如可以下载 fisp init lily-zhangying/fis-site/master
* ref不写默认为master

## 缺点

* 无法处理依赖

默认fisjiao脚手架（repos为lightjs.duapp.com），在会**递归下载所有依赖** ,然后再进行处理。github下载不会处理依赖。


## 其他资源

* [fis-command-init](https://github.com/xiangshouding/fis-command-init)
* [fis-scaffold-pc](https://github.com/xiangshouding/fis-scaffold-pc)
