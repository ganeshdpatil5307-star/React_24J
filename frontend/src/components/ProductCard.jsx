export default function ProductCard({ product, onAdd, adding }) {
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        loading="lazy"
      />
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="btn btn-primary"
            onClick={() => onAdd(product.id)}
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
