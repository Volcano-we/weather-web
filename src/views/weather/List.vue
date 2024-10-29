<template>
  <a-card :bordered="false">
    <div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="10">
            <a-col :md="6" :sm="4">
              <a-form-item label="省份">
                <a-select
                  v-model="regionZero"
                  placeholder="选择查询"
                  style="width:200px"
                  :showArrow="true"
                  :options="nameZero"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="4">
              <a-form-item label="城市">
                <a-select
                  v-model="regionOne"
                  placeholder="选择查询"
                  style="width:200px"
                  :showArrow="true"
                  :options="nameOne"
                >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="4">
              <a-form-item label="区县">
                <a-select
                  v-model="regionTwo"
                  placeholder="选择查询"
                  style="width:200px"
                  :showArrow="true"
                  :options="nameTwo"
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="4">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="findData">查询</a-button>
                <a-button style="margin-left: 8px" @click="dropData">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        rowKey="item_code"
        :loading="loading"
        :columns="columns"
        :dataSource="itemList"
        :pagination="itemPage"
        @change="loadData"
      >
        <span slot="number" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      </a-table>

    </div>
  </a-card>
</template>

<script>
import { weatherList, weatherRegion } from '@/api/index'
import { message } from 'ant-design-vue'

export default {
  name: 'WeatherList',
  data () {
    return {
      loading: false,
      formList: {},
      regionZero: '',
      regionOne: '',
      regionTwo: '',
      nameZero: [],
      nameOne: [],
      nameTwo: [],

      itemList: [],
      itemPage: {
        total: 0,
        current: 0,
        pageSize: 50,
        hideOnSinglePage: true,
        showTotal: (count) => `共 ${count} 项`
      },

      columns: [
        {
          title: '序号',
          align: 'center',
          scopedSlots: { customRender: 'number' }
        },
        {
          title: '省份',
          align: 'center',
          dataIndex: 'province'
        },
        {
          title: '城市',
          align: 'center',
          dataIndex: 'city'
        },
        {
          title: '区县',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '实时温度',
          align: 'center',
          dataIndex: 'temp',
          customRender: (text) => text + '℃'
        },
        {
          title: '体感温度',
          align: 'center',
          dataIndex: 'feels_like',
          customRender: (text) => text + '℃'
        },
        {
          title: '相对湿度',
          align: 'center',
          dataIndex: 'rh',
          customRender: (text) => text + '%'
        },
        {
          title: '天气现象',
          align: 'center',
          dataIndex: 'text'
        },
        {
          title: '更新时间',
          align: 'center',
          dataIndex: 'uptime'
        }
      ]
    }
  },

  created () {
    this.loadData()
  },

  methods: {
    loadData (page) {
      this.regionData('中国', 0)
      this.weatherData()
    },

    findData () {
      if (this.regionOne === '' && this.regionTwo === '') {
        message.error('请至少选择城市')
        return
      }
      this.weatherData()
    },

    dropData () {
      this.formList = {}
      this.regionZero = ''
      this.regionOne = ''
      this.regionTwo = ''
      this.loadData()
    },

    weatherData () {
      this.loading = true
      let regionItem = ''
      if (this.regionTwo !== '') {
        regionItem = this.regionTwo
      } else if (this.regionOne !== '') {
        regionItem = this.regionOne
      } else {
        regionItem = this.regionZero
      }

      if (regionItem !== '') {
        this.formList.region_item = regionItem
      }

      weatherList(this.formList).then(res => {
        this.itemList = res.data
        this.itemList.map(item => {
          item.uptime = this.formatTime(item.uptime)
          return item
        })

        // this.itemPage.total = res.data.count
        // this.itemPage.current = res.data.page.num
        this.loading = false
      })
    },

    regionData (regionFrom, regionIndex) {
      const regionForm = { 'region_from': regionFrom }
      weatherRegion(regionForm).then(res => {
        const nameList = res.data.map(item => (
          { label: item.name, value: item.code }
        ))

        if (regionIndex === 0) {
          this.nameZero = nameList
        } else if (regionIndex === 1) {
          this.nameOne = nameList
        } else {
          this.nameTwo = nameList
        }
      })
    },

    formatTime (timeString) {
      const timeList = [timeString.substring(0, 4)]
      for (let i = 4; i < timeString.length; i += 2) {
        timeList.push(timeString.substring(i, i + 2))
      }

      return `${timeList[0]}-${timeList[1]}-${timeList[2]} ${timeList[3]}:${timeList[4]}:${timeList[5]}`
    }
  },

  watch: {
    regionZero (value) {
      this.regionData(value, 1)
    },
    regionOne (value) {
      this.regionData(value, 2)
    }
  }
}
</script>
