import { FormEvent, useState } from "react";
import { IPost } from "../types";

type Props = {
  savePost: (e: React.FormEvent, formData: IPost) => void;
};

const AddPost: React.FC<Props> = ({ savePost }) => {
  const [formData, setFormData] = useState<IPost>({
    id: 0,
    title: "",
    body: "",
  });

  const handleForm = (e: FormEvent<HTMLInputElement>): void => {
    const _formData = formData ? formData : ({} as IPost);
    setFormData({
      ..._formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  return (
    <form className="Form " onSubmit={(e) => savePost(e, formData)}>
      <div>
        <div className="Form--field">
          <label htmlFor="name">Title</label>
          <input id="title" name="name" type={"text"} onChange={handleForm} />
        </div>
        <div className="Form--field">
          <label htmlFor="body">Description</label>
          <input id="body" name="body" type={"text"} onChange={handleForm} />
        </div>
      </div>
      <button className="Form--button" disabled={!formData ? true : false}>
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
