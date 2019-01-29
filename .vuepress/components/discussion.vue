<template>
    <div class="comments">
        <vue-disqus shortname="https-bingbig-github-io" :identifier="pageId" url="https://https-bingbig-github-io.disqus.com"></vue-disqus>
    </div>
</template>


<script>
import VueDisqus from 'vue-disqus'

export default {
    name: 'discussion',
    props: ['pageId'],
    data: function() {
        return {
            identifier: this.pageId,
        }
    },
    components: function (){
        VueDisqus
    }
}
</script>

