import axios from "axios";
import { useState } from "react";

import loginBg from "../assets/loginBg.png";
import login from "../assets/login.jpg";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!identifier) {
      alert("Please enter email or mobile number");
      return;
    }

    const isEmail = identifier.includes("@");
    const isPhone = identifier.length === 10;

    if (!isEmail && !isPhone) {
      alert("Enter valid email or 10-digit mobile number");
      return;
    }

    const payload = identifier.includes("@")
      ? { email: identifier }
      : { mobile: identifier };

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`,
        payload,
        {
          withCredentials: true,
        },
      );

      alert(data.message);

      if (data.success) {
        setStep(2);
      }
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Please enter valid OTP");
      return;
    }

    const payload = identifier.includes("@")
      ? {
          email: identifier,
          otp: finalOtp,
        }
      : {
          mobile: identifier,
          otp: finalOtp,
        };

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
        payload,
        {
          withCredentials: true,
        },
      );

      alert(data.message);

      if (data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "OTP Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    const payload = identifier.includes("@")
      ? { email: identifier }
      : { mobile: identifier };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`,
        payload,
        {
          withCredentials: true,
        },
      );

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        <div className="hidden lg:block">
          <div className="relative h-[92vh] rounded-[36px] overflow-hidden">
            <img
              src={loginBg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#010860,#002283,#734AA3,#E7959C,#E4A182,#BF3613)] opacity-40"></div>

            <div className="absolute top-8 left-8 z-10">
              <h1 className="text-4xl font-bold text-white">Productr</h1>
            </div>

            <div className="relative z-10 flex justify-center items-center h-full">
              <div className="w-[320px] h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
                <img
                  src={login}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-[44px] leading-tight font-bold text-[#111C73] mb-12">
              Login to your Productr Account
            </h1>

            {step === 1 ? (
              <form onSubmit={sendOtp}>
                <label className="block mb-3 text-gray-700">
                  Email or Phone Number
                </label>

                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter email or phone number"
                  className="w-full h-14 border border-gray-300 rounded-lg px-4 outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 h-12 rounded-lg bg-[#111C8C] text-white font-semibold"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <>
                <p className="text-gray-500 mb-6">OTP sent to</p>

                <div className="border rounded-lg p-4 mb-6 bg-gray-50">
                  <p className="font-semibold text-[#111C73]">{identifier}</p>
                </div>

                <label className="block mb-3 text-gray-700">Enter OTP</label>

                <div className="flex gap-3 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-14 h-14 border border-gray-300 rounded-lg text-center text-xl font-semibold outline-none focus:border-[#111C8C]"
                    />
                  ))}
                </div>

                <button
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full mt-8 h-12 rounded-lg bg-[#111C8C] text-white font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="w-full mt-4 text-[#111C8C] font-medium"
                >
                  Change Email / Phone Number
                </button>

                <p className="text-center mt-6 text-gray-500">
                  Didn't receive OTP?
                  <button
                    onClick={resendOtp}
                    className="ml-2 text-[#111C8C] font-semibold"
                  >
                    Resend OTP
                  </button>
                </p>
              </>
            )}

            <div className="mt-24 border rounded-lg bg-white text-center py-6">
              <p className="text-gray-400">Don't have a Productr Account</p>

              <button className="text-[#111C8C] font-semibold">
                Sign Up Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
