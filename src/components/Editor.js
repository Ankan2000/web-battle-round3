import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ placeholder, handleChange, editorHtml }) => {
  const modules = {
    toolbar: [
      [{ header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <>
      <ReactQuill
        theme="snow"
        onChange={handleChange("content")}
        value={editorHtml}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          width: "100%",
          minWidth: "550px",
          height: "300px",
          marginBottom: "50px",
        }}
      />
    </>
  );
};

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

export default Editor;
