import { useState, useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
function CheckUsers() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [msg, setMsg] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [eventname, setEventname] = useState<string>("");
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      true
    );
    scanner.render(success, error);
    function success(result: string) {
      scanner.clear();
      setScanResult(result);
      console.log(scanResult);
    }

    function error(erro: any) {
      console.warn(erro);
    }
    return () => {
      scanner.clear();
    };
  }, []);
  async function handleAllow(result: string) {
    let posted = { rollno: result };
    let res = await axios.put(
      `${process.env.REACT_APP_BACK_URL}/registration/register`,
      posted
    );
    console.log(result);
    setMsg(JSON.stringify(res.data.message));
    setData(JSON.stringify(res.data.payload.name));
    setEventname(JSON.stringify(res.data.payload.event));
    console.log(data);
  }
  return (
    <div className="">
      {scanResult ? (
        <div>
          <div className="flex justify-center mt-9">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleAllow(scanResult)}
              type="submit"
            >
              Check
            </button>
          </div>
          <p className="text-center mt-9">{msg} </p>{" "}
          <p className="block text-center mt-4"> {data} </p>
          <p className="block text-center mt-4"> {eventname} </p>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default CheckUsers;
