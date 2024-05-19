<template>
    <div class="chatbot-container">
        <div class="chatbot-title">
            <div class="chatbot-name">
                <el-icon><Service /></el-icon>
                <h3>智能AI專家</h3>
            </div>
             <el-select
              v-model="this.message.chatbot_type"
              placeholder="模式選擇"
              size="large"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
        </div>
        <div class="chatbot-content" v-loading="this.loading">
            <div :key="index" v-for = "(item, index) in history">
                <div class="content-buble">
                    <p>{{ item[0] }}</p>
                    <!--<span>{{this.date.toLocaleString('ja-JP', {-->
                    <!--year: 'numeric',-->
                    <!--month: '2-digit',-->
                    <!--day: '2-digit',-->
                    <!--hour: '2-digit',-->
                    <!--minute: '2-digit',-->
                    <!--second: '2-digit',-->
                    <!--hour12: false})}}</span>-->
                </div>
                <!--<div class="content-response-buble" v-if="this.responseBubble.length > 0" :key="index" v-for = item in this.responseBubble>-->
                <div class="content-response-buble">
                    <p>{{ item[1] }}</p>
                    <!--<span>{{this.date.toLocaleString('ja-JP', {-->
                    <!--year: 'numeric',-->
                    <!--month: '2-digit',-->
                    <!--day: '2-digit',-->
                    <!--hour: '2-digit',-->
                    <!--minute: '2-digit',-->
                    <!--second: '2-digit',-->
                    <!--hour12: false})}}</span>-->
                </div>
            </div>
        </div>
        <el-form
            style="max-width: 600px"
            label-width="auto"
            class="demo-ruleForm"
            >
            <div class="form-items">
                <el-form-item class="form-items-content">
                     <el-input
                        v-model="this.message.session_id"
                        type="text"
                        placeholder="輸入代號"
                    />
                    <el-input
                        v-model="this.message.user_input"
                        type="text"
                        placeholder="請輸入訊息"
                    />
                </el-form-item>
                <el-form-item>
                    <div class="btn"  >
                        <el-button type="primary" round @click="callOpenAI">送出</el-button>
                    </div>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'ChatbotWindow',
        data() {
            return {
                message: {
                    "user_input": "",
                    "session_id": "01",
                    "chatbot_type": "basic",
                    "clean_history": false,
                },
                api: '/nelson_api',
                //bubble:["你好","今天天氣如何"],
                //responseBubble: ["你好","很好"],
                //history:[["你好","你好"], ["今天天氣如何","很好"],["午餐","吃飯"]],
                history:[],
                date: new Date(),
                options : [
                  {
                    value: 'basic',
                    label: '基礎',
                  },
                  {
                    value: 'doc',
                    label: '文件',
                  },
                 ],
                 loading:false,
            }
        },
        methods:{
            callOpenAI(){
                this.loading = true
                axios.post(this.api + '/api/chat', this.message)
                .then((response) => {
                    this.loading = false
                    this.history.push([this.message.user_input, response.data.response]);
                    this.message.user_input = "";
                    //console.log("powerData",this.powerData)
                    
                })
                .catch((error) => {
                    console.log(error);
                });
            },

        }
    }
</script>

<style lang="scss" scoped>
.chatbot-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    .chatbot-title{
        height: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        .chatbot-name{
            display: flex;
            align-items: center;
            h3{
                margin-left: 10px;
            }
        }
        p{
            font-size: 14px;
            color: #ccc;
            
        }
    }
    .chatbot-content {
        height: 80%;
        background-color: white;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin: 0 10px;
        .content-buble{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin: 20px;
            p{
                background-color: #f0f0f0;
                padding: 10px;
                border-radius: 10px;
                max-width: 70%;
            }
            span{
                font-size: 12px;
                color: #ccc;
                text-align: right;
                margin-top: 5px;
            }
        
        }
        .content-response-buble{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 20px;
            p{
                background-color: rgb(65, 186, 227);
                color: white;
                padding: 10px;
                border-radius: 10px;
                max-width: 70%;
            }
            span{
                font-size: 12px;
                color: #ccc;
                text-align: right;
                margin-top: 5px;
            }
        
        }
    }
    .demo-ruleForm {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .form-items{
            display: flex;
            justify-content: space-between;
            margin: 0 10px;
            .form-items-content{
                width: 100%;
                
            }
            .btn{
                padding:10px
            }
        }

    }
}


</style>