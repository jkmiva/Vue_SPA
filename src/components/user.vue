<template>
<div class="user">
	<div class="info" v-loading.lock='loading'>
		<div>
			<img :src='userInfo.avatar_url' :title='userInfo.loginname'>
			<span>{{ userInfo.loginname }}</span>
		</div>
		<div>
			<i class="el-icon-star-off"></i><span>&nbsp;Score: &nbsp;&nbsp;&nbsp;&nbsp; {{userInfo.score}}</span>
		</div>
		<div>
			<i class="el-icon-document"></i><span>&nbsp;Github: &nbsp;&nbsp; </span><a :href='githubLink'>{{userInfo.githubUsername}}</a>
		</div>
		<div>
			<i class="el-icon-time"></i><span>&nbsp;Register at:&nbsp; {{registerAt}}</span>
		</div>
	</div>
	<div class="recent-topic" v-loading.lock='loading'>
		<p><b>Recent Topics</b></p>
		<div v-for='(item,index) of userInfo.recent_topics' v-if='index<5'>
			<img :src='item.author.avatar_url' :title='item.author.loginname'>
        	<router-link :to='{name: "articleRoute",params:{id:item.id}}'>
            	<p class='recent-topic-title'>{{item.title}}</p>
        	</router-link>
		</div>
	</div>
	<div class="recent-reply" v-loading.lock='loading'>
		<p><b>Recent Replies</b></p>
		<div v-for='(item,index) of userInfo.recent_replies' v-if='index<5'>
			<router-link :to='{name: "userRoute", params:{userName: item.author.loginname}}'>
				<img :src='item.author.avatar_url' :title='item.author.loginname'>
			</router-link>
        	<router-link :to='{name: "articleRoute",params:{id:item.id}}'>
            	<p class='recent-reply-title'>{{item.title}}</p>
        	</router-link>
		</div>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				loading: true
			};
		},
		computed: {
			githubLink() {
				return `https://github.com/${this.userInfo.githubUsername}`;
			},
			registerAt() {
				return String(this.userInfo.create_at).slice(0,10)
			}
		},
		created() {
			this.$http({
						url: `https://cnodejs.org/api/v1${this.$route.path}`,
						method: 'get'
					}).then(res => {
						this.userInfo = res.body.data;
					}, err => {
						console.log('user.vue_62:' + err);
					});
		},
		watch: {
			userInfo(val) {
				this.loading = false;
			}
		},
		beforeRouteUpdate(to, from, next) {
            this.$http({
                		url: `https://cnodejs.org/api/v1${to.path}`,
                		method: 'get',
            		}).then(res => {
						this.userInfo = res.body.data;
					}, err => {
						console.log('user.vue_77:' + err);
					});
            next();
        }
	}
</script>
<style scoped>
	.user {
		width: 60%;
	}
	a {
		color: black;
		text-decoration: none;
		margin-left: 1rem;
	}
	a:visited {
		color: grey;
	}
	.info {
        padding: 1rem;
        background: #EFF2F7;
        border-radius: 0.3rem;
    }
    .info div {
    	margin: 1rem;
    }
    .info div:first-child span {
    	font-size: 2rem;
    	font-weight: bold;
    }
    .recent-topic {
    	margin: 2rem 0;
        padding: 1rem;
        background: #EFF2F7;
        border-radius: 0.3rem;
    }
    .recent-topic div {
    	display: flex;
    	align-items: center;
    	margin: 1rem;
    	padding: 0.5rem;
    	border-bottom: 1px solid lightgrey;
    }
    .recent-reply {
    	margin: 2rem 0;
        padding: 1rem;
        background: #EFF2F7;
        border-radius: 0.3rem;
    }
    .recent-reply div {
    	display: flex;
    	align-items: center;
    	margin: 1rem;
    	padding: 0.5rem;
    	border-bottom: 1px solid lightgrey;
    }
    .recent-topic img,
    .recent-reply img {
    	width: 5rem;
    	height: 5rem;
    }
</style>