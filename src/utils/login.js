/* eslint-disable */

const BASE_URL = "http://localhost:3000";

const MAX_LOGIN_ATTEMPTS = 3000;
const LOCKOUT_DURATION = 60 * 1000;

async function login(email, password) {
  try {
    const lockedUntil = localStorage.getItem("loginLockedUntil");
    if (lockedUntil && Date.now() < parseInt(lockedUntil, 10)) {
      const remainingTime = Math.ceil(
        (parseInt(lockedUntil, 10) - Date.now()) / 1000
      );
      Swal.fire({
        title: "Login Gagal",
        text: `Anda telah mencoba login terlalu banyak. Silakan coba lagi dalam ${remainingTime} detik.`,
        icon: "error",
        confirmButtonText: "OK",
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }

    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    const { message, data } = responseJson;
    const roleus = data.user.role;

    if (roleus === "user") {
      throw new Error();
    }
    if (message !== "Berhasil login") {
      throw new Error();
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    document.cookie = `accessToken=${
      data.accessToken
    }; expires=${expirationDate.toUTCString()}; path=/;`;
    document.cookie = `userRole=${roleus}; expires=${expirationDate.toUTCString()}; path=/;`;

    localStorage.removeItem("loginAttempts");
    localStorage.removeItem("loginLockedUntil");

    await Swal.fire({
      title: "Berhasil Login",
      icon: "success",
      confirmButtonText: "OK",
    });

    window.location.href = "/dashboard";
  } catch (error) {
    let loginAttempts =
      parseInt(localStorage.getItem("loginAttempts"), 10) || 0;
    loginAttempts += 1;
    localStorage.setItem("loginAttempts", loginAttempts);

    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      const lockedUntil = Date.now() + LOCKOUT_DURATION;
      localStorage.setItem("loginLockedUntil", lockedUntil);
      Swal.fire({
        title: "Login Gagal",
        text: "Anda telah mencoba login terlalu banyak. Silakan coba lagi dalam 1 menit.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Gagal Login !",
        text: "Email atau password tidak sesuai",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        Swal.fire({
          title: "Gagal Login !",
          text: "Email dan password harus diisi",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      await login(email, password);
    });
  }

  const userRole = getCookie("userRole");
  console.log("User Role:", userRole);

  if (userRole === "admin") {
    // Lakukan sesuatu untuk admin
    console.log("Anda adalah admin.");
  } else if (userRole === "superadmin") {
    // Lakukan sesuatu untuk superadmin
    console.log("Anda adalah superadmin.");
  } else {
    console.log("Peran pengguna tidak dikenal.");
  }
});
