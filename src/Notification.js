import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({});
export const notify = (props) => {
  switch (props.type) {
    case "success":
      toast.success(props.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      break;
    case "error":
      toast.error(props.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      break;
    case "warning":
      toast.warn(props.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      break;
    case "info":
      toast.info(props.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
      break;
    default:
      break;
  }
};

