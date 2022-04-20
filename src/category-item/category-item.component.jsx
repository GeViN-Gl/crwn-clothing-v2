import "./category-item.styles.scss";

const CategoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <section className="category-container">
      <div
        className="background-image"
        role="img"
        aria-label={`${title} backgroung`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </section>
  );
};

export default CategoryItem;
