/**
 * Created by liudonghui on 2017/11/3.
 */
/**
 * 生成proto service的前端js代码
 * @author qianxinfeng
 * @since 9/5/17
 */
var protocBin = require('protoc/protoc.js')
var path = require('path')
var childProcess = require('child_process')
var mkdirp = require("mkdirp")
var supportsColor = require('supports-color')
var fs = require('fs');
var rimraf=require('rimraf')

var options = {
    protoPath: resolve('../wuxian_proto_schema'),
    jsOutPath: resolve('src/network/grpc-js'),
}
var defaultColors = {
    warn: "\u001b[1m\u001b[33m",
    error: "\u001b[1m\u001b[31m",
    success: "\u001b[1m\u001b[32m",
    info: "\u001b[1m\u001b[34m",
    reset: "\u001b[39m\u001b[22m",
}

function resolve(dir) {
    return path.join(__dirname, '../', dir)
}

/**
 * 获取参数
 * @return {Array}
 */
function getArgs() {
    var args = []
    args.push(`--plugin=protoc-gen-js_service=${resolve('node_modules/.bin/protoc-gen-js_service')}`)
    args.push(`--js_out=import_style=commonjs,binary:${options.jsOutPath}`)
    args.push(`--js_service_out=${options.jsOutPath}`)
    args.push(`--proto_path=${options.protoPath}`)
    return args
}

/**
 * console消息颜色
 * @param msg
 * @param level
 * @return {*}
 */
function colorMsg(msg, level) {
    if (!supportsColor) {
        return msg
    }
    level = level || 'info'
    return `${defaultColors[level]}${msg}${defaultColors.reset}`;
}

/**
 * 获取所有proto文件路径
 */
function getProtoFiles() {
    var files=[]
    walkDirFile(options.protoPath,'.proto',['.git','node_modules'],function (filepath) {
        files.push(filepath)
    })
    return files
}

/**
 * 生成文件
 */
function main() {
    console.log(`${colorMsg('Generator Proto-js Start....')}`)
    var args = getArgs()
    console.log(`${colorMsg('Args:')}\n${args.join('\n')}`)
    rimraf.sync(options.jsOutPath)
    mkdirp.sync(options.jsOutPath)

    var protoFiles=getProtoFiles()
    protoFiles.forEach(function (filepath) {
        var commond = [protocBin].concat(args).concat([filepath]).join(' ')
        childProcess.exec(commond, function (error2, stdout, stderr) {
            if (error2) {
                throw error2;
            }
        })
    })
    console.log(`${colorMsg('Output Dir:')}${options.jsOutPath}`)
    console.log(`${colorMsg('Generator Success!!!', 'success')}`)
}
/**
 * 递归遍历目录中的某种文件
 * @param filepath 路径
 * @param fileExt 文件后缀名
 * @param excludeDir 排除的目录
 * @param callback
 */
function walkDirFile(filepath,fileExt,excludeDir,callback) {
    var exists = fs.existsSync(filepath),
        stat = fs.statSync(filepath);

    if (exists && stat) { //判断文件、文件目录是否存在
        if (stat.isFile()) {
            if(path.extname(filepath)===fileExt){
                callback&&callback(filepath)
            }
        } else if (stat.isDirectory()) {
            var isExclude=false
            excludeDir.forEach(function (dir) {
                if(filepath.indexOf(dir)!==-1){
                    isExclude=true
                }
            })
            var files = fs.readdirSync(filepath);
            if (!isExclude&&files && files.length > 0) {
                files.forEach(function(file) {
                    walkDirFile(filepath + path.sep + file,fileExt,excludeDir,callback); //递归
                });
            }
        }
    }
}
main()
