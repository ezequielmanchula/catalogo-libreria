import './ArticleDetail.css';

export default function ArticleDetail({ article, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{article.name}</h2>
                <div className="detail-row">
                    <span className="label">Categoría:</span>
                    <span className="value">{article.category}</span>
                </div>
                <div className="detail-row">
                    <span className="label">Descripción:</span>
                    <p className="description">{article.description}</p>
                </div>
                <div className="detail-row price-row">
                    <span className="price-large">${article.price.toFixed(2)}</span>
                </div>

                <button className="buy-button">Añadir al carrito</button>
            </div>
        </div>
    );
}
