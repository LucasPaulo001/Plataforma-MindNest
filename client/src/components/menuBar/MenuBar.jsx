import { FaBold, FaItalic, FaList, FaUndo, FaRedo } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";

export const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="containerTool">
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
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btnTool ${editor.isActive("bulletList") ? "active" : ""}`}
      >
        <FaList />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
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
    </div>
  );
};
