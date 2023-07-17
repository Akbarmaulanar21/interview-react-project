import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Auth/auth";

const CardDashboard = () => {
  const { username, data } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  console.log(data?.data?.foods);
  
  return (
    <div className="w-full h-full flex flex-col py-8 px-10 rounded-[24px] bg-white shadow-2xl gap-6 z-30">
      <h1 className="text-[28px] font-semibold py-4">Dashboard</h1>
      <h3 className="text-[12px]">Selamat datang {username}</h3>
      <div className="flex flex-col w-full gap-6">
        <h3 className="text-[12px] ">Daftar makanan:</h3>
        <ul className="pl-4 list-disc">
          {data?.data?.foods.map((item, index) => (
            <li key={index} className="text-[12px]">
              {item.name} Rp. {item.price}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="w-full bg-[#f06623] py-4 px-16 text-white rounded-full text-center font-bold"
        onClick={handleLogOut}
      >
        Keluar
      </button>
    </div>
  );
};

export default CardDashboard;
