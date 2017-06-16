<template>
    <div id="app">
        <my-header></my-header>
        <router-view name='main'></router-view>
    </div>
</template>

<script>
    import myHeader from './components/header';
    
    export default {
        components: {
            myHeader,
        },
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 6rem;
        display: flex;
        justify-content: space-around;
        font-size: 1.2rem;
        word-break: break-all;
    }
    
    body,
    div,
    span,
    a,
    p {
        margin: 0;
        padding: 0;
    }
</style>
