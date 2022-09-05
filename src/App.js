import './App.css';
import { useRef, useState } from 'react';
import axios from "axios";
import { PieChart, Pie, Legend} from 'recharts';

function App() {

  var t = [{"model": "gradesApp.gradesdata", "pk": "", "fields": {"dept": "", "num": "", "prof": "", "sect": "", "sem": "", "yr": "", "gpa": "", "a": "", "b": "", "c": "", "d": "", "f": "", "q": ""}}]
  const newTitle = useRef()
  var url = "http://127.0.0.1:8000/"
  var dict = {}
  const [name, setName] = useState("Showing 1 result for EXAMPLE")
  const [value, setValue] = useState("");
  const [final, setFinal] = useState([{name: "DOE J", gpa: 2.866, students: 94, grades: {as: 31, bs: 23, cs: 17, ds: 8, fs: 3, qs: 12}}])
  const [data1, setData1] = useState({"DOE J": [{name:'a', value: 31, fill: "#23e026"}, {name:'b', value: 23, fill: "#08d7f4"}, {name:'c', value: 17, fill: "#0502fa"}, {name: 'd', value: 8, fill: "#b402fa"}, {name:'f', value: 3, fill: "#fa02bc"}, {name:'q', value: 12, fill: "#fa0223"}]})

  function search(){
    url = ("http://127.0.0.1:8000/?q=" + newTitle.current.value)  
    axios.get(url)
    
    .then(res => {
         t = res.data
         next()
      }).catch(err => {
        setName("No results for " + newTitle.current.value.toUpperCase() + ", please try again.")
        setFinal([{name: "DOE J", gpa: 2.866, students: 94, grades: {as: 31, bs: 23, cs: 17, ds: 8, fs: 3, qs: 12}}])
        setData1({"DOE J": [{name:'a', value: 31, fill: "#23e026"}, {name:'b', value: 23, fill: "#08d7f4"}, {name:'c', value: 17, fill: "#0502fa"}, {name: 'd', value: 8, fill: "#b402fa"}, {name:'f', value: 3, fill: "#fa02bc"}, {name:'q', value: 12, fill: "#fa0223"}]})
        newTitle.current.value = null
      });
  }
  
  function next(){
    var str1 = t[0].fields.prof
    var a = parseInt(t[0].fields.a)
    var b = parseInt(t[0].fields.b)
    var c = parseInt(t[0].fields.c)
    var d = parseInt(t[0].fields.d)
    var f = parseInt(t[0].fields.f)
    var q = parseInt(t[0].fields.q)
    var j = a + b + c + d + f
    var o = 4*a+3*b+2*c+d
    var firstYear = parseInt(t[0].fields.yr)
    var lastYear = parseInt(t[0].fields.yr)
    var data0 = {}
    for(let i = 1; i < t.length; i++){
      if(t[i].fields.prof !== str1){
        dict[str1] = {gpa: (parseFloat(o)/j).toFixed(3), students: j, firstYr: firstYear, lastYr: lastYear, grades: {as: a, bs: b, cs: c, ds: d, fs: f, qs: q}}
        data0[str1] = [{name:'a', value: a, fill: "#23e026"}, {name:'b', value: b, fill: "#08d7f4"}, {name:'c', value: c, fill: "#0502fa"}, {name: 'd', value: d, fill: "#b402fa"}, {name:'f', value: f, fill: "#fa02bc"}, {name:'q', value: q, fill: "#fa0223"}]
        j = 0
        str1 = t[i].fields.prof
        o = 0
        a = 0
        b = 0
        c = 0
        d = 0
        f = 0
        q = 0
        firstYear = parseInt(t[i].fields.yr)
        lastYear = parseInt(t[i].fields.yr)
      }
      a += parseInt(t[i].fields.a)
      b += parseInt(t[i].fields.b)
      c += parseInt(t[i].fields.c)
      d += parseInt(t[i].fields.d)
      f += parseInt(t[i].fields.f)
      q += parseInt(t[i].fields.q)
      j = a + b + c + d + f
      o = 4*a+3*b+2*c+d
      if(parseInt(t[i].fields.yr) < firstYear){
        firstYear = parseInt(t[i].fields.yr)
      }
      if(parseInt(t[i].fields.yr) > lastYear){
        lastYear = parseInt(t[i].fields.yr)
      }
    }
    
    dict[str1] = {gpa: (parseFloat(o)/j).toFixed(3), students: j, firstYr: firstYear, lastYr: lastYear, grades: {as: a, bs: b, cs: c, ds: d, fs: f, qs: q}}
    data0[str1] = [{name:'a', value: a , fill: "#23e026"}, {name:'b', value: b, fill: "#08d7f4"}, {name:'c', value: c, fill: "#0502fa"}, {name: 'd', value: d, fill: "#b402fa"}, {name:'f', value: f, fill: "#fa02bc"}, {name:'q', value: q, fill: "#fa0223"}]
    setData1(data0)
    var max = value
    max = 0
    var key
    var list = []
    var newlist = {}
    var str = ""
    for(let i = 0; i < Object.keys(dict).length; i++){
      for(var key2 in dict){
        if(dict[key2].gpa > max && !(key2 in newlist)){
          max = dict[key2].gpa
          key = key2
        }
      }
      var cased
      if(key.search(' ') !== key.length - 2){
        cased = key.substring(0, 1) + key.substring(1, key.search(' ')).toLowerCase() + key.substring(key.search(' '), key.search(' ')+ 2) + key.substring(key.search(' ') + 2).toLowerCase() 
        cased = cased.substring(0, cased.length - 2)
      } 
      else{
        cased = key.substring(0, 1) + key.substring(1, key.search(' ')).toLowerCase()
      }
      if(dict[key].firstYr !== dict[key].lastYr){
        str = cased + " has taught " + dict[key].students + " total students from " + dict[key].firstYr + " to " + dict[key].lastYr + "."
      }
      else{
        str = cased + " has taught " + dict[key].students + " total students in " + dict[key].firstYr + "."
      }
      cased = ""
      str += " Of all the students who have taken the course with this professor, " + (100*dict[key].grades.as/parseFloat(dict[key].students)).toFixed(2) + "% received an A, "
      var temp = (100*(dict[key].grades.fs+dict[key].grades.qs)/parseFloat(dict[key].students)).toFixed(2)
      if(dict[key].grades.fs+dict[key].grades.qs === 0){
        str+= 'and none failed or q-dropped!'
      }
      else{
        str+= 'but ' + temp + '% failed or q-dropped.'
      }
      list.push({name: key, gpa: dict[key].gpa, info: str, grades: dict[key].grades})
      newlist[key] = dict[key].gpa
      max = 0
    }
    setFinal(list)
    if(Object.keys(dict).length !== 1){
      setName("Showing " + Object.keys(dict).length + " results for " + newTitle.current.value.toUpperCase().slice(0, 4) + " " + newTitle.current.value.slice(4))
    }
    else{
      setName("Showing " + Object.keys(dict).length + " result for " + newTitle.current.value.toUpperCase().slice(0, 4) + " " + newTitle.current.value.slice(4))
    }
      newTitle.current.value = null
  }

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeypress = e => {
    if (e.key === "Enter") {
      search()
    }
  };

  return (
    <>
    <header class="w3-container" >
      <center>
        <input style={{height: '24px', marginTop: '25px'}} placeholder = "Example: CSCE(121)"
          ref = {newTitle}
          onChange={handleChange}
          onKeyPress={handleKeypress}/>
        <button style={{height:'28px'}} onClick = {search} type = "submit "></button>
      </center>
    </header>

      <i><b style={{'fontSize':'200%'}}> {name}</b></i>
      <div>
        {final.map(item => {
          return <p>
          <b style={{'fontSize':'150%'}} key= {item}>Professor {item.name}</b>
          <div key= {item}>Average GPA: {item.gpa}</div><p class='box' key = {item}>{item.info}</p>
          <br></br>
          <table rules='rows, columns' border='1' style={{backgroundColor: '#ffffff', marginLeft: '600px', marginTop: '-110px'}}>
            <tr><th>Grade</th><th>Number</th></tr>
            <tr><th>A's</th> <th>{item.grades.as}</th></tr>
            <tr><th>B's</th> <th>{item.grades.bs}</th></tr>
            <tr><th>C's</th> <th>{item.grades.cs}</th></tr>
            <tr><th>D's</th> <th>{item.grades.ds}</th></tr>
            <tr><th>F's</th> <th>{item.grades.fs}</th></tr>
            <tr><th>Q's</th> <th>{item.grades.qs}</th></tr>
          </table>

          <PieChart width={500} height={300} style={{'right':'-600px', 'top': '-185px'}}>
            <Pie data={data1[item.name]} dataKey="value" outerRadius={75} innerRadius={0} fill = "#fff" />
            <Legend width={100} wrapperStyle={{ top: 40, right: 0, backgroundColor: '#f5f5f5', border: '2px solid black', borderRadius: 3, lineHeight: '40px' }} />
          </PieChart>
        </p>
        })}

      </div>
      <footer class="w3-container" >
    </footer>
    </>
  );
}

export default App;
