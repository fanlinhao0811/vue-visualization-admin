<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Rate allow-half
          v-model="valueHalf" />
    <i-switch v-model="switch1"
              @on-change="change"></i-switch>
    <p>{{$t('message.hello')}}</p>
    <Select v-model="model1"
            style="width:200px">
      <Option v-for="item in cityList"
              :value="item.value"
              :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      valueHalf: 2.5,
      switch1: false,
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: ''
    }
  },
  methods: {
    change (status) {
      if (status) {
        this.$i18n.locale = 'en'
      } else {
        this.$i18n.locale = 'zh'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
