import "./directory-item.styles.scss";

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <section className="directory-item-container">
      <div
        className="background-image"
        role="img"
        aria-label={`${title} backgroung`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </section>
  );
};

export default DirectoryItem;
