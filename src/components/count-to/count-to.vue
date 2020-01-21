<template>
  <div>
    <!-- 下面的:id等同于v-bind:id
    eleId是一个计算属性，如果是计算属性、数值、变量，就要用冒号 -->
    <slot name="left"></slot><span ref="number" :class="countClass" :id="eleId"></span><slot name="right"></slot>
  </div>
</template>

<script>
import CountUp from 'countup'
import './count-to.less'

export default {
  name: 'count_to',
  computed: {
    // 这一段是为了保证不用页面的id不会重复，这个id我估计是全局的
    eleId () {
      // _uid是每个组件的唯一标识，id加上这个_uid，只要在一个组件内不重名，在整个项目里就不会重名
      return `count_up_${this._uid}`
    },
    countClass () {
      return [
        'count-to-number',
        this.className
      ]
    }
  },
  data () {
    return {
      counter: {}
    }
  },
  props: {
    /**
     * @description 起始值。props是传入属性。好像从外面进来的值都是通过这种方式
     */
    startVal: {
      type: Number,
      default: 0
    },
    /**
     * @description 最终值，必须要传
     */
    endVal: {
      type: Number,
      required: true
    },
    /**
     * @description 设置动画延时时间
     */
    delay: {
      type: Number,
      default: 0
    },
    /**
     * @description 保留几位小数
     */
    decimals: {
      type: Number,
      default: 0
    },
    /**
     * @description 渐变时长
     */
    duration: {
      type: Number,
      default: 1
    },
    /**
     * @description 渐变是否加速
     */
    useEasing: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否使用分隔符
     */
    useGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * @description 分隔符用什么
     */
    separator: {
      type: String,
      default: ','
    },
    /**
     * @description 整数和小数的分割符号
     */
    decimal: {
      type: String,
      default: '.'
    }
  },
  methods: {
    getCount () {
      // 这是获取是实时的。你在触发获取数值的时候，获取的是当前值。这里因为有个一个动画效果（数值从0加到100）
      // 所以，在没有加载完成的时候，这个值不一定是100
      return this.$refs.number.innerText
    },
    emitEndEvent () {
      setTimeout(() => {
        // this.$emit('on-animation-end', Number(this.getCount()))
        this.$nextTick(() => {
          this.$emit('on-animation-end', Number(this.getCount()))
        })
      }, this.duration * 1000)
    }
  },
  // 监听器
  watch: {
    endVal (newVal, oldVal) {
      this.counter.update(newVal)
      this.emitEndEvent()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals, this.duration, {
        useEasing: this.useEasing,
        useGrouping: this.useGrouping,
        separator: this.separator,
        decimal: this.decimal
      })
      setTimeout(() => {
        this.counter.start()
        this.emitEndEvent()
      }, this.delay)
    })
  }
}
</script>
