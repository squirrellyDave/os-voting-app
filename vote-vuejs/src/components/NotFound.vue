<template>
  <div class="notfound">
    <div class="page-header">
        <h3>{{ title }}</h3>
    </div>
    <div class="page-body">
        <div id="content-container" class="row">
            <p>
                Back to <router-link to="/">Home</router-link>.
            </p>
        </div>
    </div>
    <div class="page-footer">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    data: function() {
      return {        
        title: 'Page not found :-(',
      };
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>