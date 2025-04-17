<template>
  <div>
    <!-- 文件上传按钮 -->
    <input type="file" @change="handleFileUpload" />
    
    <!-- 搜索框 -->
    <div v-if="fileContent">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="请输入搜索内容" 
        @input="searchText"
      />
    </div>

    <!-- 显示文件内容 -->
    <div v-if="fileContent" class="content">
      <h3>文件内容:</h3>
      <pre v-html="highlightText(fileContent)"></pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileContent: null, // 用来存储文件内容
      searchQuery: "",   // 存储搜索框的输入内容
      matches: [],       // 存储匹配的索引
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]; // 获取上传的文件

      if (file) {
        const reader = new FileReader(); // 创建 FileReader 实例

        reader.onload = (e) => {
          // 读取文件并存储内容
          this.fileContent = e.target.result;
        };

        reader.onerror = (e) => {
          console.error("文件读取失败", e);
        };

        reader.readAsText(file); // 以文本格式读取文件
      }
    },

    searchText() {
      if (this.searchQuery.trim() === "") {
        this.matches = []; // 如果没有输入搜索词，清空匹配结果
      } else {
        const regex = new RegExp(this.searchQuery, 'gi'); // 创建正则表达式，忽略大小写
        this.matches = [...this.fileContent.matchAll(regex)]; // 查找所有匹配
      }
    },

    highlightText(text) {
      let highlightedText = text;
      if (this.searchQuery.trim()) {
        const regex = new RegExp(`(${this.searchQuery})`, 'gi');
        highlightedText = text.replace(regex, '<mark>$1</mark>'); // 用 <mark> 标签标记匹配项
      }
      return highlightedText;
    }
  },
};
</script>

<style scoped>
/* 添加一些简单的样式 */
input[type="file"] {
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

mark {
  background-color: yellow;
  font-weight: bold;
}
.content{
  height: ;
}
</style>
