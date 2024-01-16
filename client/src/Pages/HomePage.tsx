import Button from "../components/partial/Button";
import CoffeeCard from "../components/product/CoffeeCard";
import useProducts from "../hooks/useProducts";

const HomePage = () => {

  const { allCoffeeProducts } = useProducts()
  
  return (
    <div className="px-4 container max-w-[1280px] mx-auto mb-4 mt-8">
      <h1 className="text-dark-deep-brown mb-4 to uppercase">Vårt kaffe</h1>

      <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown">
        {allCoffeeProducts &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          allCoffeeProducts.map((product: any) => (
            <CoffeeCard key={product.id} product={product} />
          ))}
      </div>

      <div className="flex mx-auto justify-center mb-8">
        <Button
          buttonType="load-more"
          typeAction={"button"}
          onClick={() => console.log("Click")}
        >
          Ladda fler
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
