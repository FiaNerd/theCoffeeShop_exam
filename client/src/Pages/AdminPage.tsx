import { useState } from "react";
import ProductForm from "../components/Admin/ProductForm";
import { productColumns } from "../components/Admin/tables/ColumnProductTable";
import ProductTable from "../components/Admin/tables/ProductTable";
import Buttons from "../components/partial/Button";
import useProducts from "../hooks/useProducts";

const AdminPage = () => {

    const [editMode, setEditMode] = useState(false);
    const { allCoffeeProducts } = useProducts()

    if (editMode) return <ProductForm />
 
  return (
    <div className="max-w-[1280px] mx-auto mt-8">
        <div className="flex flex-row justify-between mb-8"> 
            <h1 className="uppercase">Produkt panel</h1>
  
            <Buttons buttonType="create" typeAction="button" className="px-8 py-2" onClick={() => setEditMode(true)}>Ny Produkt</Buttons>
      
        </div>
        <ProductTable columns={productColumns} data={allCoffeeProducts} />
    </div>

  );
};

export default AdminPage;
