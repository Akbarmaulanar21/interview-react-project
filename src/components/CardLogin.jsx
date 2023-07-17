import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../Auth/auth";
import Error from "./Error";

const CardLogin = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(authenticateUser({ email, password }));
    navigate("/dashboard");
  };

  return (
    <>
      <div className="absolute top-5 right-10">
        {isError && <Error />}
      </div>
      <div className="w-full h-full flex flex-col py-8 px-10 rounded-[24px] bg-white shadow-2xl gap-6 z-30">
        <h1 className="text-[28px] font-semibold py-4">Masuk</h1>
        <h3 className="text-[12px]">
          Masukkan alamat email / nomor telepon dan kata sandi yang telah anda daftarkan.
        </h3>
        <div>
          <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
            <div className="w-full py-[14px] px-5 flex gap-[10px] rounded-full border-[1px] ">
              <img src="./person.png" alt="person icon" />
              <input
                type="text"
                name="email"
                id="email"
                className="w-full border-none outline-none"
              />
            </div>
            <div className="w-full py-[14px] px-5 flex gap-[10px] rounded-full border-[1px] ">
              <img src="./lock.png" alt="lock icon" />
              <input
                type="password"
                name="password"
                id="password"
                className="w-full border-none outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#f06623] py-4 px-16 text-white rounded-full text-center font-bold"
            >
              Masuk Sekarang
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CardLogin;
