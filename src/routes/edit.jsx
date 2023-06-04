import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setTitle(response.data.title)
        setContent(response.data.body)
      })
  }, [id])

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        id,
        title,
        body: content,
        userId: 1,
      })
      navigate(-1);

    } catch (error) {
      alert("Erro ao atualizar o post, tente novamente mais tarde.")
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label" >Título</label>
          <input type="text" className="form-control" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Texto</label>
          <textarea className="form-control" id="content" rows="3"  value={content} onChange={(e) => setContent(e.target.value)} required>

          </textarea>
        </div>
        <button type="submit" className="btn btn-primary float-end">Salvar</button>
      </form>
    </div>
  );
}