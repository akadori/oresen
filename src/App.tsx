import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ComposedChart, YAxis, Legend, Area, Bar } from 'recharts'

function App() {
  const [data, setData] = useState<Array<number>>([]);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const toIntArray = (input: string): Array<number> => {
    const splited = input.split(",");
    return splited.map(s => {
      const parsed = parseInt(s);
      if (isNaN(parsed)) {
        throw new Error(`これは困る: ${input}`);
      } else {
        return parsed;
      }
    })
  }

  const handleInputData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (value) {
      try {
        const array = toIntArray(value);
        setData(array);
        setErrMsg(null)
      } catch (e: any) {
        setErrMsg(`${e}`)
      }
    }
  }

  const DemoChart = ({nums}: {nums: Array<number>}) => {
    if(nums.length === 0) {
      return <div>なんもない</div>
    }

    const total = nums.reduce((sum, c) => sum + c, 0);
    let leftTotal = 0;
    let rightTotal = total;
    const dataGraph = nums.map((n, i) => ({
      delta: n,
      leftTotal: leftTotal += n,
      rightTotal: rightTotal -= n,
      diff: Math.abs(leftTotal - rightTotal)
    }));

    return (
      <ComposedChart //グラフ全体のサイズや位置、データを指定。場合によってmarginで上下左右の位置を指定する必要あり。
        width={window.innerWidth}  //グラフ全体の幅を指定
        height={window.innerHeight - 100}  //グラフ全体の高さを指定
        data={dataGraph} //ここにArray型のデータを指定
      >
        <XAxis
          dataKey="index"  //Array型のデータの、X軸に表示したい値のキーを指定
        />
        <YAxis />
        <Tooltip /> //hoverした時に各パラメーターの詳細を見れるように設定
        <Bar //棒グラフ
          dataKey="delta"　//Array型のデータの、Y軸に表示したい値のキーを指定
          barSize={20}  //棒の太さを指定
          stroke="rgba(34, 80, 162, 0.2)" ////レーダーの線の色を指定 
          fillOpacity={1}  //レーダーの中身の色の薄さを指定
          fill="#2250A2" ////レーダーの中身の色を指定
        />
        <Bar //棒グラフ
          dataKey="leftTotal"　//Array型のデータの、Y軸に表示したい値のキーを指定
          barSize={20}  //棒の太さを指定
          stroke="rgba(34, 80, 162, 0.2)" ////レーダーの線の色を指定 
          fillOpacity={1}  //レーダーの中身の色の薄さを指定
          fill="#ff0000" ////レーダーの中身の色を指定
        />
        <Bar //棒グラフ
          dataKey="rightTotal"　//Array型のデータの、Y軸に表示したい値のキーを指定
          barSize={20}  //棒の太さを指定
          stroke="rgba(34, 80, 162, 0.2)" ////レーダーの線の色を指定 
          fillOpacity={1}  //レーダーの中身の色の薄さを指定
          fill="#ff00ff" ////レーダーの中身の色を指定
        />
        <Bar //棒グラフ
          dataKey="diff"　//Array型のデータの、Y軸に表示したい値のキーを指定
          barSize={20}  //棒の太さを指定
          stroke="rgba(34, 80, 162, 0.2)" ////レーダーの線の色を指定 
          fillOpacity={1}  //レーダーの中身の色の薄さを指定
          fill="#00ffff" ////レーダーの中身の色を指定
        />
      </ComposedChart>)
  }


  return (
    <>
      <DemoChart nums={data}/>
      <input type="text" onChange={handleInputData}></input>
      {errMsg && <div style={{ color: "red" }}>{errMsg}</div>}
    </>
  )
}

export default App
