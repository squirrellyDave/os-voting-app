<template>
  <div class="about">
    <div class="page-header">
      <h3>{{ title }}</h3>
    </div>
    <div class="page-body">
      <div id="content-container" class="row">
        Lorem Ipsum Dolor Sit Amet...
      </div>
    </div>
    <div class="page-footer">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data: function() {
      return {
        title: 'This is an about page',
      };
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>