<template>
    <div class='article' v-loading='loading'>
        <span class="top-span">Published on：{{createdTime}}</span>
        <router-link :to='{name:"userRoute",params:{userName: article.author.loginname}}'>Author：{{article.author.loginname}}</router-link>
        <span class="top-span">Views：{{article.visit_count}}</span>
        <span class="top-span">From：{{article.tab}}</span>
        <h3>{{article.title}}</h3>
        <div v-html='article.content' id='content'></div>
        <div id='reply'>
            <div v-for='reply in article.replies' class='reply'>
                <router-link :to='{name: "userRoute",params:{userName: reply.author.loginname}}'>
                    <img :src='reply.author.avatar_url'>
                </router-link>
                <div>
                    <div class='reply-top'>
                        <span class='reply-name'>{{reply.author.loginname}}</span>
                        <span>{{replyTime(reply.create_at)}}</span>
                        <span v-if='reply.ups.length > 0' class='reply-ups'>
                            <i class='el-icon-star-on'></i>
                            <span>{{reply.ups.length}}</span>
                        </span>
                    </div>
                    <div v-html='reply.content'></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                /* article format
                {
                    title: '',
                    author: {
                        loginname: 'temp',
                    },
                    visit_count: '',
                    tab: '',
                    content: '',
                    create_at: '2017-04-130000',
                    replies: '',
                }
                */
                article: {
                    title: '',
                    author: {
                        loginname: 'admin',
                    },
                    visit_count: '',
                    tab: '',
                    content: '',
                    create_at: '',
                    replies: '',
                },
                loading: true,
            };
        },
        computed: {
            createdTime() {
                return String(this.article.create_at).slice(0,10);
            }
        },
        methods: {
            replyTime(time) {
                return String(time).slice(0,10)+'  '+String(time).slice(11,16);
            },
        },
        watch: {
            article(val) {
                this.loading = false;
            },
        },
        beforeCreate() {
            this.$http({
                url: `https://cnodejs.org/api/v1${this.$route.path}`,
                method: 'get',
            }).then(res => {
                if (res.body.success === true) {
                    this.article = res.body.data;
                } else {
                    console.log('fail to load article.')
                }
            }).catch(res => {
                console.log('ArticleCom.vue: ', res);
            });
        },
    };
</script>

<style>
    #content img {
        max-width: 100%;
        max-height: 100%;
    }
    
    .reply {
        box-sizing: border-box;
        display: flex;
        border-bottom: 2px solid #C0CCDA;
        width: 100%;
        margin: 0.5rem auto;
        padding: 1rem 0;
    }
</style>

<style>
    @import url('../assets/markdown-github.css');
    
    .article span:first-child {
        margin-left: 0;
    }
    
    .article {
        width: 60%;
        background: lightgrey;
        border: 1px solid lightgrey;
        padding: 2rem;
        background: #F9FAFC;
    }
    
    .article span,
    .article a {
        font-size: 1rem;
        color: black;
        margin: 1rem 1rem;
        text-decoration: none;
    }
    .article .top-span {
        color: grey;
        margin: 0 0.5rem;
    }
    
    #content {
        margin: 2rem auto 2rem auto;
        padding: 2rem 1rem 2rem 1rem;
        border: 1px solid #ddd;
        line-height: 1.6;
        padding-bottom: 1rem;
        background: #EFF2F7;
    }
    
    #reply {
        display: flex;
        flex-direction: column;
    }
    
    #reply img {
        width: 5rem;
        height: 5rem;
        margin-right: 1rem;
    }
    
    .reply > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 1rem;
        justify-content: space-around;
    }
    
    
    .reply .reply-name {
        color: grey;
        font-size: 1.5rem;
    }
    .reply-top {
        width: 100%;
    }
    .reply-ups {
        float: right;
    }
</style>
