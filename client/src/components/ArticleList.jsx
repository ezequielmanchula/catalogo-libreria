import './ArticleList.css';

export default function ArticleList({ articles, onSelect }) {
    if (articles.length === 0) {
        return <p className="no-results">No se encontraron artículos.</p>;
    }

    return (
        <div className="article-list">
            {articles.map((article) => (
                <div key={article.id} className="article-card" onClick={() => onSelect(article)}>
                    <h3>{article.name}</h3>
                    <p className="price">${article.price.toFixed(2)}</p>
                    <span className="category">{article.category}</span>
                </div>
            ))}
        </div>
    );
}
