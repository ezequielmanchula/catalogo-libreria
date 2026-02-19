import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ArticleList from './components/ArticleList'
import ArticleDetail from './components/ArticleDetail'
import './App.css'

function App() {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    fetchArticles();
  }, [searchTerm])

  const fetchArticles = async () => {
    try {
      // Use environment variable if available (Render), otherwise relative path (Netlify/Local Proxy)
      const apiUrl = import.meta.env.VITE_API_URL || '/api';

      const url = searchTerm
        ? `${apiUrl}/articles?search=${searchTerm}`
        : `${apiUrl}/articles`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.message === "success") {
        setArticles(data.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  return (
    <div className="app-container">
      <Header />
      <SearchBar onSearch={setSearchTerm} />
      <ArticleList articles={articles} onSelect={setSelectedArticle} />
      {selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  )
}

export default App
