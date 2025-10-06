import type { ToasterProps } from "sonner";

export const successToastStyle: ToasterProps = {
  position: "top-right",
  style: {
    backgroundColor: "#228B22",
    color: "white",
    border: "none",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    marginTop:'30px'
  },
};

export const errorToastStyle: ToasterProps = {
  position: "top-right",
  style: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    marginTop:'30px',
  },
};