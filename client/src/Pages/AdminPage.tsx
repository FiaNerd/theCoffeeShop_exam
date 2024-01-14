import { useState } from "react";
import ProductForm from "../components/Admin/ProductForm";
import { productColumns } from "../components/Admin/tables/ColumnProductTable";
import ProductTable from "../components/Admin/tables/ProductTable";
import Buttons from "../components/partial/Button";
import useProducts from "../hooks/useProducts";
import { Product } from "../types/products";

const AdminPage = () => {
  const { allCoffeeProducts } = useProducts();
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const cancelEdit = () => {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  };

  const createNewProduct = () => {
    setSelectedProduct(undefined);
    setEditMode(true);
  };

  return (
    <div className="max-w-[1280px] mx-auto mt-8 px-4">
      <div className="flex flex-row justify-between mb-8">
        { !editMode && (
        <>
            <h1 className="uppercase">Produkt panel</h1>
            <Buttons
            buttonType="create"
            typeAction="button"
            className="px-8 py-2"
            onClick={createNewProduct}
            >
            Ny Produkt
            </Buttons>
            </>
        )}
        </div>

      {editMode ? (
        <ProductForm  title={!selectedProduct ? false : true}  product={selectedProduct} cancelEdit={cancelEdit} />
      ) : (
        <ProductTable columns={productColumns} data={allCoffeeProducts} onSelectProduct={handleSelectProduct } />
      )}
    </div>
  );
};

export default AdminPage;
