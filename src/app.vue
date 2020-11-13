<template>
  <div id="app" @contextmenu="e()">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view/>
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      e () {
        let eve = window.event
        eve.preventDefault()
      }
    }
  }
</script>

<style>

  .my_steps .van-steps__items .van-step--horizontal .van-step__line, .my_steps .van-steps__items .van-step--horizontal .van-step__circle-container {
    top: 45px !important;
  }

  .my_steps .van-step--finish .van-step__circle, .my_steps .van-step--finish .van-step__line {
    background-color: rgb(64, 158, 255);
  }

  .specification .specification-content .van-radio-group .van-radio .van-radio__label {
    width: 100% !important;
  }
  .verification_default .mint-cell-wrapper{
    background: none;
  }
  .activation_no_float .mint-cell-title {
    flex: none
  }

  .popup-width{
    width: 100%
  }
  .activation_no_float .mint-cell-title .mint-cell-text {
    display: inline-block;
    width: 105px;
  }

  .hbSellProduct input:disabled, .activation_server .black input:disabled {
    opacity: 1;
    -webkit-opacity: 1;
    color: #000;
  }

  .hbSellProduct .mint-cell-value {
    color: #000;
  }

  .activation_server .mint-cell-value {
    color: #000;
  }

  .hbSellProduct .select .mint-cell-value {
    opacity: .3;
  }

  .activation_server .select .mint-cell-value {
    opacity: .3;
  }

  .hbSellProduct .container .mint-cell-title {
    width: 105px;
    flex: none;
  }

  .mint-field-core {
    background: #fff;
  }

  .yd-slider-pagination {
    bottom: 0.5rem;
  }

  .yd-slider-pagination-item {
    background-color: #ccc;
  }

  .yd-slider-pagination-item-active {
    background-color: #c;
  }

  .hb_licence .mint-cell {
    min-height: 50px !important;
  }

  .SellProduct .datetime_title, .activation_server .datetime_title {
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #888;
  }

  .SellProduct .mint-datetime-action {
    width: 20%;
    font-size: 14px;
    line-height: 30px;
  }

  .SellProduct .picker-toolbar {
    height: 30px;
  }

  .mint-cell {
    min-height: 40px !important;
  }

  /*表格*/
  .el-table__header tr th {
    text-align: center !important;
  }

  /*底部边线左间距15px*/
  .commission .center-body-list:before,
  .invoice-list .invoice-number:before,
  .personInfo .mint-cell:before,
  .Withdraw .money:before {
    content: " ";
    position: absolute;
    top: 39px;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  .Withdraw .money:before,
  .invoice-box .invoice-number:before,
  .invoice-list .invoice-number:before {
    top: 47px;
  }

  .personInfo .branch-bank:before {
    top: 40px;
  }

  .invoice-list .invoice-number .mint-cell-value, .Withdraw .money .mint-cell-value {
    font-size: 16px;
    color: #333333;
  }

  .Withdraw .money, .invoice-list .invoice-number {
    min-height: 48px !important;
  }

  .invoice-list .mint-cell-text,
  .Withdraw .mint-cell-text,
  .Withdraw .mint-cell-value {
    color: #888;
  }

  .msg_tab .mint-cell .mint-cell-wrapper,
  .msg_tab .mint-cell:last-child,
  .invoice-list .mint-cell-wrapper,
  .invoice-box .mint-cell-wrapper,
  .invoice-box .mint-cell:last-child,
  .personInfo .mint-cell-wrapper, .personInfo .mint-cell:last-child,
  .Withdraw .mint-cell-wrapper, .Withdraw .mint-cell:last-child {
    background-image: none;
  }

  .invoice-box .mt-line-height .mint-cell-wrapper .mint-cell-value span {
    min-height: 60px;
    line-height: 1.8;
  }

  .personInfo .mint-cell-wrapper .mint-cell-value input:disabled {
    background: none;
    color: #333;
    opacity: 1;
    -webkit-text-fill-color: #333;
    -webkit-opacity: 1;
  }

  .withdram .mint-radio-core {
    width: 16px;
    height: 16px;
  }

  .withdram .mint-radio-core::after {
    top: 3px;
    left: 3px;
  }

  .withdram .mint-cell {
    background: none;
  }

  .lottery {
    z-index: 999
  }

  .Withdraw .withdraw-head .mint-cell-allow-right::after {
    transform: translateY(-50%) rotate(135deg);
  }

  .SellProduct .p_15 img {
    width: 100%;
  }

  .mint-toast {
    z-index: 9999 !important;
  }

  .ui-button {
    padding: 5%;
    width: 90%;
  }

  .bottom-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }

  .bottom-button .mint-button {
    border-radius: 0 !important;
  }

  .invoice-info .mint-cell-title {
    min-width: 5em;
  }

  .invoice-info .mint-cell-value, .SpecialInvoice .mint-cell-value {
    text-align: right;
  }

  .SpecialInvoice .mint-cell-title {
    min-width: 6em !important;
  }

  .MessageDetails .des img {
    width: 100% !important;
  }

  .msg_tab .mint-cell .des img {
    width: 100% !important;
    display: none
  }

  .mint-cell-wrapper {
    font-size: 14px !important;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: Helvetica Neue, Helvetica, STHeiTi, Arial, sans-serif;
    background: #F0EFF5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-overflow-scrolling: touch
  }
  /*fs === font-size*/
  .fs-1s{
    font-size: 1em!important;
  }
  .fs-1m{
    font-size: 1.5em!important;
  }
  .fs-1l{
    font-size: 1.8em!important;
  }
  .fs-2s{
    font-size: 2em!important;
  }
  .fs-2s-2{
    font-size: 2.2em!important;
  }
  .fs-2m{
    font-size: 1.5em!important;
  }
  .fs-2l{
    font-size: 2.8em!important;
  }

  .fa-1x {
    font-size: 0.6em;
  }

  .fa-2x-l {
    font-size: 1.8em;
  }

  .fa-2x-s {
    font-size: 1.5em;
  }

  .fa-2x {
    font-size: 1.7em;
  }

  .fa-3x {
    font-size: 2em;
  }

  .t-l {
    text-align: left;
  }

  .t-r {
    text-align: right;
  }

  .t-c {
    text-align: center;
  }

  .f-r {
    float: right;
  }

  .f-l {
    float: left;
  }

  .clear::after {
    content: '';
    display: block;
    clear: both;
  }

  .messageList .mint-cell-wrapper {
    overflow-x: visible !important;
  }

  .messageList .mint-cell-title {
    overflow-x: hidden !important;
  }

  .fs-tabbar > .mint-tab-item {
    padding: 0;
  }

  .fs-tabbar > .mint-tab-item.is-selected {
    background: #ffffff;
  }

  .fs-tabbar > .mint-tab-item.is-selected:before {
    border-top: 1px solid #d9d9d9;
  }

  .nav_title {
    display: block;
    padding-top: 3px;
  }

  .msg_tab .mint-cell {
    margin-top: 10px;
    text-align: left;
  }

  .msg_tab .mint-cell .title span.time {
    float: right;
    color: #888;
  }

  .msg_tab .mint-cell .title {
    font-size: 16px;
  }

  .circle {
    float: left;
    color: #3396E4;
    margin-left: -4px;
    font-size: 1.5rem!important;
    vertical-align: middle;
  }

  .mint-badge.is-warning {
    margin-left: 5px;
    font-size: 14px;
  }

  .mint-badge.is-size-normal {
    padding: 1px 4px;
  }

  .zan_tabbar > .mint-tab-item.is-selected {
    background: none
  }

  .navbar_box .mint-tab-item-label {
    font-size: 16px;
  }

  .mint-cell-wrapper {
    padding: 0 15px !important;
  }

  .btm_nav {
    width: 100%;
    padding: 7px 0;
  }

  .btm_nav i {
    width: 24px;
    height: 24px;
    margin: 5px auto 2px;
  }

  .btm_nav span {
    color: inherit;
    font-size: 12px;
    line-height: 1;
  }

  @media only screen and (max-width: 320px) and (max-height: 568px) {
    .btm_nav {
      padding: 4px 0;
    }

    .btm_nav i {
      margin: 3px auto 2px;
    }
  }

  .fv_title {
    margin-left: 10px;
    font-size: 14px;
    color: #666;
    margin-top: 10px
  }

  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #cccccc;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #cccccc;
    opacity: 1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #cccccc;
    opacity: 1;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #cccccc;
  }

  /* 无数据样式 */
  .null_data {
    text-align: center;
    padding: 20% 0 5%;
  }

  .null_data img {
    width: 50%
  }

  .null_data p {
    color: #888;
    font-size: 14px
  }

  .null {
    height: 130px;
    width: 236px;
    margin: auto;
    background: url("../static/pic.png");
    background-size: 127%;
    background-repeat: no-repeat;
    background-position: 0 -123px;
  }

  .Receive {
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: 0;
    right: 2%;
    background: url("../static/pic.png");
    background-size: 225%;
    background-repeat: no-repeat;
    background-position: -2px 0;
  }

  .over {
    width: 90px;
    height: 90px;
    position: absolute;
    bottom: 3px;
    right: 2%;
    background: url("../static/pic.png");
    background-size: 227%;
    background-repeat: no-repeat;
    background-position: -107px 0;
  }

  /*任务列表*/
  .title .mint-cell {
    background: transparent;
  }

  .min_height_30 .mint-cell {
    min-height: 30px;
  }

  .reward .mint-cell-title {
    flex: 5
  }

  .reward .mint-cell-value {
    flex: 2;
    position: relative;
    height: 24px;
  }

  .reward .mint-cell-value button {
    position: absolute;
    right: 0;
  }

  .taskList .mint-cell-mask::after,
  .TaskSchedule .mint-cell-mask::after {
    z-index: 1;
    background: none !important;
  }

  .taskList .mint-button {
    border-radius: 15px;
  }

  .taskList .mint-button:after {
    border-radius: 15px;
  }

  .mint-navbar.is-fixed {
    z-index: 20 !important;
  }

  .taskList .mint-button--default,
  .TaskSchedule .mint-button--default {
    background: #f1f1f1;
  }

  /* 进度及奖励 */
  .taskList .mt-progress-content {
    margin-right: 10px;
  }

  .mt-progress-runway,
  .mt-progress-progress {
    border-radius: 5px;
  }
  .color_1 {
    color: #26a2ff;
  }

  .color_2 {
    color: #ffc107;
  }

  .color_3 {
    color: #FE633F;
  }

  .color_4 {
    color: #17B794;
  }

  .color_5 {
    color: #e6a23c;
  }

  .leaf {
    color: #FE633F;
  }

  .database {
    color: #ffc107;
  }

  .star {
    color: #17B794;
  }

  .bars {
    color: #3396E4;
  }

  .mint-button--primary {
    background-color: #3396E4;
  }

  .bars i:before {
    content: "\f0c9";
  }

  .leaf i:before {
    content: "\f06c";
  }

  .database i:before {
    content: "\f1c0";
    min-width: 12px;
    display: inline-block;
  }

  .star i:before {
    content: "\f005";
    min-width: 12px;
    display: inline-block;
  }

  /* subTask */
  .mint-msgbox-message {
    max-height: 500px;
    overflow: scroll;
  }

  .mint-msgbox-message .t-l {
    color: #666;
    font-size: 14px;
  }

  .Subtask_reward .mint-cell-value {
    flex: 1;
  }

  .Subtask .mint-field .mint-cell-title {
    width: 3rem;
  }

  .mint-msgbox-btn {
    font-size: 1rem;
  }

  .Subtask_task .mint-field-core {
    border-bottom: 1px solid #d9d9d9;
  }

  .weight {
    font-weight: bold;
  }

  .mg-left {
    margin-left: 20px;
  }

  .Subtask .inputReward .mint-cell {
    width: 70%;
    display: inline-block;
  }

  .Subtask .displayNum .mint-cell {
    width: 100%;
  }

  .Subtask .displaynum .mint-cell {
    width: 100%;
    display: inline-block;
  }

  .Subtask .displaynum .mint-cell-wrapper {
    padding: 0 !important;
  }

  /* 分页加载样式 */
  .Brand .mint-spinner-fading-circle,
  .Materials .mint-spinner-fading-circle,
  .faq .mint-spinner-fading-circle,
  .invoice-list .mint-spinner-fading-circle,
  .classroom .mint-spinner-fading-circle,
  .SalesSkills .mint-spinner-fading-circle,
  .messageList .mint-spinner-fading-circle,
  .Decomposition .mint-spinner-fading-circle,
  .SubTaskDetail .mint-spinner-fading-circle,
  .PersonRanking .mint-spinner-fading-circle,
  .MyOrder .mint-spinner-fading-circle,
  .withdraw-list .mint-spinner-fading-circle,
  .center-body .mint-spinner-fading-circle,
  .taskList .mint-spinner-fading-circle {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

  .load {
    text-align: center;
    color: #d4d4d4;
    padding: 20px 0;
    font-size: 12px;
  }

  .noMore {
    position: relative;
  }

  .noMore::after {
    content: '';
    background: #d4d4d4;
    height: 1px;
    width: 20%;
    position: absolute;
    top: 50%;
    bottom: 50%;
    right: 20%;
  }

  .noMore::before {
    content: '';
    background: #d4d4d4;
    height: 1px;
    width: 20%;
    position: absolute;
    top: 50%;
    bottom: 50%;
    left: 20%;
  }

  /* 取消自带active样式 */
  .Cashier .mint-button:not(.is-disabled):active::after,
  .Subtask .mint-button:not(.is-disabled):active::after,
  .TaskSchedule .mint-button:not(.is-disabled):active::after,
  .Decomposition .mint-button:not(.is-disabled):active::after {
    opacity: 0;
  }

  .first_img .mint-cell:first-child .mint-cell-wrapper,
  .first_img .mint-cell:last-child,
  .bg_img_none .mint-cell-wrapper,
  .bg_img_none .mint-cell:last-child {
    background-image: none;
  }

  /* Decomposition */
  .Decomposition .filter .mint-cell-mask:active::after {
    opacity: 0;
  }

  .Decomposition .picker-slot {
    font-size: 14px;
  }

  .Decomposition .mint-popup, .personInfo .mint-popup {
    width: 75%;
    border-radius: 3px;
    padding-top: 10px
  }

  .Decomposition .mint-popup .mint-button {
    margin-top: 20px;
  }

  .Decomposition .picker-items {
    width: 100%;
  }

  .subTaskSpan {
    color: #3396E4;
    min-width: 5rem;
    text-align: right;
  }

  .SubTaskDetail .mint-badge.is-size-normal,
  .Decomposition .mint-badge.is-size-normal {
    margin-left: 5px;
    padding: 1px 6px;
    border-radius: 5px;
    font-size: 14px;
  }

  .Decomposition .submit .mint-button {
    width: 49%;
    display: inline-block;
  }

  .Decomposition .content .mint-cell-wrapper {
    font-size: 14px;
  }

  .Decomposition .subTask .mint-button--small,
  .table .mint-button--small {
    height: 24px;
  }

  .display .mint-cell-text,
  .display .mint-cell-value {
    color: #888
  }

  .mint-cell-wrapper {
    overflow: auto;
  }

  .computed .mint-cell-value {
    flex: 1;
  }

  .computed .mint-cell-text {
    color: #888;
  }

  .computed {
    margin-left: 20px;
  }

  .computed .mint-cell {
    min-height: 35px !important;
  }

  /* 任务描述 */
  .description {
    width: 100%;
  }

  .description img {
    margin-top: 17px;
    width: 100%;
  }

  .description a {
    display: block;
    text-decoration: none;
    color: #3396E4;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }

  .color999 {
    color: #999999;
  }

  .faqList .mint-cell-wrapper, .SpecialInvoice .mint-cell-wrapper {
    background: none;
  }

  [class*="col-"] {
    display: inline-block;
    padding: 5px;
    box-sizing: border-box;
  }

  .col-1 {
    width: 8.33%;
  }

  .col-2 {
    width: 16.66%;
  }

  .col-3 {
    width: 25%;
  }

  .col-4 {
    width: 33.33%;
  }

  .col-5 {
    width: 41.66%;
  }

  .col-6 {
    width: 50%;
  }

  .col-7 {
    width: 58.33%;
  }

  .col-8 {
    width: 66.66%;
  }

  .col-9 {
    width: 75%;
  }

  .col-10 {
    width: 83.33%;
  }

  .col-11 {
    width: 91.66%;
  }

  .col-12 {
    width: 100%;
  }

  .media {
    display: block;
    overflow: hidden;
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    padding: 5px;
  }

  .media-body .title {
    height: 30px;
    line-height: 30px;
  }

  .media-body .time {
    font-size: 14px;
    color: #888888;
  }

  .media-body .Content {
    font-size: 14px;
    color: #888888;
  }

  .media, .media-body {
    zoom: 1;
    overflow: hidden;
  }

  .media-object {
    display: block;
    width: 64px;
    height: 64px;
  }

  .media-object .img-thumbnail {
    max-width: none;
  }

  .media-right, .media > .pull-right {
    padding-left: 10px;
  }

  .pull-right {
    float: right !important;
  }

  .pull-left {
    float: left !important;
  }

  .media-left {
    padding-right: 10px;
  }

  .media-left,
  .media-right,
  .media-body {
    display: table-cell;
    vertical-align: top;
  }

  .media-middle {
    vertical-align: middle;
  }

  .media-bottom {
    vertical-align: bottom;
  }

  .media-heading {
    margin-top: 7px;
    margin-bottom: 7px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .media .media-left {
    width: 64px;
    height: 64px;
    float: left;
  }

  .media .media-body {
    width: 75%;
    float: left;
  }

  .media-head {
    margin-bottom: 5px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
  }

  .media-list {
    padding-left: 0;
    list-style: none;
  }

  .MaterialsDetail .content {
    color: #666666;
    font-size: 14px;
    text-align: left;
  }

  .MaterialsDetail .content img, .faqList .content img, .SalesSkills .content img {
    text-align: center;
    margin-top: 10px;
    width: 100%;
  }

  .SalesSkills .mint-cell-wrapper,
  .faqList .mint-cell-wrapper {
    line-height: 48px !important;
  }

  .SalesSkills .mint-cell-title,
  .faqList .mint-cell-title {
    width: 95%;
  }

  .SalesSkills .mint-cell-text,
  .faqList .mint-cell-text {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 95%;
  }

  .center-box .mint-radiolist .mint-radiolist-label {
    padding-left: 0 !important;
  }

  .center-box .mint-radiolist .mint-radio-label {
    margin-left: 0px !important;
  }

  .center-box .mint-radiolist-title {
    margin: 0 !important;
  }

  .center-box .mint-cell-wrapper {
    padding: 0 !important;
  }

  .mint-msgbox-message .paystate {
    color: #3396E4 !important;
    font-style: normal;
  }

  /* 销售排行 */
  .Ranking .content .mint-cell-title {
    padding: 10px 0;
  }

  .PersonRanking .mt-progress {
    height: 15px;
    line-height: 15px;
  }

  .Ranking .mint-cell-label {
    text-align: justify;
  }

  /* 历史订单 */
  .MyOrder .bg_img_none .mint-cell:last-child .mint-cell-text {
    color: #888;
  }

  .MyOrder .mint-button--large {
    width: 90%;
    margin: auto;
  }

  .OrderDetail .mint-button,
  .MyOrder .mint-button {
    font-size: 16px;
    height: 37px;
  }

  .MyOrder .content .mint-cell-text {
    color: #888;
    display: inline-block;
    width: 4rem;
    text-align: justify;
    text-align-last: justify;
  }

  .MyOrder .content .mint-cell {
    min-height: 30px !important;
  }

  .MyOrder .mint-button--small {
    height: 29px;
  }

  /* 历史订单详情 */
  .OrderDetail .mint-cell-wrapper {
    overflow: auto;
  }

  .OrderDetail .content .mint-cell-text {
    display: inline-block;
    min-width: 4rem;
    text-align: justify;
    text-align-last: justify;
  }

  /* 产品描述 */
  .ProductDescription .p_15 img {
    width: 100%;
  }

  /* 下单--产品类别&&可售产品 */
  .ProductCategory .mint-popup {
    width: 100%;
    height: 60%;
    margin-top: 5px;
  }

  /* 下单--订单填写 */
  .OrderFilling .mint-popup {
    border-radius: 10px;
    border: 1px solid #f4f3f3;
    width: 80%;
  }

  .OrderFilling .geography .mint-popup {
    border-radius: 0;
    border: none;
    width: 100%;
  }

  .OrderFilling .mint-cell-title,
  .SellOrderConfirm .mint-cell-title {
    min-width: 3rem;
  }

  .OrderFilling .mint-cell-wrapper {
    padding-right: 25px !important;
  }

  .OrderFilling .mint-field-core {
    text-align: right;
  }

  .OrderFilling .container_c .mint-cell-wrapper {
    padding-right: 0 !important;
  }

  .SellOrderConfirm .mint-cell-value,
  .OrderFilling .mint-cell-value {
    color: #000;
  }

  .OrderFilling .placeholder .mint-cell-value {
    color: #888;
    opacity: .5;
    -webkit-text-fill-color: #888;
    -webkit-opacity: .5;
    font: 400 14px Arial;
  }

  .OrderFilling textarea {
    resize: none;
    font: 400 14px Arial;
    line-height: 1.6;
  }

  .OrderFilling .mint-cell-wrapper .mint-cell-value input:disabled {
    background: none;
    color: #888;
    opacity: .5;
    -webkit-text-fill-color: #888;
    -webkit-opacity: .5;
  }

  .OrderFilling .address .mint-cell-wrapper .mint-cell-value input:disabled {
    background: none;
    color: #000;
    opacity: 1;
    -webkit-text-fill-color: #000;
    -webkit-opacity: 1;
  }

  .Brand .mint-indexlist-content {
    font-size: 14px;
  }

  .Brand .mint-indexsection-index {
    padding-left: 15px;
  }

  .mint-indicator-wrapper {
    z-index: 3000;
  }

  .Brand .bf_f .mint-cell {
    background: transparent;
  }

  .servicePacks .summary ul {
    margin-left: 17px;
    margin-top: 10px;
  }

  .servicePacks .summary ul li {
    color: #666;
    line-height: 1.5;
  }

  .activation-tips {
    overflow: hidden;
    background-color: #edf2fc;
    z-index: 999;
    font-size: 14px;
    color: #909399;
    border: 1px solid #ebeef5;
    padding: 10px 15px;
    text-align: center;
    margin-bottom: 10px;
  }

  .activation-order-fill .content .mint-cell:last-child {
    background: none !important;
  }

  .activation-order-fill .content .mint-cell:first-child .mint-cell-wrapper {
    background-origin: content-box;
  }

  .activation-content .mint-field .mint-cell-title {
    width: 50px !important;
  }

  .contract_inquiry .mint-searchbar {
    background: #fff;
    width: calc(100% - 100px);
    margin-left: 40px;
  }
  .contract_inquiry .mint-cell {
    min-height: 35px !important;
  }
  .contract_inquiry .mint-searchbar-inner{
    border-radius: 20px;
    border: 1px solid #eee;
  }

  .contract_inquiry .mintui-search{
    margin-right: 5px;
  }
  .contract_inquiry .mint-searchbar-core{
    font-size: 14px;
  }
  .contract_inquiry .title .mint-cell-title{
    width: 100%;
  }
  .device .mint-cell-value{
    width: calc(100% - 75px);
    text-align: right;
    display: inline-block!important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    height: 35px;
    line-height: 35px;
  }

  /* 位置获取失败弹窗 */
  .get_location_fail_win .mint-popup {
    border: none;
    width: 85%;
  }
  .contract_inquiry .machine .mint-cell-wrapper{
    background-image: none!important;
  }
  .contract_inquiry .machine .mint-cell:last-child{
    background-image: none!important;
  }
  </style>
