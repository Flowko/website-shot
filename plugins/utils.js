export default ({ app }, inject) => {
  inject("error", (message) => {
    app.$toast.show({
      type: "danger",
      message,
      timeout: 5,
      progress: true,
      classToast: "bg-red-600",
      classTitle: "text-red-100",
      classMessage: "text-red-200 font-serif",
      classClose: "text-red-300",
      classTimeout: "bg-red-800",
    });
  });
  inject("success", (message) => {
    app.$toast.show({
      type: "success",
      message,
      timeout: 5,
      progress: true,
      classToast: "bg-green-600",
      classTitle: "text-green-100",
      classMessage: "text-green-200 font-serif",
      classClose: "text-green-300",
      classTimeout: "bg-green-800",
    });
  });
};
