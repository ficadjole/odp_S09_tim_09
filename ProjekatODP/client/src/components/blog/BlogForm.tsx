import React from "react";

interface BlogFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const BlogForm: React.FC<BlogFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
}) => {
  return (
    <>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          placeholder="Write full blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />
      </div>
    </>
  );
};
