import Products from "../components/Product";

export function Home() {
  return (
    <>
      <div className="container">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Koleso shinalari
        </h1>
      </div>
      <Products />
    </>
  );
}
