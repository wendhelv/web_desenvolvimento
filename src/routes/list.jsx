
import { useEffect, useState } from 'react';
import axios from 'axios'
import { Link, useLocation } from "react-router-dom";


export default function List() {
  const location = useLocation()
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => {
        const data = response.data
        if (location.state) {
          data.push(location.state.data)
        }
        setPosts(data);
      })
  }, [location.state])

  async function handleDelete(id) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      const newPosts = posts.filter((post) => post.id != id)
      setPosts(newPosts)
    } catch (error) {
      alert("Erro ao deletar o post, tente novamente mais tarde.")
    }
  }


  return (
    <div >
      <div className="row">
        <div className="col-12">
          <Link to={'/create'} className="btn btn-primary float-end">Adicionar Novo</Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.length ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>
                    <Link to={`/${post.id}`} className='btn btn-info me-5'>Visualizar</Link>
                    <Link to={`/${post.id}/edit`} className='btn btn-warning me-5'>Editar</Link>
                    <button className='btn btn-danger' onClick={() => handleDelete(post.id)}>Deletar</button>
                  </td>
                </tr>
              ))

            ) : (
              <tr>
                <td colSpan="10" className="text-center">Nenhum post encontrado </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}