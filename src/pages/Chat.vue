<script setup lang="ts">
import Bubble from '../components/Bubble/Bubble.vue'
import { getGroupRecord } from '../apis/getMessageRecord'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { GroupMessageType, GroupSyncMessageType } from '../types/Message'

const route = useRoute()

const qq = Number(route.params?.qq)
const list = ref<(GroupMessageType | GroupSyncMessageType)[]>([])

const getMessageRecord = async () => {
  const { data: res } = await getGroupRecord(qq)
  if (res.status == 200) {
    list.value = res.data
  }
}
getMessageRecord()
</script>

<template>
  <template v-for="i in list">
    <bubble
      v-if="i.type == 'GroupMessage'"
      :qq="i.sender.id"
      :message="i.messageText"
      :name="i.sender.memberName"
    />
    <bubble
      v-if="i.type == 'GroupSyncMessage'"
      :message="i.messageText"
      name="XING"
      :avatar-display="'hidden'"
      reverse
    />
  </template>

  <!-- <bubble :qq="2017295059" message="1233" name="name" reverse></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble
    :qq="1287756886"
    message="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa"
    name="name"
  ></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble :qq="2017295059" message="" name="name"></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble :qq="1287756886" message="1233" name="name"></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble
    :qq="2017295059"
    message="lex-shrink（最后是 flex-shrink， shrink英文意思是<收缩，>，这就代表当父元素的宽度小于子元素宽度之和时，并且超出了父元素的宽度，这时，flex-shrink就会说外面的世界太苦了，我还是回到父亲的怀抱中去吧！因此，flex-shrink就会按照一定的比例进行收缩。）
————————————————
版权声明：本文为CSDN博主「道济和尚」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wenxiukeke/article/details/87165182"
    name="name"
    reverse
  ></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble>
  <bubble :qq="2017295059" message="1233" name="name"></bubble> -->
</template>

<style lang="less" scoped></style>
