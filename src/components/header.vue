<template>
	<header>
		<router-link to='/'>
			<img src="../assets/cnodejs.svg" alt="cnodeJS logo">
		</router-link>
		<el-button id="about-button" type="text" @click.native='dialogVisible=true' icon="information" size='large'>About</el-button>
		<el-dialog title='Rewrite cnodeJS community' :visible.sync='dialogVisible' size='tiny'>
			<section class="dialog-content">
				<span>Author: &nbsp;&nbsp;<a href="https://github.com/jkmiva">Huang Jiaming</a></span>
				<br>
				<span>Tech stack: &nbsp;&nbsp;</span>
				<ul>
					<li>Vue</li>
					<li>Vue-router</li>
					<li>Vue-resource</li>
					<li>ElementUI</li>
				</ul>
			</section>
		</el-dialog>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false
			}
		}
	}
</script>

<style scoped>
	@import url("https://unpkg.com/element-ui/lib/theme-default/index.css");
	header {
		background-color: #ffcccc;
		height: 4rem;
		width: 100%;
		position: absolute;
		top: 0;
	}
	header img {
		width: 10rem;
		height: 3.8rem;
		margin-left: 5rem;
	}
	#about-button {
		display: inline-block;
		position: absolute;
		right: 5rem;
		height: 100%;
	}
</style>