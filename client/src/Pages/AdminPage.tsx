import { productColumns } from "../components/Admin/ColumnProductTable";
import ProductTable from "../components/Admin/ProductTable";
import useProducts from "../hooks/useProducts";

const AdminPage = () => {

    const { allCoffeeProducts } = useProducts()
 
  return (
    <div className="m-w-[1280px]">
    <h1 className="upercase">Produkt panel</h1>
    <ProductTable columns={productColumns} data={allCoffeeProducts} />

    </div>
  );
};

export default AdminPage;
