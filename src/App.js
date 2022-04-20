const App = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      // subtitle shopNow
    },
    {
      id: 2,
      title: "Jackets",
      // subtitle shopNow
    },
    {
      id: 3,
      title: "Sneakers",
      // subtitle shopNow
    },
    {
      id: 4,
      title: "Womans",
      // subtitle shopNow
    },
    {
      id: 5,
      title: "Mans",
      // subtitle shopNow
    },
  ];

  return (
    <div className="categories-container">
      {categories.map(({ id, title }) => {
        return (
          <section key={id} className="category-container">
            <div
              className="background-image"
              role="img"
              aria-label="Description of the overall image"
            />
            <div className="category-body-container">
              <h2>{title}</h2>
              <p>Shop now</p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default App;
