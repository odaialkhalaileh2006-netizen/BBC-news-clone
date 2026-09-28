import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

function RichTextEditor({ value, onChange }) {
    const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const incoming = value || '';
    const current = editor.getHTML();

    if (incoming !== current) {
      editor.commands.setContent(incoming, false);
    }
  }, [value, editor]);

  if(!editor) {
    return null;
  }
  
return (
    <div className="border border-gray-300 rounded">
      <div className="flex gap-2 border-b border-gray-300 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 text-sm font-bold rounded hover:bg-gray-100"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 text-sm italic rounded hover:bg-gray-100"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 text-sm rounded hover:bg-gray-100"
        >
          • List
        </button>
      </div>
      <EditorContent editor={editor} className="p-2 text-sm min-h-[150px]" />
    </div>
  );
}
export default RichTextEditor;