<template>
  <div id="app">
    <b-modal ref="disclaimer"
             id="disclaimer"
             size="lg"
             centered
             title="Disclaimer"
             ok-only
             ok-title="I Understand"
             no-close-on-backdrop
             hide-header-close
             footer-class="notflex"
             header-class="notflex">
      <p>
        * For patients having surgical
        procedures under local/topical
        anesthesia, and no new/worsened
        symptoms, evidence suggests there is
        no need for testing.
      </p>
      <p>
        * For patients with
        complex or uncommon surgical or
        medical conditions, tests beyond these
        guidelines may be appropriate based on
        the clinical judgement of the health
        care provider
      </p>
    </b-modal>

    <div class="container">
      <div class="row">
        <div class="col">
          <h4>Saskatchewan Preoperative Lab Test Guidelines
          </h4>
        </div>
      </div>
    </div>

    <div id="test" class="container">
      <div class="row">
        <div class="d-none d-sm-blockd-sm-none d-md-block col-md-3">Patient Status</div>
        <div class="col-md-9"><ComorbitiesList></ComorbitiesList></div>
      </div>
    </div>
  </div>
</template>

<script>
import ComorbitiesList from '@/components/ComorbiditiesList';

export default {
  name: 'App',
  components: {
    ComorbitiesList,
  },
  mounted() {
    this.$refs.disclaimer.show();
  },
  methods: {
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  overflow: hidden;
}
#test {
  height: 100vh;
}
.notflex {
  display: block;
}
.modal-backdrop.show {
  opacity: 1;
}
</style>
