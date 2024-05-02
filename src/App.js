import React,{ useState, Suspense } from "react";

// import Expenses from "./components/Expenses/Expenses";
// import ExpenseInput from "./components/NewExpense/ExpenseInput";
const Expenses = React.lazy(() => import("./components/Expenses/Expenses"))
const ExpenseInput = React.lazy(() => import("./components/NewExpense/ExpenseInput"))

const getCookie = (c_name) => {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      var c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      let nodate = JSON.parse(document.cookie.substring(c_start, c_end));
      nodate.map((eachElement) => {
        eachElement.date = new Date(eachElement.date);
        return eachElement;
      });
      return nodate;
    }
  }
  return "";
};
function createCookie(name, value) {
  document.cookie =
    name + "=" + value + ";expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

const App = () => {
  const [expenses, addExpenses] = useState(getCookie("mycookie"));

  const createItem = (data) => {
    addExpenses((prevState) => {
      var arr = [data, ...prevState];
      var json_str = JSON.stringify(arr);
      createCookie("mycookie", json_str);
      return [data, ...prevState];
    });
  };

  return (
    <div className="main-container">
      <Suspense fallback={<p>Loading...</p>}>
      <ExpenseInput itemData={createItem} />

      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>

      <Expenses expenses={expenses === "" ? [] : expenses} />
      </Suspense>
    </div>
  );
};

export default App;
