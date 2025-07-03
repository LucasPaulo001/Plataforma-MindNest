import styles from "./Editor.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { MenuBar } from "../menuBar/MenuBar";
import { usePage } from "../../contexts/pagesContext";

export const Editor = ({ pageData, content }) => {
  const timeoutRef = useRef(null);
  const { autoSave } = usePage();

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "<p>Escreva sua nota...</p>",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();

      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        autoSave(pageData._id, html);
      }, 1000);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(pageData.content || "");
    }
  }, [pageData, editor]);

  return (
    <div className={styles.containerEdit}>
      <h2>{pageData.title}</h2>
      <MenuBar editor={editor} />

      <div className={styles.localEdit}>
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};
