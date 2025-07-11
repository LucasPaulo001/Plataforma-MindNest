import {
  FaBold,
  FaItalic,
  FaList,
  FaUndo,
  FaRedo,
  FaUnderline,
  FaHighlighter,
  FaFileImage,
} from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";
import {
  CiTextAlignLeft,
  CiTextAlignCenter,
  CiTextAlignRight,
  CiTextAlignJustify,
} from "react-icons/ci";
import { usePage } from "../../contexts/pagesContext";

export const MenuBar = ({ editor, handleDownload }) => {

  const { openMenu } = usePage();
  if (!editor) return null;

  return (
    <>
      {!openMenu && (
        <div className="containerTool">
          <h2>Ferramentas de texto</h2>
          <div className="btnsContainer">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`btnTool ${editor.isActive("bold") ? "active" : ""}`}
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`btnTool ${editor.isActive("italic") ? "active" : ""}`}
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`btnTool ${
                editor.isActive("underline") ? "active" : ""
              }`}
            >
              <FaUnderline />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`btnTool ${
                editor.isActive("highlight") ? "active" : ""
              }`}
            >
              <FaHighlighter />
            </button>
            <button
              onClick={() => {
                const file = window.prompt("Cole o link da imagem aqui:");
                if (file) {
                  editor.chain().focus().setImage({ src: file }).run();
                }
              }}
              className="btnTool"
            >
              <FaFileImage />
            </button>
            <button
              className="btnTool"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <CiTextAlignLeft />
            </button>
            <button
              className="btnTool"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <CiTextAlignCenter />
            </button>
            <button
              className="btnTool"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <CiTextAlignRight />
            </button>
            <button
              className="btnTool"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <CiTextAlignJustify />
            </button>
            <button>
              <input
                type="color"
                onChange={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
              />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`btnTool ${
                editor.isActive("bulletList") ? "active" : ""
              }`}
            >
              <FaList />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`btnTool ${
                editor.isActive("heading", { level: 2 }) ? "active" : ""
              }`}
            >
              <MdOutlineTitle />
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              className="btnTool"
            >
              <FaUndo />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              className="btnTool"
            >
              <FaRedo />
            </button>
            <button onClick={handleDownload} className="btnTool" id="d_pdf">
              <FaFilePdf />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
