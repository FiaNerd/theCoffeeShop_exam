import { useState } from "react";
import ProductForm from "../components/Admin/ProductForm";
import { productColumns } from "../components/Admin/tables/ColumnProductTable";
import ProductTable from "../components/Admin/tables/ProductTable";
import Buttons from "../components/partial/Button";
import SearchProducts from "../components/partial/SearchProducts";
import { removeProduct, setPageNumber } from "../components/product/productSlice";
import useProducts from "../hooks/useProducts";
import { useAppDispatch } from "../redux/configureStore";
import { deleteProduct } from "../services/CoffeeAPI";
import { Product } from "../types/products";
import Pagination from "./Pagination";

const AdminPage = () => {
  const { allCoffeeProducts, metaData }  = useProducts();
  const [ editMode, setEditMode ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ selectedProduct, setSelectedProduct ] = useState<Product | undefined>(
    undefined)
  const dispatch = useAppDispatch()

  console.log("MetaData Admin",metaData)

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const handleDeleteProduct = (product: Product) => {
    if (product && product.id) {
      setLoading(true);
      deleteProduct(product.id)
        .then(() => {
          dispatch(removeProduct(product.id));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          setLoading(false);
        })
    }
  }

  const cancelEdit = () => {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  const createNewProduct = () => {
    setSelectedProduct(undefined);
    setEditMode(true);
  }

  
  return (
    <div className="max-w-[1280px] mx-auto px-4 mb-8">
      <div className="flex flex-row justify-between mb-8">
        { !editMode && (
          <>
            <div className=" flex flex-1 flex-col  justify-between mt-8">
            <SearchProducts />
            <div className="flex flex-1 flex-col md:flex-row justify-between">
              <h1 className="uppercase mb-8 md:mb-0">Produkt panel</h1>
              <Buttons
              isLoading={loading}
              buttonType="create"
              typeAction="button"
              className="px-8 py-2 bg-deep-brown"
              onClick={createNewProduct}
              >
              Ny Produkt
              </Buttons>
            </div>
            </div>
            </>
        )}
        </div>

      {editMode ? (
        <ProductForm  title={!selectedProduct ? false : true}  product={ selectedProduct } cancelEdit={ cancelEdit } />
      ) : (
        <ProductTable  columns={ productColumns } data={ allCoffeeProducts } onSelectProduct={ handleSelectProduct } onDeleteProduct={ handleDeleteProduct } />
      )}

      { metaData && (
        <Pagination   metaData={metaData}
        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))} />
      )}
      
    </div>
  );
};

export default AdminPage;
