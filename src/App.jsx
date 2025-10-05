import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [connectData, setConnectData] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://usis-cdn.eniamza.com/connect.json");
        setConnectData(res.data)
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchData();
  }, []);


  const valueMapper = (value) => {
    Object.entries(value).map(([key, value]) => console.log(value))
  }
  Object.entries(connectData).map(([Key, value]) => {
    valueMapper(value);
    // console.log(Key, value)
  })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="grid grid-cols-9 gap-5">
        {/* {
          Object.entries(connectData).map(([key, value]) => (
            // < p key={key} className="border-2 p-5 text-center" >
            //   {value.courseCode}
            // </p>
            console.log(key, value)

          ))
        } */}
      </div>
    </div >
  );
}

export default App;
