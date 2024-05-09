import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function toast(text, duration = 3000) {
  Toastify({
    text,
    duration: duration,
    position: "center",
  }).showToast();
}