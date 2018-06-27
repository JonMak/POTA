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

    <b-modal ref="results" id="results"
             size="lg" centered
             title="Results:" ok-only
             ok-title="OK" no-close-on-backdrop
             hide-header-close footer-class="notflex"
             header-class="notflex">

             <div class="container">
               <div class="row">
                 <div class="col">
                   <h4>Patient's Comorbidities:</h4>
                   <div class="container" style="text-align: left;">
                     <!-- this is the other place binding for the props is being used -->
                     <ul v-for="item in resultArray"
                         :key="item">
                         <li>{{item}}</li>
                     </ul>
                     </div>
                 </div>
                 <div class="col">
                   <h4>Preoperative Exams:</h4>
                   <div class="container" style="text-align: left;">
                      <p id="exams"
                      v-for="item in exams"
                      :key="item" >
                        <b>{{ item }}</b>
                        {{ getValidity(item)}}
                      </p>
                   </div>
                      <div id="conditional-exams" class="text-left"
                      v-for="(item, index) in conditionalExams"
                      :key="index">
                        <br/>
                        <p>
                        <b>{{ item.conditionPhrase }}</b>
                        <b>If so:</b>
                        </p>
                        <p v-for="(examName, index) in item.exams" :key="index">
                          <b>{{ examName }}</b>
                          {{ getValidity(examName) }}
                        </p>
                      </div>
                 </div>
               </div>
             </div>
    </b-modal>

    <b-navbar sticky id="nav" type="dark" variant="dark">
      <a id="menu" class="btn" @click="sidebarActive = !sidebarActive">
        <icon name="bars"></icon>
      </a>
      <div class="col">
        <h5>Saskatchewan Preoperative Guidelines (Draft)</h5>
      </div>
    </b-navbar>

    <div class="wrapper">
      <!-- Sidebar -->
      <nav id="sidebar" :class="sidebarActive ? 'active': ''">
          <div class="sidebar-header">
              <h3>Instructions:</h3>
              <ol>
                <li>Select the patients comorbidities.</li>
                <li>Click the submit button at the bottom to view the tests.</li>
              </ol>
              <li>Hover/tap comorbidities with an icon on the right to
                  get examples/definitions.
              </li>
              <li>Click the reset button to clear selections</li>
          </div>
      </nav>

      <!-- Page Content -->
      <div class="container">
        <div class="row">
          <div class="col">
            <ComorbitiesList ref="comoList" @clickEvent="updateArray"></ComorbitiesList>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="buttons">
          <b-btn size="sm"
                variant="primary"
                style="margin-right: 100px;"
                @click="getExams()">Submit</b-btn>
          <b-btn size="sm" variant="danger" @click="resetData()">Reset</b-btn>
      </div>
    </div>
  </div>
</template>

<script>
import ComorbitiesList from '@/components/ComorbiditiesList';
import { PatientExamsNeeded, ExamValidity } from '@/PreopRecommendation';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'App',
  components: {
    ComorbitiesList,
    Icon,
  },
  data() {
    return {
      sidebarActive: true,
      resultArray: [],
      exams: [],
      conditionalExams: [],
    };
  },
  mounted() {
    this.$refs.disclaimer.show();
  },
  methods: {
    updateArray: function updateArray(comorbidity) {
      if (this.resultArray.includes(comorbidity.currentComorbiditySelection)) {
        // Apparently there's no delete by index, so this is the best we can do. :(
        this.resultArray.splice(this.resultArray.indexOf(comorbidity.currentComorbiditySelection),
          1);
      } else {
        this.resultArray.push(comorbidity.currentComorbiditySelection);
      }
    },
    /**
     * Populates the exams array using the resultArray passed down
     * from the parent. Clearing the previous exams each time it is called
     * and then pushing the new values.
     */
    getExams: function getExams() {
      const examSummary = PatientExamsNeeded(this.resultArray);
      this.exams = examSummary.exams;
      this.conditionalExams = examSummary.conditionalExams;
      this.$refs.results.show();
    },
    /**
     * Gets a validity period
     * @param String exam
     * @returns validity period for that exam
     */
    getValidity: function getValidity(exam) {
      return ExamValidity(exam);
    },
    /**
     * Resets the data of ComoListComponent.
     */
    resetData: function resetData() {
      this.$refs.comoList.resetData();
      Object.assign(this.$data, this.$options.data.call(this));
    },
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
  overflow: hidden;
}
#nav h5 {
  color: white;
}
/* .list {
  max-height: 90vh;;
} */
.notflex {
  display: block;
}
.modal-backdrop.show {
  opacity: 1;
}
.wrapper {
  display: flex;
  width: 100%;
  overflow: hidden;
}
#sidebar {
  width: 250px;
  /* position: fixed; */
  left: 0;
  height: 100vh;
  z-index: 999;
  background: #ffffff;
  color: rgb(0, 0, 0);
  transition: all 0.3s;
  padding-top: 20px;
}
#sidebar.active {
  margin-left: -250px;
}
/* @media (max-width: 768px) {
  #sidebar {
      margin-left: -250px;
  }
  #sidebar.active {
      margin-left: 0;
      padding-left: 15px;
      padding-right: 15px;
  }
} */
#menu {
  color: white;
  border-radius: 50%;
}
#menu:active {
  background-color: rgb(102, 102, 102);
  transition: background-color 0.01s ease;
}
.foot {
  width: 100%;
  position: fixed;
  bottom: 0px;
  padding: 10px;
  z-index: 1000;
  background-color: #343a40;
}
</style>
