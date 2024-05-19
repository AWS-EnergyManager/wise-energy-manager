<template>
    <div class="chatbot-container">
        <div class="chatbot-title">
            <div class="chatbot-name">
                <el-icon><Service /></el-icon>
                <h3>智能AI專家</h3>
            </div>
            <p>新對話內容</p>
        </div>
        <div class="chatbot-content">
            <div class="content-buble" v-if="this.bubble">
                <p>{{ this.bubble }}</p>
                <span>{{this.date.toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false})}}</span>
            </div>
            <div class="content-response-buble" v-if="this.responseBubble">
                <p>{{ this.responseBubble }}</p>
                <span>{{this.date.toLocaleString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false})}}</span>
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
                        v-model="this.message.message"
                        type="text"
                        placeholder="請輸入訊息"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="" @click="callOpenAI"  ><el-icon><Promotion /></el-icon></el-button>
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
                message: {message:''},
                api: '/nelson_api',
                bubble:'',
                responseBubble: '',
                date: new Date(),
            }
        },
        methods:{
            callOpenAI(){
                axios.post(this.api + '/api/chat', this.message)
                .then((response) => {
                    this.responseBubble = response.data.data.message;
                    console.log(response.data.data.message)
                    this.bubble = this.message.message;
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
        }

    }
}


</style>