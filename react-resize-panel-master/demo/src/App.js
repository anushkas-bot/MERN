import React from "react";
import {useState, useEffect} from "react";
import Axios from 'axios';
//import ResizePanel from "react-resize-panel";
import ResizePanel from "../../src/ResizePanel";
import style from './App.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(style);

export default function App() {
  const [dataName, setdataName] = useState("");
  const [num, setNum] = useState("");
  const [dataList, setdataList] = useState([]);
  const [countList, setcountList] = useState([]);
  const [newdataName, setnewdataName] = useState("");
  const [count, setCount] = useState(1);
  useEffect(() => {
    // Update the document title using the browser API
    Axios.get("http://localhost:3001/read").then((response) => {
    console.log(response);
    setdataList(response.data);
  })
  Axios.get("http://localhost:3001/showcount").then((response) => {
  console.log(response);
  setcountList(response.data);
})
  }, []);
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      dataName: dataName,
      num: num
    })
    setCount(count+1)
    Axios.post("http://localhost:3001/count", {
      count: count
    })
    console.log(count + 'add')
    setdataName('');
    setNum('');
  }
  const handleClick = () => {
    setdataName('');
  }
  const updateData = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newdataName: newdataName,
    })
    setCount(count+1)
    Axios.post("http://localhost:3001/count", {
      count: count
    })
    console.log(count + 'update')
  }
  console.log(count + 'count')
  return (
    <div className={cx('container')}>
      <ResizePanel direction="s">
        <div className={cx('header', 'panel')}>
          <span>header</span>
        </div>
      </ResizePanel>
      <div className={cx('body')}>

        <ResizePanel direction="e" style={{ flexGrow: '1' }} >
          <div className={cx('sidebar', 'withMargin', 'panel')}>left panel<br /> with margin <br />default 50% of content area using flex-grow</div>
        </ResizePanel>
        <div className={cx('content', 'panel')}>
        <label>Name:</label>
        <input type="text" onChange={(event) => {setdataName(event.target.value);}} value = {dataName}/>
        <label>Number:</label>
        <input type="number" onChange={(event) => {setNum(event.target.value);} } value = {num}/>
        <button onClick={addToList}>Add</button>
        {dataList.map((val,key) => {
          return (
            <div className={cx('food')}>
            <h1 style={{marginTop: 0, marginLeft: 20 }}>{val.dataName}</h1><h1 style={{marginLeft: 20 }}>{val.num}</h1>
            <input type="text" onChange={(event) => {setnewdataName(event.target.value);}} placeholder="New Name"/>
            <button onClick={() => updateData(val._id)}> Update</button>
            </div>
          )
        })}
        </div>
        <div className={cx('content', 'panel')}>
        {countList.map((val,key) => {
          return (
            <div>
            <h1 style={{marginTop: 0, marginLeft: 20 }}>{count}</h1>
            </div>
          )
        })}
        </div>
        <ResizePanel direction="w" style={{ width: '400px' }} handleClass={style.customHandle} borderClass={style.customResizeBorder}>
          <div className={cx('sidebar', 'panel')}>right panel<br /> with custom handle<br /> default 400px</div>
        </ResizePanel>

      </div>

      <ResizePanel direction="n" style={{height: '200px'}}>
        <div className={cx('footer', 'panel')}>
          <div className={cx('footerArea')}>
            <div className={cx('footerAreaContent')}>
              <span>footer area, min height: 100px</span>
            </div>
          </div>
          <div className={cx('footerBottomBar')}>
            bottom bar
          </div>
        </div>
      </ResizePanel>
    </div>
  );
}
