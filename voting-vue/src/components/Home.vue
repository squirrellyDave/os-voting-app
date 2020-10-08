<template>
  <div class="home">
    <div class="page-header">
      <h3>{{ title }}</h3>
    </div>
      <div class="page-body">
        <div id="content-container" class="row">
          <div id="choice" class="text-center">

            <!--<form @submit.prevent="handleSubmit">
              <button type="submit" id="a" class="a" name="vote" value="a">{{option_a}}</button>
              <button type="submit" id="b" class="b" name="vote" value="b">{{option_b}}</button>
            </form>-->

            <!-- 'v-bind:' can be shorten with just ':' and 'v-on:' can be shorten with just '@' -->            
            <button 
              class="btn btn-primary center-block" 
              v-for="option in options" 
              :key="option.id" 
              :id="option.id" 
              :class="option.id" 
              :style="{ 'opacity: 0.5': option.id == vote }"
              :disabled="option.id == vote"
              @click="setVote(option.id)">
                {{option.title}}
                <i v-show="option.id == vote" class="fa fa-check-circle"></i>
            </button>
            
            <div id="tip" v-show="this.vote">
              (Tip: you can change your vote)
            </div>

            <div id="hostname" v-show="this.hostname">
              Processed by container ID {{hostname}}
            </div>

          </div>
        </div>
      </div>
      <div class="page-footer">
      </div>
  </div>
</template>

<script>
  import Configuration from '@/utils/configuration'
  export default {
    name: 'Home',    
    data: function() {
      console.log('Detecting configuration values...');
      var option_a = Configuration.value('OPTION_A');
      var option_b = Configuration.value('OPTION_B');
      console.log(`Configuration values detected: OPTION_A ("${option_a}") and OPTION B ("${option_b}") will be used.`);
      return {
        options: [
            { id: 'a', title: option_a },
            { id: 'b', title: option_b }
        ],
        hostname: 'Workstation',
        vote: ''
      };
    },
    computed: {
      title: function() {
          return this.options[0].title + ' vs. ' + this.options[1].title + "!";
      }
    },
    methods: {
      /*
      handleSubmit: function(form) {                    
          this.vote = form.submitter.attributes.value.textContent;
          console.log('Submitted: ' + this.vote);
      },
      */
      setVote: function(id) {
          var entry = this.options.find(option => option.id === id);
          if (entry) {
              this.vote = entry.id;
              console.log('Submitted: ' + entry.title + ' (' + entry.id + ').');
          }
          else console.log('Error: Index "' + entry.id + '" of the vote was not found in the database.');
      }
    },
    watch: {
      vote() {        
        if (this.vote == 'a') {
          console.log('Voting set to a!');                    
        }
        if (this.vote == 'b') {
          console.log('Voting set to b!');          
        }        
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{
    border-radius: 0;
    width: 150px;
    height: 50%;
  }

  button i{
    float: right;
    padding-right: 30px;
    margin-top: 3px;
  }

  button.a{
    background-color: #1aaaf8;
  }

  button.b{
    background-color: #00cbca;
  }

  #tip{    
    color: #c0c9ce;
    font-size: 14px;
  }

  #hostname{
    position: absolute;
    bottom: 100px;
    right: 0;
    left: 0;
    color: #8f9ea8;
    font-size: 24px;
  }

  #choice{
    transition: all 300ms linear;
    line-height: 1.3em;
    display: inline;
    vertical-align: middle;
    font-size: 3em;
  }

  #choice a{
    text-decoration:none;
  }

  #choice a:hover, #choice a:focus{
    outline:0;
    text-decoration:underline;
  }

  #choice button{
    display: block;
    height: 80px;
    width: 330px;
    border: none;
    color: white;
    text-transform: uppercase;
    font-size:18px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    padding-left: 50px;
  }

  #choice button.a:hover{
    background-color: #1488c6;
  }

  #choice button.b:hover{
    background-color: #00a2a1;
  }

  #choice button.a:focus{
    background-color: #1488c6;
  }

  #choice button.b:focus{
    background-color: #00a2a1;
  }
</style>