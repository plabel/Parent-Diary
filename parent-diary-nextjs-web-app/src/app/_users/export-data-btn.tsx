import { NavDropdown } from "react-bootstrap";
import { useAlert } from "../_global/alert/alert-provider";

export default function ExportDataBtn() {
  const showAlert = useAlert();
  function download(dataurl: string, filename: string) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
    return false;
  }
  const getDataDump = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REST_API_URL}/users/data-dump`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const blob = await response.blob();
      if (blob) {
        showAlert("success", "Data exported successfully");
        const url = window.URL.createObjectURL(new Blob([blob]));
        download(url, "data-dump.json");
      } else {
        showAlert("danger", "Data export failed");
      }
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Failed to fetch data, check your internet connection",
        },
      };
    }
  };
  return (
    <NavDropdown.Item className="text-warning" onClick={getDataDump}>
      Export data
    </NavDropdown.Item>
  );
}
