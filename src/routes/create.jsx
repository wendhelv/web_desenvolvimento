import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Create() {
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body: content,
        userId: 1,
      })
      navigate("/", {
        state: { data }
      });
    } catch (error) {
      alert("Erro ao salvar o post, tente novamente mais tarde.")
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Título</label>
          <input type="text" className="form-control" id="title" required onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Texto</label>
          <textarea className="form-control" id="content" rows="3" onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary float-end">Salvar</button>
      </form>
    </div>
  );
}