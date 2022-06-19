import ErrorHandler from "@zaengle/error-handler";

export default ({ $axios, redirect, app }, inject) => {
  $axios.onError((error) => {
    const errorResponse = new ErrorHandler().setAll(error).parse();
    app.$error(
      error.response ? error.response.data.error : errorResponse.message
    );
  });
};
