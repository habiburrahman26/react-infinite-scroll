interface Product {
  title: string;
  price: number;
  thumbnail: string;
}

const ProductItem = ({ title, thumbnail, price }: Product) => {
  return (
    <div className="product">
      <h2>{title}</h2>
      <img src={thumbnail} alt={title} />
      <p>{price}</p>
    </div>
  );
};

export default ProductItem;
