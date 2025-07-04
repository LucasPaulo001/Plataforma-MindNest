import styles from "./Editor.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextColor from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { useEffect, useRef, useState } from "react";
import { MenuBar } from "../menuBar/MenuBar";
import { usePage } from "../../contexts/pagesContext";
import { Loading } from "../loading/Loading";
import html2pdf from "html2pdf.js";

export const Editor = ({ pageData, content }) => {
  const timeoutRef = useRef(null);
  const { autoSave, loadingAutoSave, success, pages } = usePage();
  const [infoTitle, setInfoTitle] = useState(null);

  //Atualização do title na edição
  useEffect(() => {
    if (Array.isArray(pages) && pageData?._id) {
      const current = pages.find((p) => p._id === pageData._id);
      if (current) setInfoTitle(current.title);
    }
  }, [pages, pageData._id]);

  //Configuração do editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextColor,
      TextStyle,
      highlight,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

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
      console.log(pageData);
    }
  }, [content]);

  //Baixar conteúdo em pdf
  const handleDownloadPDF = () => {
    const contentElement = document.getElementById("editorContentToExport");
    contentElement.classList.remove(styles.localEdit);
    if (!contentElement) return;

    // Garante que todas as imagens foram carregadas
    const images = contentElement.querySelectorAll("img");
    const allImagesLoaded = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    });

    Promise.all(allImagesLoaded)
      .then(() => {
        const opt = {
          margin: 0.5,
          filename: `${pageData.title || "Documento"}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true }, // usa CORS
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };

        html2pdf().set(opt).from(contentElement).save();
      })
      .then(() => {
        contentElement.classList.add(styles.localEdit);
      });
  };

  return (
    <div className={styles.containerEdit}>
      <h2>{infoTitle}</h2>
      <MenuBar editor={editor} handleDownload={handleDownloadPDF} />
      <div className="status">
        {loadingAutoSave && <Loading />}
        {success && <span className="msgSuccess saveMsg">{success}</span>}
      </div>

      <div id="editorContentToExport" className={styles.localEdit}>
        {editor && <EditorContent editor={editor} />}
      </div>
    </div>
  );
};
