import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, Fragment } from "react";

import { CategotiesContext } from "../../context/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import { Header, CategoryContainer } from "./category.styles";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategotiesContext);

  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  // console.log("🤠");
  // console.dir(products);
  return (
    <Fragment>
      <Header>{category.toUpperCase()}</Header>
      <CategoryContainer>
        {
          /*Add guard as categories map must be awaited*/
          products &&
            products.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
