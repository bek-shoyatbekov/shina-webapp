import AdminProducts from "../components/AdminProducts";

export function AdminHome() {
  const isAdmin = localStorage.getItem("isAdmin");
  return (
    <>
      <div className="container">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Koleso shinalar (admin)
        </h1>
      </div>
      {isAdmin ? <AdminProducts /> : <h1>Siz admin emassiz</h1>}
    </>
  );
}
