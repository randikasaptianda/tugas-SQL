import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../app.css";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProduct] = useState([]);

  useEffect(() => {
    if (keyword.length) {
      getProductsKeyword();
    } else {
      getAllProducts();
    }
  }, [keyword]);

  const getAllProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProduct(res.data);
  };

  const getProductsKeyword = async () => {
    const res = await axios.get(`http://localhost:5000/products?search=${keyword}`);
    setProduct(res.data);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      getAllProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mt-20 ">
      <Link to="add" className="bg-green-500 hover:border-2 hover:border-green-700 hover:bg-white hover:text-green-500 p-3 rounded-xl text-white text-lg font-medium ml-5 duration-300 ">
        Add Product
      </Link>
      <div className="search">
        <input type="text" placeholder="Cari..." onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <div className="mx-5 mt-5">
        <table className=" border-collapse border border-slate-500 mx-auto w-full ">
          <thead>
            <tr>
              <th className="border-[3px] bg-red-500 text-white border-slate-800 p-2">No</th>
              <th className=" bg-red-500 text-white border-[3px] border-slate-800 p-2">Name</th>
              <th className=" bg-red-500 text-white border-[3px] border-slate-800">Price</th>
              <th className=" bg-red-500 text-white border-[3px] border-slate-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="border-[3px] bg-red-500 text-white font-semibold border-slate-700 p-2 text-center ">{index + 1}</td>
                <td className="border-2 border-slate-700 p-2 text-center">{product.name}</td>
                <td className="border-2 border-slate-700 p-2 text-center">{product.price}</td>
                <td className="border-2 border-slate-700 p-2 text-center ">
                  <Link to={`detail/${product.id}`} className="bg-blue-500 p-2 px-3 rounded-xl text-white duration-300 font-semibold mr-3 hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500  ">
                    Detail
                  </Link>
                  <Link to={`edit/${product.id}`} className=" mt-2 bg-green-500 p-2 px-5 rounded-xl text-white font-semibold mr-3 hover:bg-white hover:text-green-500 hover:border hover:border-green-500  duration-300">
                    Edit
                  </Link>
                  <button onClick={() => deleteProduct(product.id)} className=" mt-4 bg-red-500 p-2 px-3 duration-300 rounded-xl text-white font-semibold mr-3 hover:bg-white hover:text-red-500 hover:border hover:border-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
