import Products from "../components/Products";

export function Home() {
  return (
    <>
      <div className="container">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Koleso shinalar
        </h1>
      </div>
      <Products />
    </>
  );
}
