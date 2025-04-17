<template>
    <div>
        <div>
            <!-- <button @click="printEditorHtml">print html</button>
            <button @click="insertTextHandler">insert text</button>
            <button @click="disableHandler">disable</button> -->
        </div>
        <div style="border: 1px solid #ccc; margin-top: 10px;">
            <!-- 工具栏 -->
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
            <!-- 编辑器 -->
            <Editor style="height: 250px; width:100%;overflow-y: hidden;" :defaultConfig="editorConfig" v-model="html"
                @onChange="onChange" @onCreated="onCreated" />
        </div>
        <!-- <div style="margin-top: 10px;">
            <textarea
                v-model="html"
                readonly
                style="width: 100%; height: 200px; outline: none;"
            ></textarea>
        </div> -->
    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
export default {
    name: 'MyEditor',
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: {
                toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */
                    "headerSelect",
                    "blockquote",
                    "|",
                    "bold",
                    "underline",
                    "italic",
                    {
                        "key": "group-more-style",
                        "title": "更多",
                        "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path><path d=\"M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z\"></path></svg>",
                        "menuKeys": [
                            "through",
                            "code",
                            "sup",
                            "sub",
                            "clearStyle"
                        ]
                    },
                    "color",
                    "bgColor",
                    "|",
                    "fontSize",
                    "fontFamily",
                    "lineHeight",
                    "|",
                    "bulletedList",
                    "numberedList",
                    "todo",
                    {
                        "key": "group-justify",
                        "title": "对齐",
                        "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z\"></path></svg>",
                        "menuKeys": [
                            "justifyLeft",
                            "justifyRight",
                            "justifyCenter",
                            "justifyJustify"
                        ]
                    },
                    {
                        "key": "group-indent",
                        "title": "缩进",
                        "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z\"></path></svg>",
                        "menuKeys": [
                            "indent",
                            "delIndent"
                        ]
                    },
                    "|",
                    "emotion",
                    "insertLink",
                    {
                        "key": "group-image",
                        "title": "图片",
                        "iconSvg": "<svg viewBox=\"0 0 1024 1024\"><path d=\"M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z\"></path></svg>",
                        "menuKeys": [
                            "uploadImage"
                        ]
                    },
                    "insertTable",
                    "codeBlock",
                    "divider",
                    "|",
                    "undo",
                    "redo",
                    "|"],
                excludeKeys: [ /* 隐藏哪些菜单 */],
            },
            editorConfig: {
                placeholder: '请输入内容...',
                // autoFocus: false,
                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {
                    uploadImage: {
                        async customUpload(file, insertFn) {
                            const form = new FormData()
                            form.append('files', file)
                            uploadFile(form).then(res => {
                                let data = res.data
                                console.log(data)
                                insertFn(data[0], '', data[0])
                            }).catch(err => console.log(err, 888))
                        }
                    }
                },
            }
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错\
        },
        onChange(editor) {
            //console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
        },
        // insertTextHandler() {
        //     const editor = this.editor
        //     if (editor == null) return
        //     editor.insertText(' hello ')
        // },
        // printEditorHtml() {
        //     const editor = this.editor
        //     if (editor == null) return
        //     console.log(editor.getHtml())
        // },
        // disableHandler() {
        //     const editor = this.editor
        //     if (editor == null) return
        //     editor.disable()
        // }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器


    },
    beforeDestroy() {
        const toolbar = DomEditor.getToolbar(this.editor)
        console.log(toolbar)
        const curToolbarConfig = toolbar.getConfig()
        console.log(curToolbarConfig.toolbarKeys) // 当前菜单排序和分组
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
    },
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
