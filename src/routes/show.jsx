
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";


export default function Show() {
  const navigate = useNavigate();
  let { id } = useParams();

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
  }, [id])


  return (
    <div >
      <div className="row">
        <div className="col-12">
          <button onClick={() => navigate(-1)} className="btn btn-primary float-end">Voltar</button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {post != null ? (
            <div>
              <p><strong>Título:</strong> {post.title}</p>
              <p><strong>Conteúdo:</strong> {post.body}</p>
            </div>
          ) : (<p>Carregando...</p>)}
        </div>
      </div>
    </div>
  );
}