import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style/styleForgotpass.css";
import ToastComponent from "../../../assets/toasty";
import { ToastContainer } from "react-toastify";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    // Validate email
    if (!email) {
      formErrors.email = "Email không được để trống";
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      formErrors.email = "Email không hợp lệ";
    }

    setErrors(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log(email);
        const response = await axios.post(
          `http://localhost:8080/api/v1/customer/forgot-password?email=${email}`
        );
        ToastComponent("success", "Gửi thành công, kiểm tra email!");
        setTimeout(() => {
          window.close();
        }, 4000);
      } catch (error) {
        ToastComponent("error", "Vui lòng kiểm tra email.");
      }
      console.log("Form is valid. Submitting...");
    } else {
      console.log("Form contains errors.");
    }
  };

  return (
    <div class="container-fluid p-0">
      <div class="forgot-container">
        <div class="d-flex" style={{ width: "1250px" }}>
          <div class="page-item">
            <div class="page-title me-auto p-2">
              <h1>QUÊN MẬT KHẨU</h1>
            </div>
          </div>

          <div class="p-2">
            <div class="forgot-form">
              <form onSubmit={handleSubmit}>
                <div class="form-item">
                  <div class="forgot-title">
                    <h1>Nhập Email</h1>
                    <h5 className="mt-4">
                      Hạn yêu cầu đổi mật khẩu mới là 2 tiếng.
                    </h5>
                  </div>
                  <div class="item-form">
                    <div class="mb-2 ms-2 me-2">
                      <input
                        name="email"
                        type="text"
                        class="form-control-forgot border border-secondary-subtle rounded"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-error {errors.email==null?'d-lg-none':'' }">
                      <span className="error-item1">
                        <p className="ms-2">{errors.email}</p>
                      </span>
                    </div>
                    <div class="form-btn-reset mt-4">
                      <button class="btn btn-success mb-4" type="submit">
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPass;
