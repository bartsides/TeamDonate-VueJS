<template>
  <div class="text-editor">
    <label :for="name" class="d-flex justify-content-center">
      {{ label }}
    </label>
    <div class="text-editor-content">
      <bubble-menu
        class="bubble-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
        v-if="editor"
      >
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <font-awesome-icon icon="bold"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <font-awesome-icon icon="italic"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <font-awesome-icon icon="strikethrough"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <font-awesome-icon icon="align-left"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <font-awesome-icon icon="align-center"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <font-awesome-icon icon="align-right"></font-awesome-icon>
        </button>
      </bubble-menu>

      <floating-menu
        class="floating-menu"
        :tippy-options="{ duration: 100 }"
        :editor="editor"
        v-if="editor"
      >
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H1
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          H2
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          H3
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <font-awesome-icon icon="list-ul"></font-awesome-icon>
        </button>
      </floating-menu>

      <div v-if="editor" class="text-editor-options">
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().undo().run()"
        >
          <font-awesome-icon icon="undo"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().redo().run()"
        >
          <font-awesome-icon icon="redo"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <font-awesome-icon icon="bold"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <font-awesome-icon icon="italic"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <font-awesome-icon icon="strikethrough"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor.isActive('highlight') }"
        >
          <font-awesome-icon
            class="highlight"
            icon="square"
          ></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.isActive('link')
              ? editor.chain().focus().unsetLink().run()
              : setLink()
          "
          :class="{ 'is-active': editor.isActive('link') }"
        >
          <font-awesome-icon icon="link"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          H1
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          H2
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          "
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          H3
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <font-awesome-icon icon="list-ul"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <font-awesome-icon icon="list-ol"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <font-awesome-icon icon="align-left"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <font-awesome-icon icon="align-center"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <font-awesome-icon icon="align-right"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <font-awesome-icon icon="quote-right"></font-awesome-icon>
        </button>
        <button
          class="text-editor-button btn"
          @click.prevent="editor.chain().focus().setHorizontalRule().run()"
        >
          <font-awesome-icon icon="minus"></font-awesome-icon>
        </button>
      </div>
      <EditorContent :name="name" :editor="editor" />
    </div>
  </div>
</template>
<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-2';
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
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    setLink() {
      const url = window.prompt('URL');

      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    },
  },
  mounted() {
    this.editor = new Editor({
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
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML());
      },
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
<style lang="sass" scoped>
@import @/assets/styles/variables
.text-editor
  margin-bottom: $input-margin-bottom
.text-editor-content
  border: 1px solid $dark
  border-radius: $radius
  min-height: 200px
.bubble-menu, .floating-menu
  background-color: #f2f5f7
  border: 1px solid $dark
  border-radius: $radius
.text-editor-options
  background-color: #f2f5f7
  border-bottom: 1px solid $dark
  border-radius: $radius
  position: sticky
  top: 0
  z-index: 10
.text-editor-button
  border-radius: $radius
  margin: 5px
  width: 30px
  height: 30px
  padding: 0
.is-active
  background-color: $info
label
  display: block
  margin-bottom: 4px
  width: 100%
.highlight
  color: yellow
  border: 1px solid $dark
  border-radius: 2px
</style>
<style lang="sass">
@import @/assets/styles/variables
.ProseMirror-focused
  outline: none
.ProseMirror
  padding: 8px

  > * + *
    margin-top: 0.75em

  ul,
  ol
    padding: 0 1rem

  h1,
  h2,
  h3,
  h4,
  h5,
  h6
    line-height: 1.1

  code
    background-color: rgba(#616161, 0.1)
    color: #616161


  pre
    background: #0d0d0d
    color: #fff
    font-family: 'JetBrainsMono', monospace
    padding: 0.75rem 1rem
    border-radius: 0.5rem

    code
      color: inherit
      padding: 0
      background: none
      font-size: 0.8rem

  img
    max-width: 100%
    height: auto

  blockquote
    padding-left: 1rem
    border-left: 2px solid rgba(#0d0d0d, 0.1)

  hr
    border: none
    border-top: 2px solid rgba(#0d0d0d, 0.1)
    margin: 2rem 0

  a
    text-decoration: underline
</style>
