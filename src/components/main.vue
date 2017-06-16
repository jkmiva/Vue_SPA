<template>
	<div class="main" :v-loading='loading'>
		<div v-for='item in content'>
			<router-link :to='{name: "userRoute", params: {userName: item.author.loginname}}'><img :src='item.author.avatar_url' :title='item.author.loginname'></router-link>
			<div class='main-text'>
				<router-link :to='{name: "articleRoute", params: {id: item.id}}'>{{ item.title }}</router-link>
				<div class='main-text-footer'>
					<span>Created at: {{item.create_at.slice(0,10)}}</span>
					<span>Visit count: {{item.visit_count}}</span>
					<span>Reply count: {{item.reply_count}}</span>
				</div>
			</div>
		</div>
		<el-button icon='caret-bottom' @click='getData'></el-button>
	</div>
</template>

<script>
	export default {
		name: 'main',
		data() {
			return {
				content: [],
				limit: 0,
				loading: true
			}
		},
		methods: {
			// load more when scroll to bottom
			/* need to fix, replace with load button
			scrollMethod() {
				const sumH = document.body.scrollHeight;
				const viewH = document.documentElement.clientHeight;
				const scrollH = document.body.scrollTop;
				if((viewH + scrollH) < sumH && (viewH + scrollH) > sumH-1) {
					this.getData();
				}
			},
			*/
			getData() {
				this.limit += 10;
				this.$http({
						url: 'https://cnodejs.org/api/v1/topics',
						method: 'get',
						params: {
                        	page: 1,
                        	limit: this.limit,
                        	mdrender: 'false',
                    	}
					}).then(res => {
						this.content = res.body.data;
					}, err => {
						console.log('main.vue_46:' + err);
					});
			}
		},
		mounted() {
			//window.addEventListener('scroll', this.scrollMethod);
		},
		created() {
			this.getData();
		},
		watch: {
			content(newval) {
				this.loading = false;
			}
		}
	}
</script>

<style scoped>
	a {
		text-decoration: none;
		color: black;
	}
	.main {
		display: flex;
		flex-direction: column;
		//background-color: #d3d3d3;
		width: 60%;
		border: 1px solid lightgrey;
		padding: 2rem;
	}
	.main > div {
		display: flex;
		align-items: center;
		margin: 0.5rem 0;
		border-bottom: 2px solid lightgrey;
		padding-bottom: 1rem;
	}
	.main > div img {
		width: 4rem;
		height: 4rem;
		margin-right: 2rem;
	}
	.main-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
	}
	.main-text a {
		color: black;
		font-size: 2rem;
	}
	.main-text a:visited {
		color: grey;
	}
	.main-text-footer {
		font-size: 1rem;
		margin-top: 1rem;
		color: grey;
	}
	.main-text-footer span {
		margin-right: 2rem;
	}
</style>