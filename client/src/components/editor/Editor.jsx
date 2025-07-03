import styles from "./Editor.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { MenuBar } from "../menuBar/MenuBar";
import { usePage } from "../../contexts/pagesContext";
import { Loading } from "../loading/Loading";
import html2pdf from "html2pdf.js"

export const Editor = ({ pageData, content }) => {
  const timeoutRef = useRef(null);
  const { autoSave, loadingAutoSave, success } = usePage();

  //Configuração do editor
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

  // Setando conteúdo ao renderizar a página
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content || "");
      console.log(pageData)
    }
  }, [content]);

  //Baixar conteúdo em pdf
  const handleDownloadPDF = () => {
    const contentElement = document.getElementById("editorContentToExport")
    contentElement.classList.remove(styles.localEdit)

    if(!contentElement) return

    const opt = {
      margin: 0.5,
      filename: `${pageData.title|| 'Documento'}.pdf`,
      image: { type: 'jpeg', quality: 0.98  },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf()
    .set(opt)
    .from(contentElement)
    .save()
    .then(() => {
      contentElement.classList.add(styles.localEdit)
    })
  }

  return (
    <div className={styles.containerEdit}>
      <h2>{pageData.title}</h2>
      <MenuBar editor={editor} handleDownload={handleDownloadPDF} />
      <div className="status">
        {loadingAutoSave && <Loading /> }
        {success && <span className="msgSuccess">{success}</span>}
      </div>

      <div id="editorContentToExport" className={styles.localEdit}>
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};
