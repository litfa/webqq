<script setup lang="ts"></script>

<template>
  <div class="chatlist-chat">
    <div class="avatar">
      <img src="https://www.alongw.cn/icon/logo.jpg" alt="avatar" />
    </div>
    <div class="text">
      <div class="title">
        <div class="name">name</div>
        <div class="date">20223/1/27</div>
      </div>
      <div class="title-row">
        <div class="message">消息内容消息内容内容</div>
        <div class="count">1241+</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.chatlist-chat {
  display: flex;
  height: 70px;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  // max-width: 350px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }

  &.active {
    background-color: #3390ec;
    color: #fff;

    .text {
      .title,
      .title-row {
        .date {
          color: #fff;
        }

        .count {
          background-color: #fff;
          color: #3390ec;
        }
      }
    }
  }

  .avatar {
    height: 100%;
    margin-right: 10px;

    img {
      height: 100%;
      border-radius: 50%;
    }
  }

  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .title,
    .title-row {
      display: flex;
      justify-content: space-between;

      .date {
        font-size: 12px;
        color: #707579;
      }

      .message {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 0;
        flex: 1;
      }

      .count {
        background-color: #d0cfd1;
        color: #fff;
        border-radius: 20px;
        padding: 1px 5px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
