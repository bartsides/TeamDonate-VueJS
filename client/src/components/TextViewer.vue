<template>
  <div class="text-viewer">
    <EditorContent :editor="editor" />
  </div>
</template>
<script>
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      editable: false,
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight,
        Link,
        Typography,
      ],
      content: this.value,
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    value(value) {
      // Don't set if same value
      if (this.editor.getHTML() === value) return;
      this.editor.commands.setContent(value, false);
    },
  },
};
</script>
