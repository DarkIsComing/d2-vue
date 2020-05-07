<template>
  <div>
    <div>
      <div class="see-left">

      </div>
      <div class="see-right">
        <el-button type="text"
                   ！@click="save">保存</el-button>
      </div>
    </div>
    <quill-editor v-model="content"
                  ref="myQuillEditor"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
  </div>
</template>
<script>
import { agreementDetail, postAgreement } from '@api/agreement'
export default {
  data () {
    return {
      content: '',
      name: '',
      idcard: '',
      gender: '',
      type: '',
      postive: '',
      negative: '',
      face: '',
      license: ''
    }
  },
  methods: {
    save () {
      postAgreement({

      })
    }
  },
  mounted: function () {
    console.info('id', this.$route.query.id)
    agreementDetail({
      'id': this.$route.query.id
    })
      .then(response => {
        console.log(response, 'success') // 成功的返回
        this.content = response.data.notes
        this.name = response.data.name
        this.idcard = response.data.user_idcard
        this.gender = response.data.gender
        this.type = response.data.check_status
        this.postive = process.env.VUE_APP_API + response.data.user_idcard_up
        this.negative = process.env.VUE_APP_API + response.data.user_idcard_down
        this.face = process.env.VUE_APP_API + response.data.user_face
        this.license = process.env.VUE_APP_API + response.data.user_license
      })
      .catch(error => console.log(error, 'error')) // 失败的返回
  }
}
</script>

<style>
.quill-editor {
  height: 800px;
}

.ql-container {
  height: 700px;
}
</style>
