<template>
  <div class="overviewCell">
    <div class="item_p">
      <div class="item_title">{{ title }}</div>
      <div class="item_content">
        <p class="color3"><span class="total">{{ total }}</span>元</p>
        <p class="color8">今日 {{ time }}</p>
      </div>
      <div class="item_link"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Overview',
    props: {
      title: String,
      total: String,
      time: String
    }
  }
</script>
<style scoped>
  .overviewCell {
    background: #fff;
    width: 95%;
    margin: 10px auto 0;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }

  .overviewCell:not(:last-child)::after {
    content: " ";
    display: block;
    width: calc(100% - 15px);
    margin-left: 15px;
    height: 1px;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    background: #e5e5e5;
  }

  .item_p {
    padding: 10px 0 10px 15px;
    display: table;
    width: 100%;
    box-sizing: border-box;
    table-layout: fixed;
  }

  .item_title {
    display: table-cell;
    vertical-align: middle;
    font-size: 14px;
    width: 5rem;
  }

  .item_content {
    line-height: 2;
    display: table-cell;
    vertical-align: middle;
    padding-right: 15px;
    text-align: right;
  }

  .color3 {
    color: #333;
    font-size: 12px;
  }

  .color8 {
    color: #888;
    font-size: 12px;
  }

  .item_link {
    display: table-cell;
    position: relative;
    width: 25px;
  }

  .item_link::after {
    border: solid 2px #c8c8cd;
    border-bottom-width: 0;
    border-left-width: 0;
    content: " ";
    top: 50%;
    right: 50%;
    position: absolute;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(45deg);
  }

  .total {
    font-size: 16px;
    font-weight: bolder;
    margin-right: 5px;
  }
</style>

